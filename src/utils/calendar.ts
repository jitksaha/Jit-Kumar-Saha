export function createCalendarUrl({
  title,
  details,
  date,
  location = 'Google Meet / Video Call',
}: {
  title: string;
  details: string;
  date: string;
  location?: string;
}) {
  const encTitle = encodeURIComponent(title);
  const encDetails = encodeURIComponent(details);
  const encLocation = encodeURIComponent(location);
  const formattedDate = date.replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encTitle}&details=${encDetails}&location=${encLocation}&dates=${formattedDate}T090000Z/${formattedDate}T100000Z`;
}

export function createInquiryCalendarUrl(refId: string) {
  const encTitle = encodeURIComponent(`Consultation Call with Jit Kumar Saha (Ref: ${refId || 'INQ'})`);
  const encDetails = encodeURIComponent(`Scheduled video consultation with Jit Kumar Saha.\nReference: ${refId}\nDiscussion on product, technology and commercial requirements.`);
  const today = new Date(Date.now() + 172800000).toISOString().split('T')[0].replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encTitle}&details=${encDetails}&dates=${today}T150000/${today}T154500&ctz=Asia/Dhaka`;
}
