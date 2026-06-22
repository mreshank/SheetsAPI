# 05 — Authentication & Authorization

SheetsAPI uses a **two-layer auth model**:

1. **User ↔ Google**: OAuth 2.0 authorization code flow with PKCE-style state nonce. Google grants the Worker a refresh token on behalf of the user.
2. **Client ↔ SheetsAPI**: Bearer API keys issued by the user from their dashboard. Optional.

## Layer 1: OAuth with Google

### Flow

```
User → Dashboard (sheets.mreshank.com)
  └─ click "Connect Google Sheets"
         │
         ▼
Worker /oauth/start
  └─ creates nonce `state`, stores in D1.oauth_states
  └─ 302 → accounts.google.com/o/oauth2/v2/auth
         ?client_id=...
         &redirect_uri=https://sheets.mreshank.com/api/oauth/callback
         &response_type=code
         &access_type=offline            ← gets us a refresh token
         &prompt=consent                 ← forces refresh token on every consent
         &scope=openid email spreadsheets drive.file
         &state=<nonce>
         │
         ▼
Google → user consents
         │
         ▼
Worker /oauth/callback?code=...&state=...
  └─ verifies state in D1, deletes it
  └─ POST oauth2.googleapis.com/token (exchange code)
         → { access_token, refresh_token, id_token, expires_in }
  └─ decodes id_token → { sub, email }
  └─ AES-GCM encrypts refresh_token with ENCRYPTION_KEY
  └─ UPSERT users
  └─ 302 → {return_to}?userKey=...&email=...
         │
         ▼
Dashboard /app
  └─ stores { userKey, email } in localStorage
```

### Scopes

| Scope                                                 | Why                                         |
| ----------------------------------------------------- | ------------------------------------------- |
| `openid`                                              | Identify the user (`sub` claim)             |
| `email`                                               | Show email in dashboard                     |
| `https://www.googleapis.com/auth/spreadsheets`        | Read/write any sheet the user has access to |
| `https://www.googleapis.com/auth/drive.file`          | Create new sheets on user's behalf (roadmap: template library) |

`spreadsheets` is a "sensitive" scope in Google's terms. Until your OAuth consent screen is **verified**, you can only authorize **test users** you've added in the Google Cloud Console. Verification is free but takes 2–4 weeks.

### Refresh token handling

- Stored encrypted (`AES-GCM` with 96-bit random IV; 256-bit key from `ENCRYPTION_KEY` secret).
- Exchanged for a fresh access token on every API request (simple, no caching).
- **Never logged** — the Worker redacts token strings from error output.
- **Rotation**: Google may rotate the refresh token. We always store the latest value from `/oauth/callback`. If a refresh call returns a new `refresh_token`, we should re-encrypt and update (roadmap).

### Revocation

Two paths:

- **User-initiated**: dashboard **Sign out** → `POST /me/logout` → Worker deletes the `users` row. Cascade removes `spreadsheets` and `api_keys`.
- **Google-side**: user visits [myaccount.google.com/permissions](https://myaccount.google.com/permissions) → "Remove access" for SheetsAPI. Our next refresh attempt 401s; we surface as 500 with `invalid_grant` message. User can re-connect.

### Consent screen verification

To ship publicly you must submit:
1. App domain list (sheets.mreshank.com, sheets.mreshank.com)
2. Privacy policy URL
3. Terms URL
4. Scope justifications (why you need `spreadsheets` and `drive.file`)
5. Demo video (≤ 3 min) showing the OAuth flow and scope usage
6. DPIA statement for EU users (lightweight)

See [11 — Compliance](./11-compliance.md).

## Layer 2: Bearer API keys

### Progressive enforcement

| User state                        | API requirement                               |
| --------------------------------- | --------------------------------------------- |
| Zero API keys                     | Public: no auth header needed                 |
| ≥ 1 API keys                      | All requests need `Authorization: Bearer sk_...` |

This keeps the "quickstart → first GET in 30 seconds" UX while letting power users lock things down.

### Key format

- `sk_` prefix + 48 hex chars (24 random bytes → base16).
- Stored as plaintext in D1 (fast lookup; keys are opaque and single-user scoped).
- Roadmap: store `sha256(key)` instead; show full key only once on creation.

### Scoping

MVP keys grant full access to all the user's endpoints.

Roadmap:
- Read-only vs read-write keys
- Per-spreadsheet scoping
- Per-tab scoping
- CIDR restrictions
- Expiry dates

## Layer 3: network-level

Cloudflare Workers get Cloudflare's DDoS protection, bot mitigation, and TLS 1.3 by default. No additional configuration required.

## Dashboard session

The dashboard identifies the user to the Worker via the `x-user-key` header (read from `localStorage`). This is an **anti-pattern for production** — it's XSS-readable. Roadmap: migrate to `HttpOnly; Secure; SameSite=Lax` cookies set on a shared apex (`*.mreshank.com`).

For now, the blast radius is limited because:
- The `userKey` alone cannot exfiltrate data — you still need to know the sheet name
- Logging out revokes the key at the backend
- No payment methods, passwords, or cross-service access are tied to the key
