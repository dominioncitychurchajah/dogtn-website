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
// Display name on outgoing mail. Without it Gmail shows the raw account name
// ("dominioncitychurcha..."), which is what recipients were seeing.
var SENDER_NAME = 'Gabe';
var SITE_URL = 'https://dogtn-website.pages.dev';
// PNG, not the site's WebP logo: Outlook still will not render WebP.
var LOGO_URL = SITE_URL + '/images/logo/dr-david-ogbueli-brand-dark.png';
var REPLY_PHONE = '+234 803 550 8230';
var TAB_REGISTRATIONS = 'Registrations';
var TAB_WAITLIST = 'Mentorship waitlist';

var HEADERS_REGISTRATIONS = [
  'Submitted at', 'Event', 'Full name', 'Email', 'Phone',
  'Country', 'Seats', 'Volunteer', 'Volunteer areas'
];

var HEADERS_WAITLIST = [
  'Submitted at', 'Track', 'Full name', 'Email', 'Phone', 'Country', 'Current role'
];

/** First word of a name, for greetings. Falls back to the whole string. */
function firstName_(full) {
  return String(full || '').trim().split(/\s+/)[0] || String(full || '');
}

/**
 * Branded HTML wrapper for participant-facing mail. Table-based with inline
 * styles, which is the only layout email clients agree on. Every message also
 * carries a plain-text body, so clients that refuse HTML still read cleanly.
 */
function emailHtml_(opts) {
  var navy = '#0A192F', gold = '#C9A227', paper = '#F5F1E8', ink = '#4B5563';
  var rows = (opts.facts || []).map(function (f) {
    return '<tr>' +
      '<td style="padding:6px 0;color:#6B7280;font-size:14px;width:120px;">' + f[0] + '</td>' +
      '<td style="padding:6px 0;color:' + navy + ';font-size:14px;font-weight:600;">' + f[1] + '</td>' +
      '</tr>';
  }).join('');

  return '' +
  '<!doctype html><html><body style="margin:0;padding:0;background:' + paper + ';">' +
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + paper + ';padding:28px 12px;">' +
  '<tr><td align="center">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">' +

      '<tr><td align="center" style="background:' + paper + ';padding:26px 24px;">' +
        '<img src="' + LOGO_URL + '" alt="Dr. David Ogbueli" width="170" style="display:block;border:0;width:170px;max-width:60%;height:auto;">' +
      '</td></tr>' +

      '<tr><td style="padding:34px 32px 8px 32px;">' +
        '<h1 style="margin:0 0 14px 0;font-size:23px;line-height:1.3;color:' + navy + ';font-weight:700;">' + opts.heading + '</h1>' +
        '<p style="margin:0 0 16px 0;font-size:16px;line-height:1.65;color:' + ink + ';">' + opts.intro + '</p>' +
      '</td></tr>' +

      (rows ? '<tr><td style="padding:6px 32px 4px 32px;">' +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" ' +
        'style="border-top:1px solid #E5E7EB;border-bottom:1px solid #E5E7EB;padding:8px 0;">' + rows + '</table>' +
      '</td></tr>' : '') +

      '<tr><td style="padding:18px 32px 6px 32px;">' +
        '<p style="margin:0;font-size:16px;line-height:1.65;color:' + ink + ';">' + opts.body + '</p>' +
      '</td></tr>' +

      (opts.ctaUrl ? '<tr><td style="padding:24px 32px 8px 32px;">' +
        '<a href="' + opts.ctaUrl + '" style="display:inline-block;background:' + gold + ';color:' + navy +
        ';text-decoration:none;font-weight:700;font-size:15px;padding:14px 26px;border-radius:10px;">' +
        opts.ctaLabel + '</a>' +
      '</td></tr>' : '') +

      '<tr><td style="padding:26px 32px 30px 32px;">' +
        '<p style="margin:0;font-size:15px;line-height:1.6;color:' + ink + ';">Gabe<br>' +
        '<span style="color:#9CA3AF;font-size:13px;">Dr. David Ogbueli Ministries</span></p>' +
      '</td></tr>' +

      '<tr><td style="background:' + navy + ';padding:20px 32px;">' +
        '<p style="margin:0;font-size:13px;line-height:1.6;color:#94A3B8;">' +
          'Questions? Call <a href="tel:+2348035508230" style="color:' + gold + ';text-decoration:none;">' + REPLY_PHONE + '</a>' +
          ' or just reply to this email.' +
        '</p>' +
      '</td></tr>' +

    '</table>' +
  '</td></tr></table></body></html>';
}

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
    name: SENDER_NAME,
    subject: 'Mentorship waitlist: ' + d.fullName + ' - ' + (d.trackName || 'No preference'),
    body: d.fullName + ' joined the mentorship waitlist.\n\n' +
          'Track:   ' + (d.trackName || 'No preference') + '\n' +
          'Email:   ' + d.email + '\n' +
          'Phone:   ' + d.phone + '\n' +
          'Country: ' + d.country + '\n' +
          (d.currentRole ? 'Role:    ' + d.currentRole + '\n' : ''),
    replyTo: d.email
  });

  var first = firstName_(d.fullName);
  var track = d.trackName || 'mentorship';
  MailApp.sendEmail({
    to: d.email,
    name: SENDER_NAME,
    subject: 'Congratulations \ud83c\udf89 you are on the mentorship waitlist',
    body:
      'Congratulations \ud83c\udf89 ' + first + ', you are on the waitlist for the ' + track + ' track.\n\n' +
      'When the mentorship app opens we will send your invitation to this address, ' +
      'so nothing further is needed from you now.\n\n' +
      'Gabe\nDr. David Ogbueli Ministries\n',
    htmlBody: emailHtml_({
      heading: 'Congratulations \ud83c\udf89 ' + first + ', you are on the list',
      intro: 'You are on the waitlist for the <strong>' + track + '</strong> track of mentorship with Dr. David Ogbueli.',
      facts: [['Track', track], ['Name', d.fullName]],
      body: 'The mentorship runs in a dedicated app. When it opens we will send your invitation ' +
            'to this address, so nothing further is needed from you now.',
      ctaUrl: SITE_URL + '/en/start-here/',
      ctaLabel: 'Explore the tracks'
    })
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
    name: SENDER_NAME,
    subject: 'New registration: ' + d.fullName + ' — ' + (d.eventTitle || 'Event'),
    body: body,
    replyTo: d.email
  });
}

