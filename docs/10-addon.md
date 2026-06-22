# 10 — Add-on Internals

Source: [`addon/`](../addon/)

## What it is

A **Google Workspace Add-on** (unified Editor + Workspace surface) that appears:

- Under `Extensions → SheetsAPI → Open` in any Google Sheet (Editor surface)
- In the right-rail icon strip across Sheets/Docs/Gmail (Workspace surface, via CardService homepage)

## Files

- `appsscript.json` — manifest (scopes, triggers, surfaces)
- `Code.gs` — server-side (Apps Script V8) entry points
- `Sidebar.html` — HTML sidebar template (Editor Add-on)

## Scopes

```json
"oauthScopes": [
  "https://www.googleapis.com/auth/spreadsheets.currentonly",
  "https://www.googleapis.com/auth/script.container.ui",
  "https://www.googleapis.com/auth/script.external_request"
]
```

- `spreadsheets.currentonly` — only the sheet the user is actively viewing (no consent friction)
- `script.container.ui` — show sidebars/dialogs
- `script.external_request` — allow `UrlFetchApp` to reach our Worker (reserved; MVP doesn't use)

Crucially, the Add-on does **not** hold or use our Worker's OAuth. It reads the active spreadsheet via the user's *own* session, and displays endpoint URLs using a `userKey` from `localStorage` (set by the dashboard).

## Entry points

- `onInstall(e)` — first-install hook
- `onOpen(e)` — shown on sheet open; adds the `Extensions → SheetsAPI → Open` menu
- `showSidebar()` — renders `Sidebar.html` as an iframe sidebar
- `onHomepage(e)` — CardService card for the Workspace rail

## Sidebar behavior

`Sidebar.html`:
1. Reads `sheetsapi_userKey` from `localStorage`.
2. **If missing**: shows "Open Dashboard to connect this sheet" with a deep link to `sheets.mreshank.com/connect?spreadsheet_id=<id>`.
3. **If present**: renders a `<select>` populated with all tab names, plus:
   - The live endpoint URL for `(userKey, selectedTab)`
   - Copy URL / Copy curl buttons

Because Apps Script sidebars live in a sandboxed iframe, `localStorage` is isolated. Users must open the dashboard at least once in the same browser profile. This is an accepted tradeoff for the MVP; roadmap: pair-code linking (dashboard shows a code → Add-on asks for it → both server-side bind).

## Deep link from CardService

`onHomepage` produces a card with:
- **Open Dashboard** → `sheets.mreshank.com`
- **Connect this sheet** → `sheets.mreshank.com/connect?spreadsheet_id=<active spreadsheet ID>`

That second URL pushes the user into the `/connect` route which (after OAuth if needed) calls `POST /me/spreadsheets` with the provided ID and marks it default.

## Publishing checklist

See [07 — Deployment § Step 4](./07-deployment.md). In short:

1. Paste files into [script.google.com](https://script.google.com)
2. Link to your GCP project (for unified OAuth across API + Add-on)
3. Test deploy
4. Complete Marketplace SDK listing
5. Pay $5 one-time developer fee
6. Submit for review (1–3 weeks typical)

Listing assets required:
- 128×128 icon
- 220×140 small card
- 440×280 marquee image
- 1280×800 screenshots (3–5)
- Short + long description
- Privacy URL, terms URL
- Support email

## Limitations

| Limit                         | Impact                                          |
| ----------------------------- | ----------------------------------------------- |
| No cross-sheet data in Add-on | Can't show "your other sheets" from sidebar     |
| `UrlFetchApp` daily quota     | 20k calls/day per consumer account              |
| Simple trigger runtime        | 30-second cap per execution                     |
| No npm / no modern JS modules | V8 Apps Script only, CommonJS-ish               |

These do not affect the API product; they only shape Add-on UI possibilities.
