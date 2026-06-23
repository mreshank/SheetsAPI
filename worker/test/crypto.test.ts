import { describe, it, expect } from "vitest";
import { encrypt, decrypt, randomId, uuid } from "../src/crypto";

// 32-byte key as 64 hex chars.
const KEY = "00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff";

describe("encrypt / decrypt", () => {
  it("round-trips a string", async () => {
    const secret = "refresh-token-value-123";
    const enc = await encrypt(secret, KEY);
    expect(enc).toContain(":");
    expect(enc).not.toContain(secret);
    expect(await decrypt(enc, KEY)).toBe(secret);
  });

  it("produces a different ciphertext each time (random IV)", async () => {
    const a = await encrypt("same", KEY);
    const b = await encrypt("same", KEY);
    expect(a).not.toBe(b);
    expect(await decrypt(a, KEY)).toBe("same");
    expect(await decrypt(b, KEY)).toBe("same");
  });

  it("fails to decrypt with the wrong key", async () => {
    const enc = await encrypt("secret", KEY);
    const wrong = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
    await expect(decrypt(enc, wrong)).rejects.toBeDefined();
  });

  it("round-trips unicode", async () => {
    const s = "café — 日本語 — 🚀";
    expect(await decrypt(await encrypt(s, KEY), KEY)).toBe(s);
  });
});

describe("randomId", () => {
  it("returns hex of the requested byte length", () => {
    expect(randomId(16)).toMatch(/^[0-9a-f]{32}$/);
    expect(randomId(8)).toMatch(/^[0-9a-f]{16}$/);
  });

  it("is non-repeating", () => {
    expect(randomId()).not.toBe(randomId());
  });
});

describe("uuid", () => {
  it("returns a v4-shaped UUID", () => {
    expect(uuid()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
  });
});
