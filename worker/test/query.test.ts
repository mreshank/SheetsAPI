import { describe, it, expect } from "vitest";
import { parseQuery, applyQuery, formatResponse } from "../src/query";

const url = (qs: string) => new URL(`https://x.dev/api/spreadsheets/k/Sheet${qs}`);

const rows = [
  { name: "Ada", email: "ada@example.com", age: "36" },
  { name: "Linus", email: "linus@example.com", age: "54" },
  { name: "Grace", email: "grace@example.com", age: "85" }
];

describe("parseQuery", () => {
  it("defaults to json format with no params", () => {
    const q = parseQuery(url(""));
    expect(q.format).toBe("json");
    expect(q.offset).toBe(0);
    expect(q.limit).toBeUndefined();
    expect(q.search).toEqual([]);
  });

  it("caps limit at 1000 and floors at 1", () => {
    expect(parseQuery(url("?limit=99999")).limit).toBe(1000);
    expect(parseQuery(url("?limit=0")).limit).toBe(1);
  });

  it("parses descending sort via - prefix", () => {
    expect(parseQuery(url("?sort=-age")).sort).toEqual({ field: "age", desc: true });
    expect(parseQuery(url("?sort=name")).sort).toEqual({ field: "name", desc: false });
  });

  it("parses search field:value pairs", () => {
    expect(parseQuery(url("?search=name:ada,age:36")).search).toEqual([
      ["name", "ada"],
      ["age", "36"]
    ]);
  });

  it("only accepts known formats, else json", () => {
    expect(parseQuery(url("?format=csv")).format).toBe("csv");
    expect(parseQuery(url("?format=yaml")).format).toBe("json");
  });
});

describe("applyQuery", () => {
  it("filters by case-insensitive substring search", () => {
    const out = applyQuery(rows, parseQuery(url("?search=name:ad")));
    expect(out.map((r) => r.name)).toEqual(["Ada"]);
  });

  it("filters by exact match", () => {
    const out = applyQuery(rows, parseQuery(url("?search_exact=name:Ada")));
    expect(out).toHaveLength(1);
    expect(applyQuery(rows, parseQuery(url("?search_exact=name:ada")))).toHaveLength(0);
  });

  it("sorts numerically when both values are numbers", () => {
    const out = applyQuery(rows, parseQuery(url("?sort=age")));
    expect(out.map((r) => r.age)).toEqual(["36", "54", "85"]);
  });

  it("sorts descending with - prefix", () => {
    const out = applyQuery(rows, parseQuery(url("?sort=-age")));
    expect(out.map((r) => r.age)).toEqual(["85", "54", "36"]);
  });

  it("paginates with offset and limit", () => {
    const out = applyQuery(rows, parseQuery(url("?offset=1&limit=1")));
    expect(out).toEqual([{ name: "Linus", email: "linus@example.com", age: "54" }]);
  });

  it("projects only requested fields", () => {
    const out = applyQuery(rows, parseQuery(url("?fields=name")));
    expect(out[0]).toEqual({ name: "Ada" });
    expect(Object.keys(out[0]!)).toEqual(["name"]);
  });
});

describe("formatResponse", () => {
  const headers = ["name", "email", "age"];

  it("returns JSON array by default", () => {
    const { body, contentType } = formatResponse(rows, parseQuery(url("")), headers);
    expect(contentType).toContain("application/json");
    expect(JSON.parse(body)).toHaveLength(3);
  });

  it("emits CSV with header and escaped commas", () => {
    const data = [{ name: "Doe, John", email: "j@x.com", age: "1" }];
    const { body, contentType } = formatResponse(data, parseQuery(url("?format=csv")), headers);
    expect(contentType).toContain("text/csv");
    expect(body.split("\n")[0]).toBe("name,email,age");
    expect(body).toContain('"Doe, John"');
  });

  it("wraps JSONP in the callback name", () => {
    const { body, contentType } = formatResponse(
      rows,
      parseQuery(url("?format=jsonp&callback=cb")),
      headers
    );
    expect(contentType).toContain("application/javascript");
    expect(body.startsWith("cb(")).toBe(true);
    expect(body.trim().endsWith(");")).toBe(true);
  });

  it("escapes XML special characters", () => {
    const data = [{ name: "A & <B>", email: "", age: "" }];
    const { body } = formatResponse(data, parseQuery(url("?format=xml")), headers);
    expect(body).toContain("A &amp; &lt;B&gt;");
  });
});