function confirm_(d, seats) {
  var first = firstName_(d.fullName);
  var event = d.eventTitle || 'the event';
  var facts = [['Event', event], ['Seats', String(seats)]];
  if (d.volunteer === 'yes') facts.push(['Workforce', 'Yes' + (d.volunteerAreas ? ' - ' + d.volunteerAreas : '')]);

  MailApp.sendEmail({
    to: d.email,
    name: SENDER_NAME,
    subject: 'Congratulations \ud83c\udf89 you are registered for ' + event,
    body:
      'Congratulations \ud83c\udf89 ' + first + ', your place at ' + event + ' is confirmed' +
      (seats > 1 ? ' for ' + seats + ' seats' : '') + '.\n\n' +
      'We will be in touch with details closer to the date.\n\n' +
      (d.volunteer === 'yes'
        ? 'Thank you for offering to serve on the workforce. Someone from the team will reach out.\n\n'
        : '') +
      'Gabe\nDr. David Ogbueli Ministries\n',
    htmlBody: emailHtml_({
      heading: 'Congratulations \ud83c\udf89 ' + first + ', your place is confirmed',
      intro: 'You are registered for <strong>' + event + '</strong>.',
      facts: facts,
      body: 'We will be in touch with details closer to the date.' +
            (d.volunteer === 'yes'
              ? ' Thank you for offering to serve on the workforce \u2014 someone from the team will reach out.'
              : ''),
      ctaUrl: SITE_URL + '/en/register/',
      ctaLabel: 'Event details'
    })
  });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
