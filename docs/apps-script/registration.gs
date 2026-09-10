/**
 * Event registration endpoint for dogtn-website.
 *
 * Setup (about two minutes):
 *   1. Create a Google Sheet. Note its id from the URL:
 *      docs.google.com/spreadsheets/d/<THIS_PART>/edit
 *   2. Extensions -> Apps Script. Paste this file over Code.gs.
 *   3. Set SHEET_ID and NOTIFY_EMAIL below.
 *   4. Deploy -> New deployment -> type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone            <- required; the site posts anonymously
 *   5. Copy the /exec URL and set it as NEXT_PUBLIC_REGISTRATION_ENDPOINT
 *      in the Cloudflare Pages build settings.
 *
 * Changing who gets notified is a one-line edit here plus a redeploy of this
 * script. It needs no rebuild of the website.
 */

var SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
var NOTIFY_EMAIL = 'dominioncitychurchajah1@gmail.com';
var TAB_NAME = 'Registrations';

var HEADERS = [
  'Submitted at', 'Event', 'Full name', 'Email', 'Phone',
  'Country', 'Seats', 'Volunteer', 'Volunteer areas'
];

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);

    // Validate server-side too: the browser check can be bypassed.
    if (!d.fullName || !d.email || !d.phone || !d.country) {
      return json({ ok: false, error: 'Missing required fields' });
    }
    var seats = parseInt(d.seats, 10);
    if (!(seats >= 1 && seats <= 20)) seats = 1;

    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      d.eventTitle || '',
      d.fullName,
      d.email,
      "'" + String(d.phone),          // leading quote keeps +234... from becoming a number
      d.country,
      seats,
      d.volunteer || 'no',
      d.volunteerAreas || ''
    ]);

    notify_(d, seats);
    confirm_(d, seats);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Lets you open the /exec URL in a browser to check the deployment is live. */
function doGet() {
  return json({ ok: true, status: 'Registration endpoint is running' });
}

function getSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(TAB_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify_(d, seats) {
  var volunteer = d.volunteer === 'yes' ? 'YES'
                : d.volunteer === 'maybe' ? 'Maybe' : 'No';
  var body =
    d.fullName + ' has registered for ' + (d.eventTitle || 'an event') + '.\n\n' +
    'Email:     ' + d.email + '\n' +
    'Phone:     ' + d.phone + '\n' +
    'Country:   ' + d.country + '\n' +
    'Seats:     ' + seats + '\n' +
    'Workforce: ' + volunteer + (d.volunteerAreas ? ' (' + d.volunteerAreas + ')' : '') + '\n';

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New registration: ' + d.fullName + ' — ' + (d.eventTitle || 'Event'),
    body: body,
    replyTo: d.email
  });
}

function confirm_(d, seats) {
  var body =
    'Hello ' + d.fullName + ',\n\n' +
    'Your place at ' + (d.eventTitle || 'the event') + ' is confirmed' +
    (seats > 1 ? ' for ' + seats + ' seats' : '') + '.\n\n' +
    'We will be in touch with details closer to the date.\n\n' +
    (d.volunteer === 'yes'
      ? 'Thank you for offering to serve on the workforce. Someone from the team will reach out.\n\n'
      : '') +
    'Dominion City\n';

  MailApp.sendEmail({
    to: d.email,
    subject: 'You are registered for ' + (d.eventTitle || 'the event'),
    body: body
  });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
