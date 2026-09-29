export interface CalendarEventData {
  refId: string;
  title: string;
  details: string;
  date: string; // YYYY-MM-DD
  timeSlot?: string; // e.g. "03:00 PM BST (Dhaka UTC+6)" or "15:00"
  location?: string;
  organizerName?: string;
  organizerEmail?: string;
  attendeeName?: string;
  attendeeEmail?: string;
}

// Helper to parse time slot like "03:00 PM BST (Dhaka UTC+6)" into { hour, minute } in BST (UTC+6)
export function parseSlotTimeToUtc(dateStr: string, slotStr?: string): { startUtc: string; endUtc: string; startIso: string; endIso: string } {
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
  const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // 45-min consultation session

  const formatUtc = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  return {
    startUtc: formatUtc(startDate),
    endUtc: formatUtc(endDate),
    startIso: startDate.toISOString(),
    endIso: endDate.toISOString(),
  };
}

export function createCalendarUrl({
  title,
  details,
  date,
  timeSlot,
  location = 'Google Meet / Video Call',
}: {
  title: string;
  details: string;
  date: string;
  timeSlot?: string;
  location?: string;
}) {
  const encTitle = encodeURIComponent(title);
  const encDetails = encodeURIComponent(details);
  const encLocation = encodeURIComponent(location);
  const { startUtc, endUtc } = parseSlotTimeToUtc(date, timeSlot);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encTitle}&details=${encDetails}&location=${encLocation}&dates=${startUtc}/${endUtc}&ctz=Asia/Dhaka`;
}

export function createIcsContent(data: CalendarEventData): string {
  const { startUtc, endUtc } = parseSlotTimeToUtc(data.date, data.timeSlot);
  const nowUtc = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const organizerName = data.organizerName || 'Jit Kumar Saha';
  const organizerEmail = data.organizerEmail || 'mail@jitksaha.com';
  const location = data.location || 'Google Meet / Video Call';
  const cleanDetails = (data.details || '').replace(/\n/g, '\\n').replace(/,/g, '\\,');
  const cleanTitle = (data.title || '').replace(/,/g, '\\,');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jit Kumar Saha//Executive Consultation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:exec-${data.refId || Date.now()}@jitksaha.com`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDetails}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    `ORGANIZER;CN="${organizerName}":mailto:${organizerEmail}`,
    data.attendeeEmail
      ? `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="${
          data.attendeeName || 'Executive Client'
        }":mailto:${data.attendeeEmail}`
      : '',
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN="${organizerName}":mailto:${organizerEmail}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Executive Consultation with Jit Kumar Saha',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}

export function getIcsBase64(data: CalendarEventData): string {
  const icsText = createIcsContent(data);
  return typeof btoa === 'function'
    ? btoa(unescape(encodeURIComponent(icsText)))
    : Buffer.from(icsText, 'utf-8').toString('base64');
}
