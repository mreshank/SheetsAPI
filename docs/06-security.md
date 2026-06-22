# 06 — Security

## Threat model

| Threat                                  | Mitigation                                                  |
| --------------------------------------- | ----------------------------------------------------------- |
| Attacker steals D1 dump                 | Refresh tokens AES-GCM encrypted at rest with non-DB key    |
| Attacker steals `ENCRYPTION_KEY`        | Worker secret; rotated separately; compromise requires both |
| XSS on dashboard exfiltrates `userKey`  | User can still call `/me/logout`; keys revoke endpoints     |
| Brute-force API keys                    | 24-byte random → 2^192 space; Cloudflare rate-limits        |
| OAuth state replay / CSRF               | One-shot `oauth_states` nonce, deleted on callback          |
| Token leak in logs                      | Worker never logs request bodies or tokens                  |
| Man-in-the-middle                       | HTTPS enforced by Cloudflare; HSTS preload                  |
| DoS via expensive ranges                | Hard limits on `?limit` (max 1000); Worker CPU cap 50ms     |
| SSRF via user-supplied spreadsheet ID   | Only `sheets.googleapis.com` URLs are constructed           |
| SQL injection                           | All queries use D1 prepared statements + `.bind()`          |
| Dependency chain compromise             | Minimal deps (Hono, @cloudflare/workers-types)              |

## Encryption

### At rest

- **Refresh tokens**: AES-GCM-256, 96-bit random IV per token, base64-encoded `iv:ciphertext` in `users.refresh_token_enc`.
- **ENCRYPTION_KEY**: 32 random bytes, hex-encoded, stored as a Cloudflare Worker secret (not visible in `wrangler.toml`, not in source control).

```ts
// see worker/src/crypto.ts
export async function encrypt(plaintext, hexKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey('raw', hexToBytes(hexKey), 'AES-GCM', false, ['encrypt']);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encode(plaintext));
  return `${b64(iv)}:${b64(ct)}`;
}
```

### In transit

- All origins (`sheets.mreshank.com`, `sheets.mreshank.com`) force HTTPS via Cloudflare universal SSL.
- Recommend enabling HSTS with 1-year max-age and `includeSubdomains; preload`.
- TLS 1.2 minimum, 1.3 preferred.

### Access tokens

- **Never stored.** Derived fresh from the refresh token on each API request and discarded after use.
- Lifetime: 1 hour (Google default).

## Key rotation

### `ENCRYPTION_KEY`

1. Generate new key: `openssl rand -hex 32`
2. Set as new secret: `wrangler secret put ENCRYPTION_KEY_NEW`
3. Deploy Worker with dual-read support (roadmap: pluggable key IDs).
4. Run one-time migration worker: decrypt with old, encrypt with new, update row.
5. Remove `ENCRYPTION_KEY_NEW` → `ENCRYPTION_KEY`, delete old key secret.

Cadence: annually or on suspected compromise.

### OAuth client secret

Rotate via Google Cloud Console → Credentials → "Reset Secret". Update `wrangler secret put GOOGLE_CLIENT_SECRET`. No data migration needed (the secret is only used for the OAuth code↔token exchange at runtime).

## Incident response

1. **Suspected `ENCRYPTION_KEY` leak** → rotate immediately (see above). Communicate with users if refresh tokens may be exposed; proactively invalidate affected tokens.
2. **Suspected OAuth client secret leak** → reset in GCP; inform Google via the OAuth app console.
3. **Database breach** → force-rotate all `userKey`s (regenerate UUIDs); invalidate all `api_keys`; email affected users.
4. **Worker code compromise** → revert via `wrangler rollback`; audit commits; rotate all secrets.

## Secure configuration checklist

Before going public:

- [ ] `ENCRYPTION_KEY` set (32 random bytes hex)
- [ ] `GOOGLE_CLIENT_SECRET` set
- [ ] `wrangler.toml` does **not** contain secrets (only Client ID is safe)
- [ ] D1 database created, schema applied
- [ ] OAuth consent screen configured with privacy + terms URLs
- [ ] Privacy/terms pages live on the dashboard
- [ ] HSTS enabled in Cloudflare for both domains
- [ ] `robots.txt` allows indexing of the marketing site, blocks `/app`
- [ ] Content Security Policy header on dashboard (roadmap)
- [ ] Error messages never include token material
- [ ] Test revocation round-trip (connect → call → logout → call → 401)

## Responsible disclosure

Security contact: `security@mreshank.com` (configure; roadmap: security.txt).

We commit to:
- Acknowledge within 48 hours
- Patch high-severity issues within 7 days
- Public credit if desired
- No legal action against good-faith research

## Compliance posture

See [11 — Compliance](./11-compliance.md) for DPDP / GDPR / SOC 2 / HIPAA details.
