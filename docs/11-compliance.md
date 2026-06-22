# 11 — Compliance

> Positioning statement: SheetsAPI is a **thin, auditable layer** over Google's infrastructure. The vast majority of compliance work inherits from Google Workspace's existing certifications. Our surface area is small: encrypted token storage + metadata.

## Data we store

| Category                | Examples                                               | PII? |
| ----------------------- | ------------------------------------------------------ | ---- |
| Account identifiers     | `google_sub`, email                                    | Yes  |
| Auth material           | AES-GCM-encrypted refresh token                        | Sensitive |
| Metadata                | `userKey`, spreadsheet IDs, tab list, API keys         | No   |
| Timestamps              | `created_at`, `updated_at`, `last_used_at`             | No   |

We **do not** store:
- Row data from any spreadsheet (data is proxied live from Google)
- IP addresses beyond Cloudflare edge logs (7-day retention)
- Passwords (we never see them)
- Credit card / payment data (no payments in MVP)

## DPDP Act (India, 2023)

Relevant for users in India.

- **Notice & consent**: OAuth consent screen lists scopes + our app name. Privacy policy (required at /legal/privacy) details purposes.
- **Right to access**: users can view all stored data about themselves via `GET /me`.
- **Right to erasure**: `POST /me/logout` deletes all data in ≤ 1s; D1 delete is immediate.
- **Data fiduciary status**: SheetsAPI acts as Data Fiduciary for account metadata, Data Processor for spreadsheet contents (which remain in the user's Google Drive).
- **Grievance officer**: designate in privacy policy (required for significant data fiduciaries).
- **Cross-border transfer**: Cloudflare edges globally; users consent at sign-up.

Roadmap: appoint a Data Protection Officer once user count passes applicable thresholds.

## GDPR (EU)

- **Lawful basis**: consent (Article 6(1)(a)) via the OAuth consent screen.
- **Data minimization**: we store only what's needed to proxy API calls.
- **DPA**: published at `/legal/dpa` (template-based; sign-on request for enterprise).
- **Subprocessors**: Google (Sheets/OAuth), Cloudflare (Workers/D1/Pages). Listed at `/legal/subprocessors`.
- **DPIA**: light DPIA template in `/docs` (not yet published). Required only for high-risk processing; our scope doesn't qualify, but we maintain it for completeness.
- **DSR handling**: access (via dashboard), erasure (via logout), portability (via GET /me + export CSV of metadata). Response within 30 days.
- **Breach notification**: 72-hour policy in incident response playbook ([06 — Security](./06-security.md)).
- **International transfer**: SCCs (Standard Contractual Clauses) included in Cloudflare and Google agreements we sit on top of.

## SOC 2 Type II (roadmap)

Current posture: **not certified**, but built to SOC 2 principles.

| Trust Service Criteria | Status                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| Security               | Encryption at rest + in transit; secrets mgmt; access reviews      |
| Availability           | Cloudflare edge SLA (inherits); no custom SLA commitment in MVP    |
| Processing Integrity   | Input validation; prepared statements; audit logs (roadmap)        |
| Confidentiality        | AES-GCM tokens; least-privilege OAuth scopes                       |
| Privacy                | Privacy policy; DSR support; minimization                          |

Path to Type II (12-18 months):
1. Formalize policies (info sec, incident response, access mgmt, vendor mgmt) → `/docs/policies/`
2. Enable audit logging (Cloudflare Logpush → R2)
3. Annual access review + vulnerability scan (free tools: OWASP ZAP, npm audit)
4. Engage auditor (e.g. Vanta, Drata, or direct firm) — realistic budget when revenue justifies

## HIPAA (US healthcare)

**Short answer**: SheetsAPI is **not currently suitable for PHI** storage without additional steps, because:
- Google Sheets requires a **BAA with Google Workspace (Business/Enterprise)** to be HIPAA-eligible. Free personal accounts do not qualify.
- Cloudflare offers a BAA on their Enterprise plan only.
- We don't sign BAAs as MVP.

To use SheetsAPI with PHI:
- Users must be on Google Workspace with a BAA in place
- Self-host SheetsAPI on a Cloudflare Enterprise account with BAA
- Implement audit logging
- No PHI in logs

Roadmap: offer a **SheetsAPI for Healthcare** self-hosted bundle with hardened defaults + BAA.

## Other frameworks (summary)

| Framework     | Status                                                           |
| ------------- | ---------------------------------------------------------------- |
| CCPA / CPRA   | Covered by `/legal/privacy` California addendum                  |
| LGPD (Brazil) | Covered under general GDPR-equivalent posture                    |
| PIPEDA (Can.) | Covered                                                          |
| ISO 27001     | Roadmap; inherits Cloudflare/Google ISO 27001 posture            |
| PCI DSS       | Not applicable (no card data handled; payments via Stripe if/when) |
| FERPA         | Self-host required, similar to HIPAA                             |

## Legal pages checklist

- [x] Privacy Policy (`/legal/privacy`)
- [x] Terms of Service (`/legal/terms`)
- [x] Cookie Policy (`/legal/cookies`)
- [x] DPA template (`/legal/dpa`)
- [x] SLA template (`/legal/sla`)
- [x] Acceptable Use (`/legal/aup`)
- [x] Subprocessor list (`/legal/subprocessors`)
- [ ] Security disclosure (`/legal/security` + security.txt at well-known path)
- [ ] Data retention schedule (publish at `/docs/retention`)
- [ ] Children's privacy statement (`/legal/children` — we require 16+)

## Retention

| Data                        | Retention                        |
| --------------------------- | -------------------------------- |
| Encrypted refresh tokens    | Until logout                     |
| Spreadsheet metadata        | Until removed or logout          |
| API keys                    | Until revoked                    |
| OAuth state nonces          | ≤ 10 min (cron cleanup roadmap)  |
| Cloudflare edge logs        | 7 days                           |
| Error logs                  | 30 days (Workers Logs roadmap)   |

On logout, all rows are deleted within the same request. D1 does not guarantee immediate physical deletion but contents are unreachable from any application path.
