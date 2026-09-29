import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';

// Helper to parse time slot like "03:00 PM BST (Dhaka UTC+6)" into UTC ISO & Google Calendar dates
function parseSlotTimeToUtc(dateStr: string, slotStr?: string) {
  let hour = 15; // default 3 PM BST
  let minute = 0;

  if (slotStr) {
    const match = slotStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (match) {
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const isPm = match[3]?.toUpperCase() === 'PM';
      const isAm = match[3]?.toUpperCase() === 'AM';

      if (isPm && h < 12) h += 12;
      if (isAm && h === 12) h = 0;
      hour = h;
      minute = m;
    }
  }

  let year = 2026;
  let month = 10;
  let day = 15;

  if (dateStr) {
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateStr.trim())) {
      const parts = dateStr.trim().split('-').map((v) => parseInt(v, 10));
      year = parts[0];
      month = parts[1];
      day = parts[2];
    } else {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        year = parsed.getFullYear();
        month = parsed.getMonth() + 1;
        day = parsed.getDate();
      }
    }
  } else {
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
    day = today.getDate();
  }

  // BST is UTC+6 -> subtract 6 hours for UTC
  const startDate = new Date(Date.UTC(year, month - 1, day, hour - 6, minute, 0));
  const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // 45 minutes

  const formatUtc = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return {
    startUtc: formatUtc(startDate),
    endUtc: formatUtc(endDate),
    startIso: startDate.toISOString(),
    endIso: endDate.toISOString(),
  };
}

