// SheetsAPI — Editor Add-on for Google Sheets.
// Shows under Extensions → SheetsAPI → Open.

var API_BASE = 'https://sheets.mreshank.com';
var DASHBOARD_URL = 'https://sheets.mreshank.com';

function onOpen(e) {
  try {
    SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('Open SheetsAPI', 'showSidebar')
      .addToUi();
  } catch (error) {
    console.warn('Note: getUi() cannot be called when running directly from the Apps Script editor.');
  }
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile('Sidebar');
  html.apiBase = API_BASE;
  html.dashboardUrl = DASHBOARD_URL;
  html.spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  html.spreadsheetName = SpreadsheetApp.getActiveSpreadsheet().getName();
  html.sheetNames = SpreadsheetApp.getActiveSpreadsheet()
    .getSheets()
    .map(function (s) { return s.getName(); });
  SpreadsheetApp.getUi().showSidebar(
    html.evaluate().setTitle('SheetsAPI').setSandboxMode(HtmlService.SandboxMode.IFRAME)
  );
}

// CardService homepage (for Workspace Add-on surface). Shown automatically in the right rail.
function onHomepage(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('SheetsAPI').setSubtitle('Turn this sheet into a REST API'));

  var section = CardService.newCardSection();

  section.addWidget(
    CardService.newTextParagraph().setText(
      '<b>Spreadsheet:</b> ' + (spreadsheet ? spreadsheet.getName() : '(open a sheet)')
    )
  );

  section.addWidget(
    CardService.newTextButton()
      .setText('Open Dashboard')
      .setOpenLink(CardService.newOpenLink().setUrl(DASHBOARD_URL))
  );

  if (spreadsheet) {
    var ssId = spreadsheet.getId();
    section.addWidget(
      CardService.newTextButton()
        .setText('Connect this sheet')
        .setOpenLink(
          CardService.newOpenLink().setUrl(
            DASHBOARD_URL + '/connect?spreadsheet_id=' + encodeURIComponent(ssId)
          )
        )
    );
  }

  card.addSection(section);
  return [card.build()];
}
