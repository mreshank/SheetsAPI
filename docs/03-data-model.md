# 03 — Data Model

## D1 schema

Defined in [worker/schema.sql](../worker/schema.sql).

### `users`

| Column              | Type    | Notes                                                  |
| ------------------- | ------- | ------------------------------------------------------ |
| `user_key`          | TEXT PK | UUIDv4. Opaque ID exposed in API URLs.                 |
| `google_sub`        | TEXT U  | Google account ID (`sub` claim from id_token). Stable. |
| `email`             | TEXT    | Last known email from Google.                          |
| `refresh_token_enc` | TEXT    | `AES-GCM(refresh_token)` — format `iv_b64:ct_b64`.     |
| `created_at`        | INTEGER | Unix ms.                                               |
| `updated_at`        | INTEGER | Unix ms.                                               |

Index on `google_sub` for "login existing user" fast path.

### `spreadsheets`

| Column                  | Type    | Notes                                                   |
| ----------------------- | ------- | ------------------------------------------------------- |
| `id`                    | TEXT PK | Our opaque UUIDv4.                                      |
| `user_key`              | TEXT    | FK → `users`. On delete cascade.                        |
| `google_spreadsheet_id` | TEXT    | From `docs.google.com/spreadsheets/d/<THIS>`.           |
| `title`                 | TEXT    | Cached from Sheets metadata.                            |
| `is_default`            | INTEGER | 0/1. Exactly one default per user (app-level).          |
| `created_at`            | INTEGER | Unix ms.                                                |

The API URL `/api/spreadsheets/:userKey/:sheetName` resolves `sheetName` against the user's **default** spreadsheet. Multi-spreadsheet addressing (roadmap): `/api/spreadsheets/:userKey/:spreadsheetId/:sheetName`.

### `api_keys`

| Column         | Type    | Notes                              |
| -------------- | ------- | ---------------------------------- |
| `key`          | TEXT PK | Format `sk_<48-hex>`.              |
| `user_key`     | TEXT    | FK → `users`. Cascade.             |
| `label`        | TEXT    | User-provided memo.                |
| `created_at`   | INTEGER |                                    |
| `last_used_at` | INTEGER | Updated on successful auth (roadmap). |

**Progressive auth**: if a user has *zero* rows in `api_keys`, their endpoints are public. As soon as they create one, all endpoints require `Authorization: Bearer sk_...`.

### `oauth_states`

| Column       | Type    | Notes                                          |
| ------------ | ------- | ---------------------------------------------- |
| `state`      | TEXT PK | 32-char hex nonce.                             |
| `created_at` | INTEGER |                                                |
| `return_to`  | TEXT    | Where to redirect after successful callback.   |

Rows are deleted on callback. Optional cron (roadmap): purge rows older than 10 minutes.

## Row format conventions

### Header row → JSON keys

The **first row of every tab** is treated as the schema. All subsequent rows are data.

```
┌────────┬─────┬───────────────┐
│ name   │ age │ email         │   ← header row (row 1)
├────────┼─────┼───────────────┤
│ Ada    │ 36  │ ada@...       │   ← row 1 (data, index 1)
│ Alan   │ 41  │ alan@...      │   ← row 2 (data, index 2)
└────────┴─────┴───────────────┘
```

Response shape:

```json
[
  { "name": "Ada",  "age": "36", "email": "ada@..."  },
  { "name": "Alan", "age": "41", "email": "alan@..." }
]
```

### Rules

- **Values are strings.** Sheets stores numbers, dates, formulas — we return the rendered string. Set `?format=typed` (roadmap) for coerced types.
- **Missing cells become `""`** — Sheets does not distinguish null from empty.
- **Unknown keys in POST/PUT bodies are ignored**. They must match a header exactly (case-sensitive).
- **Formulas are preserved.** Submitting `"=SUM(A1:A5)"` in a value field stores the formula; the next GET returns the computed value.
- **Row indexing is 1-based** across the API — `row=1` is the first data row (Sheets row 2). This matches the human mental model ("the first record").

## Naming conventions

- Tab names follow Google Sheets' rules (no leading/trailing whitespace, no length limit in practice).
- Header names should be URL/JSON-friendly. Spaces are permitted but discouraged for API ergonomics. Recommend `snake_case` or `camelCase`.
- Reserved header names (roadmap): `_id`, `_created_at`, `_updated_at` — auto-populated if present.
