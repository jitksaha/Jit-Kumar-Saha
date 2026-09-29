<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// Read API key from environment or local server file
$apiKey = getenv('RESEND_API_KEY');
if (!$apiKey && file_exists(__DIR__ . '/.env')) {
    $env = parse_ini_file(__DIR__ . '/.env');
    $apiKey = $env['RESEND_API_KEY'] ?? null;
}
if (!$apiKey && file_exists(__DIR__ . '/../.env')) {
    $env = parse_ini_file(__DIR__ . '/../.env');
    $apiKey = $env['RESEND_API_KEY'] ?? null;
}
if (!$apiKey && file_exists(__DIR__ . '/../.env.local')) {
    $lines = file(__DIR__ . '/../.env.local', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), 'RESEND_API_KEY=') === 0) {
            $apiKey = trim(substr(trim($line), 15));
            break;
        }
    }
}

if (!$apiKey) {
    http_response_code(500);
    echo json_encode(["error" => "Server configuration error: Resend API key not configured"]);
    exit;
}

$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

$type = $input['type'] ?? 'enterprise';
$refId = $input['refId'] ?? ('REF-' . time());
$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$company = $input['company'] ?? '';
$role = $input['role'] ?? '';
$country = $input['country'] ?? '';
$needs = $input['needs'] ?? [];
$services = $input['services'] ?? [];
$budget = $input['budget'] ?? '';
$timeline = $input['timeline'] ?? '';
$brief = $input['brief'] ?? '';
$message = $input['message'] ?? '';
$meetingDate = $input['meetingDate'] ?? '';
$meetingSlot = $input['meetingSlot'] ?? '';
$preferredContact = $input['preferredContact'] ?? '';
$pdfBase64 = $input['pdfBase64'] ?? '';
$pdfFilename = $input['pdfFilename'] ?? ("Jit_Kumar_Saha_Executive_Brief_{$refId}.pdf");

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(["error" => "Name and email are required fields."]);
    exit;
}

// Verified sender from jitksaha.com
$fromEmail = 'Jit Kumar Saha <mail@jitksaha.com>';
$adminRecipients = ['mail.jitsaha@gmail.com', 'mail@jitksaha.com'];
$initiativeList = !empty($needs) ? implode(', ', $needs) : (!empty($services) ? implode(', ', $services) : 'N/A');
$summaryNotes = !empty($brief) ? $brief : (!empty($message) ? $message : 'No extra notes provided.');

// Parse timeslot into UTC
$hour = 15;
$minute = 0;
if (!empty($meetingSlot)) {
    if (preg_match('/(\d{1,2}):(\d{2})\s*(AM|PM)?/i', $meetingSlot, $matches)) {
        $h = intval($matches[1]);
        $m = intval($matches[2]);
        $isPm = isset($matches[3]) && strtoupper($matches[3]) === 'PM';
        $isAm = isset($matches[3]) && strtoupper($matches[3]) === 'AM';
        if ($isPm && $h < 12) $h += 12;
        if ($isAm && $h == 12) $h = 0;
        $hour = $h;
        $minute = $m;
    }
}

$y = intval(date('Y'));
$mo = intval(date('m'));
$d = intval(date('d'));

if (!empty($meetingDate)) {
    if (preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})$/', trim($meetingDate), $dMatch)) {
        $y = intval($dMatch[1]);
        $mo = intval($dMatch[2]);
        $d = intval($dMatch[3]);
    } else {
        $parsedTs = strtotime($meetingDate);
        if ($parsedTs !== false) {
            $y = intval(date('Y', $parsedTs));
            $mo = intval(date('m', $parsedTs));
            $d = intval(date('d', $parsedTs));
        }
    }
}

// BST is UTC+6
$startTs = gmmktime($hour - 6, $minute, 0, $mo, $d, $y);
$endTs = $startTs + (45 * 60);

$startUtc = gmdate('Ymd\THis\Z', $startTs);
$endUtc = gmdate('Ymd\THis\Z', $endTs);
$startIso = gmdate('c', $startTs);
$endIso = gmdate('c', $endTs);

$calTitle = "Executive Consultation — Jit Kumar Saha & " . ($company ?: $name);
$calDetails = "Executive Project Consultation with Jit Kumar Saha.\nReference: {$refId}\nOrganization: " . ($company ?: 'N/A') . "\nRole: " . ($role ?: 'Executive') . "\nInitiatives: {$initiativeList}\nInvestment: {$budget}\nTimeline: {$timeline}\nTimezone: Bangladesh Standard Time (BST · UTC+6)";

$googleCalUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" . urlencode($calTitle) . "&details=" . urlencode($calDetails) . "&location=" . urlencode("Google Meet / Video Call") . "&dates={$startUtc}/{$endUtc}&ctz=Asia/Dhaka";

// Build attachments
$attachments = [];
if (!empty($pdfBase64)) {
    $attachments[] = [
        'filename' => $pdfFilename,
        'content' => $pdfBase64
    ];
}

// Generate ICS Content
$nowUtc = gmdate('Ymd\THis\Z');
$cleanTitle = str_replace(',', '\,', $calTitle);
$cleanDetails = str_replace(["\r\n", "\n", ","], ['\n', '\n', '\,'], $calDetails);

$icsContent = "BEGIN:VCALENDAR\r\n" .
    "VERSION:2.0\r\n" .
    "PRODID:-//Jit Kumar Saha//Executive Consultation//EN\r\n" .
    "CALSCALE:GREGORIAN\r\n" .
    "METHOD:REQUEST\r\n" .
    "BEGIN:VEVENT\r\n" .
    "UID:exec-{$refId}@jitksaha.com\r\n" .
    "DTSTAMP:{$nowUtc}\r\n" .
    "DTSTART:{$startUtc}\r\n" .
    "DTEND:{$endUtc}\r\n" .
    "SUMMARY:{$cleanTitle}\r\n" .
    "DESCRIPTION:{$cleanDetails}\r\n" .
    "LOCATION:Google Meet / Video Call\r\n" .
    "STATUS:CONFIRMED\r\n" .
    "SEQUENCE:0\r\n" .
    "ORGANIZER;CN=\"Jit Kumar Saha\":mailto:mail@jitksaha.com\r\n" .
    "ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=\"{$name}\":mailto:{$email}\r\n" .
    "ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=\"Jit Kumar Saha\":mailto:mail@jitksaha.com\r\n" .
    "BEGIN:VALARM\r\n" .
    "TRIGGER:-PT15M\r\n" .
    "ACTION:DISPLAY\r\n" .
    "DESCRIPTION:Reminder: Consultation with Jit Kumar Saha in 15 minutes\r\n" .
    "END:VALARM\r\n" .
    "END:VEVENT\r\n" .
    "END:VCALENDAR";

$attachments[] = [
    'filename' => "consultation_{$refId}.ics",
    'content' => base64_encode($icsContent)
];

// Clean SVG Icons
$iconCal = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#163300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>';
$iconCalWhite = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DCFF85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>';
$iconClock = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2d4f18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
$iconClip = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b633d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>';
$iconBell = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5a754e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px;"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>';
$iconArrow = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DCFF85" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -1px; margin-left: 5px;"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>';

// Schema.org EventReservation JSON-LD
$jsonLdMarkup = <<<JSONLD
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "EventReservation",
  "reservationNumber": "{$refId}",
  "reservationStatus": "http://schema.org/Confirmed",
  "underName": {
    "@type": "Person",
    "name": "{$name}"
  },
  "reservationFor": {
    "@type": "BusinessEvent",
    "name": "Executive Consultation with Jit Kumar Saha",
    "startDate": "{$startIso}",
    "endDate": "{$endIso}",
    "location": {
      "@type": "VirtualLocation",
      "name": "Google Meet / Video Consultation",
      "url": "https://meet.google.com"
    },
    "performer": {
      "@type": "Person",
      "name": "Jit Kumar Saha"
    }
  }
}
</script>
JSONLD;

// 1. ADMIN NOTIFICATION EMAIL (Sent to Jit Kumar Saha)
$adminSubject = ($type === 'enterprise')
    ? "[NEW CLIENT LEAD] " . ($company ? "{$company} · " : "") . "{$name} [Ref: {$refId}]"
    : "[NEW INQUIRY] {$name} · " . ($company ? $company : 'Direct') . " [Ref: {$refId}]";

$adminHeaderTitle = ($type === 'enterprise')
    ? "New Enterprise Client Lead Received"
    : "New Contact Form Message Received";