function generateIcsBase64({
  refId,
  title,
  details,
  date,
  timeSlot,
  name,
  email,
}: {
  refId: string;
  title: string;
  details: string;
  date: string;
  timeSlot?: string;
  name: string;
  email: string;
}) {
  const { startUtc, endUtc } = parseSlotTimeToUtc(date, timeSlot);
  const nowUtc = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const cleanTitle = (title || 'Executive Consultation — Jit Kumar Saha').replace(/,/g, '\\,');
  const cleanDetails = (details || '').replace(/\n/g, '\\n').replace(/,/g, '\\,');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jit Kumar Saha//Executive Consultation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:exec-${refId || Date.now()}@jitksaha.com`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDetails}`,
    'LOCATION:Google Meet / Video Call',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'ORGANIZER;CN="Jit Kumar Saha":mailto:mail@jitksaha.com',
    email ? `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="${name || 'Client'}":mailto:${email}` : '',
    'ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN="Jit Kumar Saha":mailto:mail@jitksaha.com',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Consultation with Jit Kumar Saha in 15 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const icsString = lines.filter(Boolean).join('\r\n');
  return Buffer.from(icsString, 'utf-8').toString('base64');
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '';
  const resendApiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY || '';

  return {
    plugins: [
      TanStackRouterVite({
        routesDirectory: './src/routes',
        generatedRouteTree: './src/routeTree.gen.ts',
        routeFileIgnorePrefix: '-',
        quoteStyle: 'single',
      }),
      react(),
      {
        name: 'server-api-endpoints',
        configureServer(server) {
          // 1. AI Writer proxy
          server.middlewares.use('/api/ai-writer', async (req, res, next) => {
            if (req.method !== 'POST') {
              return next();
            }
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const prompt = parsed.prompt || '';
                const system =
                  parsed.system ||
                  'You are an executive technology consultant. Write crisp, high-impact enterprise problem summaries and project scopes in 2-4 sentences with clear business value and technical direction.';

                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://jitksaha.com',
                    'X-Title': 'Jit Kumar Saha Portfolio AI Writer',
                  },
                  body: JSON.stringify({
                    model: 'openai/gpt-4o-mini',
                    messages: [
                      { role: 'system', content: system },
                      { role: 'user', content: prompt },
                    ],
                    max_tokens: 350,
                    temperature: 0.7,
                  }),
                });

                const data = await response.json();
                res.setHeader('Content-Type', 'application/json');
                if (!response.ok) {
                  res.statusCode = response.status;
                  res.end(
                    JSON.stringify({ error: data?.error?.message || 'Failed to generate brief' })
                  );
                  return;
                }
                const content = data?.choices?.[0]?.message?.content || '';
                res.statusCode = 200;
                res.end(JSON.stringify({ result: content }));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err?.message || 'Internal Server Error' }));
              }
            });
          });

          // 2. Resend Email Dispatcher with PDF & iCalendar (.ics) Attachment
          server.middlewares.use('/api/send-email', async (req, res, next) => {
            if (req.method !== 'POST') {
              return next();
            }
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const payload = JSON.parse(body || '{}');
                const {
                  type = 'enterprise', // 'enterprise' | 'inquiry'
                  refId = 'REF-' + Date.now(),
                  name = '',
                  email = '',
                  company = '',
                  role = '',
                  country = '',
                  needs = [],
                  services = [],
                  budget = '',
                  timeline = '',
                  brief = '',
                  message = '',
                  meetingDate = '',
                  meetingSlot = '',
                  preferredContact = '',
                  pdfBase64 = '',
                  pdfFilename = `Jit_Kumar_Saha_Executive_Brief_${refId}.pdf`,
                } = payload;

                if (!email || !name) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Name and email are required fields.' }));
                  return;
                }

                // Verified Custom Domain Sender
                const fromEmail = 'Jit Kumar Saha <mail@jitksaha.com>';
                const adminRecipients = ['mail.jitsaha@gmail.com', 'mail@jitksaha.com'];
                const initiativeList = (needs.length > 0 ? needs : services).join(', ') || 'N/A';
                const summaryNotes = brief || message || 'No extra notes provided.';

                // Calendar times & links
                const { startUtc, endUtc, startIso, endIso } = parseSlotTimeToUtc(
                  meetingDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
                  meetingSlot || '03:00 PM BST'
                );

                const calTitle = `Executive Consultation — Jit Kumar Saha & ${company || name}`;
                const calDetails = `Executive Project Consultation with Jit Kumar Saha.\nReference: ${refId}\nOrganization: ${
                  company || 'N/A'
                }\nRole: ${role || 'Executive'}\nInitiatives: ${initiativeList}\nInvestment: ${budget}\nTimeline: ${timeline}\nTimezone: Bangladesh Standard Time (BST · UTC+6)`;

                const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                  calTitle
                )}&details=${encodeURIComponent(calDetails)}&location=${encodeURIComponent(
                  'Google Meet / Video Call'
                )}&dates=${startUtc}/${endUtc}&ctz=Asia/Dhaka`;

                // Build attachments array
                const attachments: Array<{ filename: string; content: string }> = [];

                if (pdfBase64) {
                  attachments.push({
                    filename: pdfFilename,
                    content: pdfBase64,
                  });
                }

                // Add .ics Calendar invite attachment
                const icsBase64 = generateIcsBase64({
                  refId,
                  title: calTitle,
                  details: calDetails,
                  date: meetingDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
                  timeSlot: meetingSlot,
                  name,
                  email,
                });

                attachments.push({
                  filename: `consultation_${refId}.ics`,
                  content: icsBase64,
                });

                // Clean SVG Icons for Email (Replaces emojis) - uses stroke="currentColor" for perfect hover color flip
                const iconCal = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#163300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`;
                const iconCalWhite = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px; display: inline-block;"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`;
                const iconClock = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2d4f18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
                const iconClip = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b633d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 6px;"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`;
                const iconBell = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5a754e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px;"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`;
                const iconArrow = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -1px; margin-left: 5px; display: inline-block;"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>`;

                // Schema.org EventReservation JSON-LD
                const jsonLdMarkup = `
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "EventReservation",
  "reservationNumber": "${refId}",
  "reservationStatus": "http://schema.org/Confirmed",
  "underName": {
    "@type": "Person",
    "name": "${name}"
  },
  "reservationFor": {
    "@type": "BusinessEvent",
    "name": "Executive Consultation with Jit Kumar Saha",
    "startDate": "${startIso}",
    "endDate": "${endIso}",
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
                `;

                // --- 1. ADMIN NOTIFICATION EMAIL (Clean text titles without spammy emojis) ---
                const adminSubject =
                  type === 'enterprise'
                    ? `[NEW CLIENT LEAD] ${company ? company + ' · ' : ''}${name} [Ref: ${refId}]`
                    : `[NEW INQUIRY] ${name} · ${company || 'Direct'} [Ref: ${refId}]`;

                const adminHeaderTitle =
                  type === 'enterprise'
                    ? 'New Enterprise Client Lead Received'
                    : 'New Contact Form Message Received';

                const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  ${jsonLdMarkup}
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f6; margin: 0; padding: 24px; color: #163300; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8de; overflow: hidden; box-shadow: 0 4px 20px rgba(22,51,0,0.06); }
    .header { background: #163300; padding: 28px 32px; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #DCFF85; }
    .header p { margin: 0; font-size: 13px; opacity: 0.85; }
    .content { padding: 32px; }
    .badge { display: inline-block; background: #E8F7C8; color: #163300; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; margin-bottom: 20px; }
    
    .cal-card { background: #f0f7ea; border: 1px solid #cce5c0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px; }
    .cal-title { font-size: 14px; font-weight: 700; color: #163300; margin-bottom: 6px; }
    .cal-time { font-size: 13px; color: #2d4f18; font-weight: 600; margin-bottom: 12px; }
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
    .cal-btn * {
      color: inherit !important;
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
      <h1>${adminHeaderTitle}</h1>
      <p>Reference Code: <strong>${refId}</strong> · Bangladesh Standard Time (BST · UTC+6)</p>
    </div>
    <div class="content">
      <div class="badge">${type.toUpperCase()} LEAD DISPATCH</div>

      ${
        meetingDate
          ? `
      <div class="cal-card">
        <div class="cal-title">${iconCal}Consultation Session Overview</div>
        <div class="cal-time">${iconClock}${meetingDate} @ ${meetingSlot} (BST UTC+6)</div>
        <div>
          <a href="${googleCalUrl}" target="_blank" class="cal-btn" style="display: inline-block; background-color: #163300; color: #DCFF85; text-decoration: none; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 9999px; border: 1px solid rgba(220, 255, 133, 0.4); box-shadow: 0 4px 14px rgba(22, 51, 0, 0.16); transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1); text-align: center;">
            <span style="color: inherit; text-decoration: none; display: inline-flex; align-items: center; vertical-align: middle;">
              ${iconCalWhite}
              <span style="color: inherit; text-decoration: none; font-weight: 700; margin-left: 6px; margin-right: 6px;">Open in Google Calendar</span>
              ${iconArrow}
            </span>
          </a>
        </div>
      </div>`
          : ''
      }

      <table class="table">
        <tr><td class="label">Full Name</td><td class="value"><strong>${name}</strong></td></tr>
        <tr><td class="label">Work Email</td><td class="value"><a href="mailto:${email}" style="color: #163300; font-weight: 600;">${email}</a></td></tr>
        <tr><td class="label">Organization</td><td class="value">${company || 'Individual / Founder'}</td></tr>
        <tr><td class="label">Role / Title</td><td class="value">${role || 'Executive'}</td></tr>
        <tr><td class="label">Country / Region</td><td class="value">${country || 'Global'}</td></tr>
        <tr><td class="label">Initiatives / Scope</td><td class="value"><strong>${initiativeList}</strong></td></tr>
        <tr><td class="label">Budget Range</td><td class="value">${budget || 'Custom Scope'}</td></tr>
        <tr><td class="label">Target Timeline</td><td class="value">${timeline || 'Standard'}</td></tr>
        ${
          meetingDate
            ? `<tr><td class="label">Scheduled Time</td><td class="value" style="color: #163300; font-weight: 700;">${iconCal}${meetingDate} @ ${meetingSlot}</td></tr>`
            : ''
        }
        ${
          preferredContact
            ? `<tr><td class="label">Preferred Contact</td><td class="value">${preferredContact}</td></tr>`
            : ''
        }
      </table>
      
      <div style="font-size: 13px; font-weight: 700; color: #163300; margin-bottom: 8px;">Initiative Summary / Notes:</div>
      <div class="notes-box">
        ${summaryNotes.replace(/\n/g, '<br/>')}
      </div>

      <div class="reply-banner">
        <strong>Direct Reply:</strong> Hitting <strong>"Reply"</strong> in your email client will reply directly to <strong>${name} (${email})</strong> with this thread and reference ID preserved.
      </div>

      <p style="font-size: 12px; color: #6d8063; margin-top: 16px; margin-bottom: 0;">
        ${iconClip}<strong>Attached Files:</strong> Complete Signed PDF Brief (<code>${pdfFilename}</code>) &amp; Calendar Event file (<code>consultation_${refId}.ics</code>).
      </p>
    </div>
    <div class="footer">
      Jit Kumar Saha Executive Consultation Desk · <a href="mailto:${email}" style="color: #163300; font-weight: bold;">Reply directly to client (${email})</a>
    </div>
  </div>
</body>
</html>
                `;

                // Dispatch to Admin with reply_to set to client's email
                const adminSendResponse = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: fromEmail,
                    to: adminRecipients,
                    reply_to: `${name} <${email}>`,
                    subject: adminSubject,
                    html: adminHtml,
                    attachments,
                  }),
                });

                const adminData = await adminSendResponse.json();

                // --- 2. CLIENT CONFIRMATION EMAIL (Clean text subject without spam triggers) ---
                let clientData: any = null;
                let clientSent = false;

                const clientSubject =
                  type === 'enterprise'
                    ? `[CONSULTATION CONFIRMED] Executive Brief Copy [Ref: ${refId}] — Jit Kumar Saha`
                    : `[INQUIRY RECEIVED] Thank you for reaching out [Ref: ${refId}] — Jit Kumar Saha`;

                const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  ${jsonLdMarkup}
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f6; margin: 0; padding: 24px; color: #163300; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8de; overflow: hidden; box-shadow: 0 4px 20px rgba(22,51,0,0.06); }
    .header { background: #163300; padding: 32px; color: #ffffff; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #DCFF85; }
    .header p { margin: 0; font-size: 13px; color: #e2e8de; }
    .content { padding: 32px; font-size: 14.5px; line-height: 1.6; color: #233a12; }
    
    .cal-card { background: #f0f7ea; border: 1px solid #cce5c0; border-radius: 12px; padding: 20px; margin: 20px 0; }
    .cal-title { font-size: 15px; font-weight: 700; color: #163300; margin-bottom: 6px; }
    .cal-time { font-size: 13.5px; color: #2d4f18; font-weight: 600; margin-bottom: 14px; }
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
    .cal-btn * {
      color: inherit !important;
    }

    .box { background: #f5f8f3; border-radius: 12px; padding: 18px 20px; margin: 20px 0; border: 1px solid #e1ebdc; }
    .badge { display: inline-block; background: #DCFF85; color: #163300; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 12px; }
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
      <p>Dear <strong>${name}</strong>,</p>
      <p>
        Thank you for submitting your ${type === 'enterprise' ? 'Executive Consultation Brief' : 'Project Inquiry'}.
        I have received your details and am looking forward to our discussion regarding <strong>${company || 'your initiative'}</strong>.
      </p>

      ${
        meetingDate
          ? `
      <div class="cal-card">
        <div class="cal-title">${iconCal}Scheduled Consultation &amp; Calendar Link</div>
        <div class="cal-time">${iconClock}${meetingDate} @ ${meetingSlot} (BST UTC+6) · 45 Mins</div>
        <div style="margin-bottom: 12px;">
          <a href="${googleCalUrl}" target="_blank" class="cal-btn" style="display: inline-block; background-color: #163300; color: #DCFF85; text-decoration: none; font-size: 13px; font-weight: 700; padding: 11px 24px; border-radius: 9999px; border: 1px solid rgba(220, 255, 133, 0.4); box-shadow: 0 4px 14px rgba(22, 51, 0, 0.16); transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1); text-align: center;">
            <span style="color: inherit; text-decoration: none; display: inline-flex; align-items: center; vertical-align: middle;">
              ${iconCalWhite}
              <span style="color: inherit; text-decoration: none; font-weight: 700; margin-left: 6px; margin-right: 6px;">Add to Google Calendar</span>
              ${iconArrow}
            </span>
          </a>
        </div>
        <div style="font-size: 11.5px; color: #5a754e;">
          ${iconBell}An iCalendar event (<code>consultation_${refId}.ics</code>) with a 15-minute prior reminder is attached for Apple Calendar and Outlook.
        </div>
      </div>`
          : ''
      }

      <div class="box">
        <span class="badge">CONFIRMED DETAILS</span>
        <div style="font-size: 13px; line-height: 1.7; color: #163300;">
          <div><strong>Reference ID:</strong> ${refId}</div>
          <div><strong>Primary Initiatives:</strong> ${initiativeList}</div>
          ${
            meetingDate
              ? `<div><strong>Consultation Session:</strong> ${meetingDate} @ ${meetingSlot}</div>`
              : ''
          }
          <div><strong>Investment Scope:</strong> ${budget || 'Tailored Plan'}</div>
        </div>
      </div>

      <p>
        ${iconClip}<strong>Attached Copy:</strong> A generated signed PDF of your initiative brief (<code>${pdfFilename}</code>) is attached to this email for your records.
      </p>

      <div class="reply-box">
        <strong>Need to add details or reply?</strong><br/>
        Simply hit <strong>"Reply"</strong> to this email, and your message will land straight in my personal inbox at <a href="mailto:mail@jitksaha.com">mail@jitksaha.com</a> with your reference code <code>[Ref: ${refId}]</code>.
      </div>

      <p style="margin-top: 20px;">
        <strong>What happens next?</strong><br/>
        I will review your technical and business context ahead of our meeting. If anything urgent arises, you can also reach me directly via WhatsApp at <strong>+880 1601 111994</strong>.
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
                `;

                try {
                  const clientSendResponse = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${resendApiKey}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      from: fromEmail,
                      to: [email],
                      reply_to: 'Jit Kumar Saha <mail@jitksaha.com>',
                      subject: clientSubject,
                      html: clientHtml,
                      attachments,
                    }),
                  });

                  clientData = await clientSendResponse.json();
                  if (clientSendResponse.ok) {
                    clientSent = true;
                  }
                } catch (clientErr) {
                  console.log('Client confirmation send note:', clientErr);
                }

                res.setHeader('Content-Type', 'application/json');
                if (!adminSendResponse.ok) {
                  res.statusCode = adminSendResponse.status;
                  res.end(
                    JSON.stringify({
                      error: adminData?.error?.message || adminData?.message || 'Failed to dispatch notification email via Resend.',
                    })
                  );
                  return;
                }

                res.statusCode = 200;
                res.end(
                  JSON.stringify({
                    success: true,
                    refId,
                    adminSent: true,
                    adminId: adminData?.id,
                    clientSent,
                    clientId: clientData?.id,
                  })
                );
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err?.message || 'Internal Server Error' }));
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});
