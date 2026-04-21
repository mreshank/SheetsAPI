# SheetsAPI Add-on

Google Apps Script Editor/Workspace Add-on. Shows up under **Extensions → SheetsAPI** inside any Google Sheet, and in the right-rail sidebar across Workspace.

## Publishing

1. Go to [script.google.com](https://script.google.com) → New project
2. Create three files matching this directory:
   - `appsscript.json` (Project Settings → "Show appsscript.json" → paste)
   - `Code.gs`
   - `Sidebar.html`
3. Update `API_BASE` and `DASHBOARD_URL` in `Code.gs` if different
4. Deploy → **Test deployments** to sanity check as an editor add-on
5. For public distribution:
   - Google Cloud Console → link GCP project to the Apps Script project
   - Enable Apps Script API
   - OAuth consent screen + Marketplace SDK → fill listing
   - Pay one-time $5 Developer Registration fee
   - Submit for review

## Architecture note

This Add-on does **not** perform OAuth itself — it runs under the user's own Google credentials and can only read the currently-open spreadsheet (`spreadsheets.currentonly` scope). The REST API (Worker) is what holds the user-granted refresh token via the separate OAuth flow started from the dashboard.

The Add-on's only job is:
1. Show the user which URL corresponds to the current sheet+tab
2. Link out to the dashboard for setup/management