$calCardHtml = !empty($meetingDate) ? <<<CAL
<div style="background: #f0f7ea; border: 1px solid #cce5c0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
  <div style="font-size: 14px; font-weight: 700; color: #163300; margin-bottom: 6px;">{$iconCal}Consultation Session Overview</div>
  <div style="font-size: 13px; color: #2d4f18; font-weight: 600; margin-bottom: 12px;">{$iconClock}{$meetingDate} @ {$meetingSlot} (BST UTC+6)</div>
  <div>
    <a href="{$googleCalUrl}" target="_blank" class="cal-btn" style="display: inline-block; background-color: #163300; color: #DCFF85 !important; text-decoration: none !important; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 9999px; border: 1px solid rgba(220, 255, 133, 0.4); box-shadow: 0 4px 14px rgba(22, 51, 0, 0.16); transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1); text-align: center;">
      <span style="color: #DCFF85 !important; text-decoration: none !important; display: inline-flex; align-items: center; vertical-align: middle;">
        {$iconCalWhite}
        <span class="cal-text" style="color: #DCFF85 !important; text-decoration: none !important; font-weight: 700 !important; margin-left: 6px; margin-right: 6px;">Open in Google Calendar</span>
        {$iconArrow}
      </span>
    </a>
  </div>
</div>
CAL : '';

