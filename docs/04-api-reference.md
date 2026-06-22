# 04 — REST API Reference

Base URL: `https://sheets.mreshank.com`

All endpoints return `application/json; charset=utf-8`. All requests may use `Content-Type: application/json`.

## Authentication

- If the user has **no API keys**, endpoints are publicly reachable.
- If one or more API keys exist, **every** request must include `Authorization: Bearer sk_...`.

See [05 — Authentication](./05-authentication.md).

## CORS

All origins are allowed (`Access-Control-Allow-Origin: *`) for GET/POST/PUT/DELETE/OPTIONS. Credentials are not used — authentication is via bearer tokens only.

## Public CRUD endpoints

### `GET /api/spreadsheets/{userKey}/{sheetName}`

List all rows from the given tab as JSON objects, keyed by the header row.

**Query parameters** (planned/implemented — see [13 — Roadmap](./13-roadmap.md) for status):

| Param              | Example                    | Effect                                              |
| ------------------ | -------------------------- | --------------------------------------------------- |
| `limit`            | `?limit=50`                | Return at most N rows                               |
| `offset`           | `?offset=100`              | Skip N rows from the top                            |
| `search`           | `?search=name:Ada`         | Filter where `name` contains `"Ada"` (substring)    |
| `search_exact`     | `?search_exact=email:a@b` | Exact-match filter                                  |
| `sort`             | `?sort=age`                | Sort by column ascending                            |
| `sort`             | `?sort=-age`               | Descending                                          |
| `format`           | `?format=json` (default)   | Output format                                       |
| `format`           | `?format=csv`              | CSV with header row                                 |
| `format`           | `?format=tsv`              | TSV                                                 |
| `format`           | `?format=xml`              | Simple `<rows><row><field>` XML                     |
| `format`           | `?format=jsonp&callback=f` | JSONP (for legacy browser embeds)                   |
| `fields`           | `?fields=name,email`       | Return only specified fields                        |
| `cache`            | `?cache=60`                | Client cache hint; Worker sets `Cache-Control`      |

**Example**

```bash
curl 'https://sheets.mreshank.com/api/spreadsheets/abc123/leads?limit=10&sort=-age'
```

```json
[
  { "name": "Alan",  "age": "41", "email": "alan@..." },
  { "name": "Ada",   "age": "36", "email": "ada@..."  }
]
```

### `GET /api/spreadsheets/{userKey}/{sheetName}/{row}`

Retrieve a single row by its 1-based data index.

```bash
curl 'https://sheets.mreshank.com/api/spreadsheets/abc123/leads/1'
```

```json
{ "name": "Ada", "age": "36", "email": "ada@..." }
```

**Errors**
- `400 {"error":"bad row"}` — row is not a positive integer
- `404 {"error":"row not found"}` — row past end of data

### `POST /api/spreadsheets/{userKey}/{sheetName}`

Append one or more rows. Body can be a single object or an array of objects.

```bash
curl -X POST 'https://sheets.mreshank.com/api/spreadsheets/abc123/leads' \
  -H 'content-type: application/json' \
  -d '[{"name":"Grace","age":"42","email":"grace@..."}]'
```

```json
{ "appended": 1 }
```

**Rules**
- Keys that don't match a header are silently dropped.
- Headers present in the sheet but absent from the body are written as empty strings.
- Missing headers in sheet → `400 {"error":"sheet has no header row"}`.

### `PUT /api/spreadsheets/{userKey}/{sheetName}/{row}`

Replace the entire row at 1-based index. Body is a single object.

```bash
curl -X PUT 'https://sheets.mreshank.com/api/spreadsheets/abc123/leads/1' \
  -H 'content-type: application/json' \
  -d '{"name":"Ada Lovelace","age":"37","email":"ada@..."}'
```

```json
{ "updated": 1, "row": 1 }
```

### `DELETE /api/spreadsheets/{userKey}/{sheetName}/{row}`

Remove a row. Shifts remaining rows up.

```bash
curl -X DELETE 'https://sheets.mreshank.com/api/spreadsheets/abc123/leads/1'
```

```json
{ "deleted": 1, "row": 1 }
```

## Discovery & search endpoints

### `POST /api/spreadsheets/{userKey}/{sheetName}/search`  *(roadmap)*

Multi-field search with an expressive body:

```json
{
  "where": { "name": "Ada", "status": "active" },
  "sort": ["-created_at"],
  "limit": 20,
  "offset": 0,
  "mode": "and"
}
```

### `GET /api/spreadsheets/{userKey}/_meta`  *(roadmap)*

Returns spreadsheet title, tab list, and header row for each tab.

## Admin / dashboard API (session)

Requires `x-user-key: <userKey>` header **or** `?userKey=` query parameter (used by the dashboard SPA).

| Method | Path                                   | Purpose                                   |
| ------ | -------------------------------------- | ----------------------------------------- |
| GET    | `/me`                                  | Profile, spreadsheets, API keys           |
| POST   | `/me/spreadsheets`                     | Register a Google spreadsheet             |
| DELETE | `/me/spreadsheets/:id`                 | Unregister                                |
| GET    | `/me/spreadsheets/:id/sheets`          | List tabs in a registered spreadsheet     |
| POST   | `/me/api-keys`                         | Issue a new API key `{label?}`            |
| DELETE | `/me/api-keys/:key`                    | Revoke                                    |
| POST   | `/me/logout`                           | Delete user (cascades)                    |

## OAuth endpoints

| Method | Path                       | Purpose                                        |
| ------ | -------------------------- | ---------------------------------------------- |
| GET    | `/oauth/start?return_to=`  | Begin OAuth; redirects to Google               |
| GET    | `/oauth/callback`          | Google redirects here with `code` + `state`    |

## Status codes

| Code | Meaning                                      |
| ---- | -------------------------------------------- |
| 200  | OK                                           |
| 400  | Bad request (malformed body, bad row index)  |
| 401  | Missing or invalid API key                   |
| 404  | User, spreadsheet, tab, or row not found     |
| 429  | Google Sheets quota exceeded                 |
| 500  | Internal error (Sheets API failure, etc.)    |

## Rate limits

Current: inherits Google Sheets' default quota of **300 read + 300 write requests/minute** per Google Cloud project.

Planned: per-`userKey` quota to prevent one user saturating the shared pool.
