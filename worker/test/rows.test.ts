import { describe, it, expect } from "vitest";
import { rowsToObjects, objectToRow } from "../src/rows";

describe("rowsToObjects", () => {
  it("uses the first row as headers", () => {
    const out = rowsToObjects([
      ["name", "email"],
      ["Ada", "ada@example.com"]
    ]);
    expect(out).toEqual([{ name: "Ada", email: "ada@example.com" }]);
  });

  it("returns empty array for empty input", () => {
    expect(rowsToObjects([])).toEqual([]);
  });

  it("fills missing trailing cells with empty strings", () => {
    const out = rowsToObjects([
      ["name", "email", "age"],
      ["Ada"]
    ]);
    expect(out).toEqual([{ name: "Ada", email: "", age: "" }]);
  });
});

describe("objectToRow", () => {
  it("orders values to match the header row", () => {
    expect(objectToRow({ email: "a@x.com", name: "Ada" }, ["name", "email"])).toEqual([
      "Ada",
      "a@x.com"
    ]);
  });

  it("emits empty string for missing or null fields", () => {
    expect(objectToRow({ name: "Ada" }, ["name", "email"])).toEqual(["Ada", ""]);
    expect(objectToRow({ name: null }, ["name"])).toEqual([""]);
  });

  it("JSON-stringifies non-string values", () => {
    expect(objectToRow({ active: true, tags: ["a", "b"] }, ["active", "tags"])).toEqual([
      "true",
      '["a","b"]'
    ]);
  });
});
