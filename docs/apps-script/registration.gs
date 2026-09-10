/**
 * Form endpoint for dogtn-website. Handles two kinds of submission, told
 * apart by the `type` field: "registration" (an event) and "waitlist" (the
 * mentorship app). Each writes to its own tab and sends its own emails.
 *
 * Setup (about two minutes):
 *   1. Open your Google Sheet -> Extensions -> Apps Script.
 *      Opening it from inside the Sheet binds the script to that Sheet, so
 *      there is no id to configure here and none to leak into a public repo.
 *   2. Paste this file over Code.gs.
 *   3. Check NOTIFY_EMAIL below.
 *   4. Deploy -> New deployment -> type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone            <- required; the site posts anonymously
 *   5. Copy the /exec URL and set it as NEXT_PUBLIC_REGISTRATION_ENDPOINT
 *      in the Cloudflare Pages build settings.
 *
 * Changing who gets notified is a one-line edit here plus a redeploy of this
 * script. It needs no rebuild of the website.
 */

var NOTIFY_EMAIL = 'dominioncitychurchajah1@gmail.com';
var TAB_REGISTRATIONS = 'Registrations';
var TAB_WAITLIST = 'Mentorship waitlist';

var HEADERS_REGISTRATIONS = [
  'Submitted at', 'Event', 'Full name', 'Email', 'Phone',
  'Country', 'Seats', 'Volunteer', 'Volunteer areas'
];

var HEADERS_WAITLIST = [
  'Submitted at', 'Track', 'Full name', 'Email', 'Phone', 'Country', 'Current role'
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

    if (d.type === 'waitlist') return handleWaitlist_(d);

    var sheet = getSheet_(TAB_REGISTRATIONS, HEADERS_REGISTRATIONS);
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

/** Mentorship-app waitlist: no seats, no event, a track preference instead. */
function handleWaitlist_(d) {
  var sheet = getSheet_(TAB_WAITLIST, HEADERS_WAITLIST);
  sheet.appendRow([
    new Date(),
    d.trackName || 'No preference',
    d.fullName,
    d.email,
    "'" + String(d.phone),
    d.country,
    d.currentRole || ''
  ]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'Mentorship waitlist: ' + d.fullName + ' - ' + (d.trackName || 'No preference'),
    body: d.fullName + ' joined the mentorship waitlist.\n\n' +
          'Track:   ' + (d.trackName || 'No preference') + '\n' +
          'Email:   ' + d.email + '\n' +
          'Phone:   ' + d.phone + '\n' +
          'Country: ' + d.country + '\n' +
          (d.currentRole ? 'Role:    ' + d.currentRole + '\n' : ''),
    replyTo: d.email
  });

  MailApp.sendEmail({
    to: d.email,
    subject: 'You are on the mentorship waitlist',
    body: 'Hello ' + d.fullName + ',\n\n' +
          'You are on the waitlist for the ' + (d.trackName || 'mentorship') + ' track.\n\n' +
          'When the mentorship app opens we will send your invitation to this ' +
          'address, so nothing further is needed from you now.\n\n' +
          'Dominion City\n'
  });

  return json({ ok: true });
}

function getSheet_(tabName, headers) {
  // Bound script: resolves to the Sheet this script was created from.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Not bound to a Sheet. Create the script via Extensions -> Apps Script from inside your Sheet.');
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
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