$adminHtml = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  {$jsonLdMarkup}
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f6; margin: 0; padding: 24px; color: #163300; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8de; overflow: hidden; box-shadow: 0 4px 20px rgba(22,51,0,0.06); }
    .header { background: #163300; padding: 28px 32px; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #DCFF85; }
    .header p { margin: 0; font-size: 13px; opacity: 0.85; }
    .content { padding: 32px; }
    .badge { display: inline-block; background: #E8F7C8; color: #163300; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; margin-bottom: 20px; }
    
    .cal-btn {
      display: inline-block !important;
      background-color: #163300 !important;
      color: #DCFF85 !important;
      text-decoration: none !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      padding: 10px 22px !important;
      border-radius: 9999px !important;
      border: 1px solid rgba(220, 255, 133, 0.4) !important;
      box-shadow: 0 4px 14px rgba(22, 51, 0, 0.16) !important;
      transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1) !important;
    }
    .cal-btn:hover {
      background-color: #DCFF85 !important;
      color: #163300 !important;
      border-color: #163300 !important;
      box-shadow: 0 6px 20px rgba(22, 51, 0, 0.28) !important;
      transform: translateY(-2px) scale(1.02) !important;
    }
    .cal-btn:hover span, .cal-btn:hover .cal-text {
      color: #163300 !important;
    }
    .cal-btn:hover svg, .cal-btn:hover svg line, .cal-btn:hover svg rect, .cal-btn:hover svg path {
      stroke: #163300 !important;
    }

    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table td { padding: 10px 0; border-bottom: 1px solid #f0f4ee; font-size: 14px; vertical-align: top; }
    .table td.label { width: 150px; font-weight: 600; color: #4b633d; }
    .table td.value { color: #163300; font-weight: 500; }
    .notes-box { background: #f9fbf8; border-left: 4px solid #9FE870; padding: 16px 18px; border-radius: 0 8px 8px 0; font-size: 13.5px; line-height: 1.6; color: #223a10; margin-bottom: 24px; }
    .reply-banner { background: #163300; color: #ffffff; padding: 14px 18px; border-radius: 8px; font-size: 13px; line-height: 1.5; margin-top: 20px; }
    .footer { background: #f3f6f1; padding: 20px 32px; font-size: 12px; color: #6d8063; text-align: center; border-top: 1px solid #e2e8de; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>{$adminHeaderTitle}</h1>
      <p>Reference Code: <strong>{$refId}</strong> · Bangladesh Standard Time (BST · UTC+6)</p>
    </div>
    <div class="content">
      <div class="badge">{$type} LEAD DISPATCH</div>

      {$calCardHtml}

      <table class="table">
        <tr><td class="label">Full Name</td><td class="value"><strong>{$name}</strong></td></tr>
        <tr><td class="label">Work Email</td><td class="value"><a href="mailto:{$email}" style="color: #163300; font-weight: 600;">{$email}</a></td></tr>
        <tr><td class="label">Organization</td><td class="value">{$company}</td></tr>
        <tr><td class="label">Role / Title</td><td class="value">{$role}</td></tr>
        <tr><td class="label">Country / Region</td><td class="value">{$country}</td></tr>
        <tr><td class="label">Initiatives / Scope</td><td class="value"><strong>{$initiativeList}</strong></td></tr>
        <tr><td class="label">Budget Range</td><td class="value">{$budget}</td></tr>
        <tr><td class="label">Target Timeline</td><td class="value">{$timeline}</td></tr>
        <tr><td class="label">Scheduled Time</td><td class="value" style="color: #163300; font-weight: 700;">{$iconCal}{$meetingDate} @ {$meetingSlot}</td></tr>
      </table>
      
      <div style="font-size: 13px; font-weight: 700; color: #163300; margin-bottom: 8px;">Initiative Summary / Notes:</div>
      <div class="notes-box">
        {$summaryNotes}
      </div>

      <div class="reply-banner">
        <strong>Direct Reply:</strong> Hitting <strong>"Reply"</strong> in your email app will reply directly to <strong>{$name} ({$email})</strong> with this thread and reference ID preserved.
      </div>

      <p style="font-size: 12px; color: #6d8063; margin-top: 16px; margin-bottom: 0;">
        {$iconClip}<strong>Attached Files:</strong> Signed PDF Brief (<code>{$pdfFilename}</code>) &amp; Calendar Event (<code>consultation_{$refId}.ics</code>).
      </p>
    </div>
    <div class="footer">
      Jit Kumar Saha Executive Consultation Desk · <a href="mailto:{$email}" style="color: #163300; font-weight: bold;">Reply directly to client ({$email})</a>
    </div>
  </div>
</body>
</html>
HTML;

$adminPayload = json_encode([
    'from' => $fromEmail,
    'to' => $adminRecipients,
    'reply_to' => "{$name} <{$email}>",
    'subject' => $adminSubject,
    'html' => $adminHtml,
    'attachments' => $attachments
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $adminPayload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . $apiKey,
    "Content-Type: application/json"
]);

$adminResponse = curl_exec($ch);
$adminHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 2. CLIENT CONFIRMATION EMAIL (Sent to User)
$clientSubject = ($type === 'enterprise')
    ? "[CONSULTATION CONFIRMED] Executive Brief Copy [Ref: {$refId}] — Jit Kumar Saha"
    : "[INQUIRY RECEIVED] Thank you for reaching out [Ref: {$refId}] — Jit Kumar Saha";

$clientCalCardHtml = !empty($meetingDate) ? <<<CCAL
<div style="background: #f0f7ea; border: 1px solid #cce5c0; border-radius: 12px; padding: 20px; margin: 20px 0;">
  <div style="font-size: 15px; font-weight: 700; color: #163300; margin-bottom: 6px;">{$iconCal}Scheduled Consultation &amp; Calendar Link</div>
  <div style="font-size: 13.5px; color: #2d4f18; font-weight: 600; margin-bottom: 14px;">{$iconClock}{$meetingDate} @ {$meetingSlot} (BST UTC+6) · 45 Mins</div>
  <div style="margin-bottom: 12px;">
    <a href="{$googleCalUrl}" target="_blank" class="cal-btn" style="display: inline-block; background-color: #163300; color: #DCFF85 !important; text-decoration: none !important; font-size: 13px; font-weight: 700; padding: 11px 24px; border-radius: 9999px; border: 1px solid rgba(220, 255, 133, 0.4); box-shadow: 0 4px 14px rgba(22, 51, 0, 0.16); transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1); text-align: center;">
      <span style="color: #DCFF85 !important; text-decoration: none !important; display: inline-flex; align-items: center; vertical-align: middle;">
        {$iconCalWhite}
        <span class="cal-text" style="color: #DCFF85 !important; text-decoration: none !important; font-weight: 700 !important; margin-left: 6px; margin-right: 6px;">Add to Google Calendar</span>
        {$iconArrow}
      </span>
    </a>
  </div>
  <div style="font-size: 11.5px; color: #5a754e;">
    {$iconBell}An iCalendar event (<code>consultation_{$refId}.ics</code>) with a 15-minute prior reminder is attached for Apple Calendar and Outlook.
  </div>
</div>
CCAL : '';

$clientHtml = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  {$jsonLdMarkup}
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f6; margin: 0; padding: 24px; color: #163300; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8de; overflow: hidden; box-shadow: 0 4px 20px rgba(22,51,0,0.06); }
    .header { background: #163300; padding: 32px; color: #ffffff; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #DCFF85; }
    .header p { margin: 0; font-size: 13px; color: #e2e8de; }
    .content { padding: 32px; font-size: 14.5px; line-height: 1.6; color: #233a12; }
    
    .cal-btn {
      display: inline-block !important;
      background-color: #163300 !important;
      color: #DCFF85 !important;
      text-decoration: none !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      padding: 11px 24px !important;
      border-radius: 9999px !important;
      border: 1px solid rgba(220, 255, 133, 0.4) !important;
      box-shadow: 0 4px 14px rgba(22, 51, 0, 0.16) !important;
      transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1) !important;
    }
    .cal-btn:hover {
      background-color: #DCFF85 !important;
      color: #163300 !important;
      border-color: #163300 !important;
      box-shadow: 0 6px 20px rgba(22, 51, 0, 0.28) !important;
      transform: translateY(-2px) scale(1.02) !important;
    }
    .cal-btn:hover span, .cal-btn:hover .cal-text {
      color: #163300 !important;
    }
    .cal-btn:hover svg, .cal-btn:hover svg line, .cal-btn:hover svg rect, .cal-btn:hover svg path {
      stroke: #163300 !important;
    }

    .box { background: #f5f8f3; border-radius: 12px; padding: 18px 20px; margin: 20px 0; border: 1px solid #e1ebdc; }
    .badge { display: inline-block; background: #DCFF85; color: #163300; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; margin-bottom: 12px; }
    .reply-box { background: #163300; color: #DCFF85; padding: 14px 18px; border-radius: 8px; font-size: 13px; line-height: 1.5; margin: 20px 0; }
    .reply-box a { color: #ffffff; font-weight: bold; text-decoration: underline; }
    .footer { background: #f3f6f1; padding: 24px 32px; font-size: 12px; color: #6d8063; border-top: 1px solid #e2e8de; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>JIT KUMAR SAHA</h1>
      <p>Executive Technology Consultant & Product Leader</p>
    </div>
    <div class="content">
      <p>Dear <strong>{$name}</strong>,</p>
      <p>
        Thank you for reaching out and submitting your Consultation Brief.
        I have received your details and look forward to learning more about <strong>{$company}</strong>.
      </p>

      {$clientCalCardHtml}

      <div class="box">
        <span class="badge">CONFIRMED DETAILS</span>
        <div style="font-size: 13px; line-height: 1.7; color: #163300;">
          <div><strong>Reference ID:</strong> {$refId}</div>
          <div><strong>Primary Initiatives:</strong> {$initiativeList}</div>
          <div><strong>Consultation Date & Slot:</strong> {$meetingDate} @ {$meetingSlot}</div>
          <div><strong>Investment Scope:</strong> {$budget}</div>
        </div>
      </div>

      <p>
        {$iconClip}<strong>Attached Copy:</strong> A generated signed PDF of your initiative brief (<code>{$pdfFilename}</code>) is attached to this email for your records.
      </p>

      <div class="reply-box">
        <strong>Need to add details or reply?</strong><br/>
        Simply hit <strong>"Reply"</strong> to this email, and your message will land straight in my personal inbox at <a href="mailto:mail@jitksaha.com">mail@jitksaha.com</a> with your reference code <code>[Ref: {$refId}]</code>.
      </div>

      <p style="margin-top: 20px;">
        <strong>What happens next?</strong><br/>
        I will review your technical and business context ahead of our meeting. If anything urgent arises, you can reach me directly via WhatsApp at <strong>+880 1601 111994</strong>.
      </p>

      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e5ede0;">
        <div style="font-weight: 700; color: #163300; font-size: 15px;">Jit Kumar Saha</div>
        <div style="font-size: 13px; color: #556c49;">mail@jitksaha.com · <a href="https://jitksaha.com" style="color: #163300;">jitksaha.com</a></div>
      </div>
    </div>
    <div class="footer">
      Bilateral Mutual NDA & Dynime Business Services Agreement · Dhaka, Bangladesh & Global Remote
    </div>
  </div>
</body>
</html>
HTML;

$clientPayload = json_encode([
    'from' => $fromEmail,
    'to' => [$email],
    'reply_to' => 'Jit Kumar Saha <mail@jitksaha.com>',
    'subject' => $clientSubject,
    'html' => $clientHtml,
    'attachments' => $attachments
]);

$ch2 = curl_init('https://api.resend.com/emails');
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_POST, true);
curl_setopt($ch2, CURLOPT_POSTFIELDS, $clientPayload);
curl_setopt($ch2, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . $apiKey,
    "Content-Type: application/json"
]);
$clientResponse = curl_exec($ch2);
$clientHttpCode = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
curl_close($ch2);

if ($adminHttpCode >= 400) {
    http_response_code($adminHttpCode);
    echo $adminResponse ?: json_encode(["error" => "Resend email dispatch failed"]);
    exit;
}

echo json_encode([
    "success" => true,
    "refId" => $refId,
    "adminSent" => true,
    "clientSent" => ($clientHttpCode < 400)
]);
