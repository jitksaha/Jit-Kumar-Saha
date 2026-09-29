import jsPDF from 'jspdf';

export interface EnterprisePdfData {
  refId: string;
  name: string;
  email: string;
  jobTitle?: string;
  company: string;
  website?: string;
  country: string;
  companyType?: string;
  companySize?: string;
  industry?: string;
  primaryNeeds: string[];
  currentSituation?: string;
  budget?: string;
  timeline?: string;
  brief?: string;
  meetingDate: string;
  meetingSlot: string;
}

export interface InquiryPdfData {
  refId: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  country?: string;
  purpose?: string;
  services: string[];
  budget?: string;
  timeline?: string;
  preferredContact?: string;
  message?: string;
}

export function buildEnterprisePdfDoc(data: EnterprisePdfData): jsPDF {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
  });

  // Background subtle warm tone
  doc.setFillColor(252, 253, 250);
  doc.rect(0, 0, 210, 297, 'F');

  // Header Banner
  doc.setFillColor(22, 51, 0); // Deep forest green
  doc.rect(0, 0, 210, 38, 'F');

  // Accent Line
  doc.setFillColor(220, 255, 133); // Lime
  doc.rect(0, 38, 210, 1.5, 'F');

  // Brand Name
  doc.setTextColor(220, 255, 133);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('JIT KUMAR SAHA', 16, 16);

  // Subtitle
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(230, 240, 225);
  doc.text('EXECUTIVE CONSULTATION & INITIATIVE BRIEF', 16, 23);
  doc.text('Confidential Client Advisory · Dhaka (BST UTC+6) & Global Remote', 16, 29);

  // Engagement Reference Box (Top Right)
  doc.setFillColor(34, 71, 8);
  doc.roundedRect(138, 10, 58, 20, 2.5, 2.5, 'F');
  doc.setTextColor(220, 255, 133);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('ENGAGEMENT REFERENCE', 142, 17);
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text(data.refId || 'EXEC-BRIEF', 142, 25);

  let y = 48;

  // Helper to draw section header pill
  const drawSectionHeader = (title: string) => {
    doc.setFillColor(232, 247, 200);
    doc.roundedRect(16, y, 178, 6.5, 1.2, 1.2, 'F');
    doc.setTextColor(22, 51, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(title, 20, y + 4.5);
    y += 11;
  };

  // Helper for 2-column key-value row with strict width constraints
  const drawTwoColRow = (lLabel: string, lVal: string, rLabel: string, rVal: string) => {
    // Left
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(65, 85, 55);
    doc.text(lLabel, 18, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(20, 35, 10);
    const lLines = doc.splitTextToSize(lVal || 'N/A', 50);
    doc.text(lLines[0], 52, y);

    // Right
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(65, 85, 55);
    doc.text(rLabel, 110, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(20, 35, 10);
    const rLines = doc.splitTextToSize(rVal || 'N/A', 50);
    doc.text(rLines[0], 144, y);

    y += 6.5;
  };

  // --- 1. EXECUTIVE & ORGANIZATION PROFILE ---
  drawSectionHeader('1. EXECUTIVE & ORGANIZATION PROFILE');
  drawTwoColRow('Executive Name:', data.name, 'Work Email:', data.email);
  drawTwoColRow('Organization:', data.company, 'Role / Title:', data.jobTitle || 'Executive');
  drawTwoColRow('Country / Region:', data.country, 'Governance:', 'Mutual Bilateral NDA');

  y += 2;

  // --- 2. STRATEGIC SCOPE & INVESTMENT PARAMETERS ---
  drawSectionHeader('2. STRATEGIC SCOPE & INVESTMENT PARAMETERS');
  
  // Full-width Primary Initiatives row (prevents any column overflow)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(65, 85, 55);
  doc.text('Primary Initiatives:', 18, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 35, 10);
  const needsText = data.primaryNeeds?.join(', ') || 'N/A';
  const needsLines = doc.splitTextToSize(needsText, 138);
  doc.text(needsLines.slice(0, 2), 52, y);
  y += needsLines.length > 1 ? 9.5 : 6.5;

  drawTwoColRow(
    'Current Stage:',
    data.currentSituation || 'N/A',
    'Investment Scope:',
    data.budget || 'Custom Scope'
  );
  drawTwoColRow(
    'Target Timeline:',
    data.timeline || 'Standard',
    'Consultation Format:',
    '45-Min Discovery & Roadmap'
  );

  y += 2;

  // Problem Brief Card
  if (data.brief) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(65, 85, 55);
    doc.text('Initiative Brief / Problem Statement:', 18, y);
    y += 4.5;

    doc.setFillColor(245, 248, 242);
    doc.setDrawColor(210, 225, 200);
    doc.roundedRect(16, y, 178, 32, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(30, 45, 20);
    const briefLines = doc.splitTextToSize(data.brief, 170);
    doc.text(briefLines.slice(0, 5), 20, y + 5.5);
    y += 37;
  } else {
    y += 4;
  }

  // --- 3. CONSULTATION SESSION & TIMEZONE DETAILS ---
  drawSectionHeader('3. CONSULTATION SESSION & TIMEZONE DETAILS');
  drawTwoColRow(
    'Scheduled Date:',
    data.meetingDate || 'To be confirmed',
    'Time Slot:',
    data.meetingSlot || '03:00 PM BST'
  );
  drawTwoColRow(
    'Timezone Base:',
    'Bangladesh Time (BST · UTC+6)',
    'Meeting Platform:',
    'Google Meet / Video Call'
  );

  y += 4;

  // --- 4. SIGNATURE & ACKNOWLEDGEMENT BLOCK ---
  doc.setFillColor(240, 245, 235);
  doc.setDrawColor(200, 215, 190);
  doc.roundedRect(16, y, 178, 28, 2, 2, 'FD');

  // Left Signoff
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(22, 51, 0);
  doc.text('JIT KUMAR SAHA', 22, y + 7.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(70, 95, 60);
  doc.text('Executive Technology Consultant & Product Leader', 22, y + 13.5);
  doc.text('Direct: mail@jitksaha.com · WhatsApp: +880 1601 111994', 22, y + 19);

  // Right Signoff
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(22, 51, 0);
  doc.text('CLIENT ACKNOWLEDGEMENT', 120, y + 7.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(70, 95, 60);
  doc.text(`Name: ${data.name}`, 120, y + 13);
  doc.text(`Email: ${data.email}`, 120, y + 18.5);
  doc.text(`Status: Signed & Dispatched`, 120, y + 24);

  // Footer Banner
  doc.setFillColor(22, 51, 0);
  doc.rect(0, 282, 210, 15, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(220, 255, 133);
  doc.text('JITKSAHA.COM · CONFIDENTIAL ADVISORY DOCUMENT', 16, 290);
  doc.setTextColor(200, 220, 195);
  doc.text(
    `Dispatched to mail@jitksaha.com & ${data.email} · Ref: ${data.refId}`,
    16,
    294.5
  );

  return doc;
}

export function generateEnterprisePdf(data: EnterprisePdfData) {
  const doc = buildEnterprisePdfDoc(data);
  doc.save(`Jit_Kumar_Saha_Executive_Brief_${data.refId}.pdf`);
}

export function getEnterprisePdfBase64(data: EnterprisePdfData): string {
  const doc = buildEnterprisePdfDoc(data);
  const dataUri = doc.output('datauristring');
  return dataUri.split(',')[1] || '';
}

export function buildInquiryPdfDoc(data: InquiryPdfData): jsPDF {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
  });

  doc.setFillColor(252, 253, 250);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setFillColor(22, 51, 0);
  doc.rect(0, 0, 210, 38, 'F');

  doc.setFillColor(220, 255, 133);
  doc.rect(0, 38, 210, 1.5, 'F');

  doc.setTextColor(220, 255, 133);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('JIT KUMAR SAHA', 16, 16);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(230, 240, 225);
  doc.text('PROJECT DISCOVERY & INQUIRY BRIEF', 16, 23);
  doc.text('Direct Advisory & Technology Consultation · Dhaka & Global Remote', 16, 29);

  doc.setFillColor(34, 71, 8);
  doc.roundedRect(138, 10, 58, 20, 2.5, 2.5, 'F');
  doc.setTextColor(220, 255, 133);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('INQUIRY REFERENCE', 142, 17);
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text(data.refId || 'INQ-BRIEF', 142, 25);

  let y = 48;

  const drawSectionHeader = (title: string) => {
    doc.setFillColor(232, 247, 200);
    doc.roundedRect(16, y, 178, 6.5, 1.2, 1.2, 'F');
    doc.setTextColor(22, 51, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(title, 20, y + 4.5);
    y += 11;
  };

  const drawTwoColRow = (lLabel: string, lVal: string, rLabel: string, rVal: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(65, 85, 55);
    doc.text(lLabel, 18, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(20, 35, 10);
    const lLines = doc.splitTextToSize(lVal || 'N/A', 50);
    doc.text(lLines[0], 52, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(65, 85, 55);
    doc.text(rLabel, 110, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(20, 35, 10);
    const rLines = doc.splitTextToSize(rVal || 'N/A', 50);
    doc.text(rLines[0], 144, y);

    y += 6.5;
  };

  drawSectionHeader('1. CONTACT & CLIENT INFORMATION');
  drawTwoColRow('Full Name:', data.name, 'Work Email:', data.email);
  drawTwoColRow('Organization:', data.company || 'N/A', 'Role / Title:', data.role || 'N/A');
  drawTwoColRow('Country / Region:', data.country || 'N/A', 'Preferred Contact:', data.preferredContact || 'Email');

  y += 2;

  drawSectionHeader('2. PROJECT & SCOPE REQUIREMENTS');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(65, 85, 55);
  doc.text('Services Needed:', 18, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 35, 10);
  const servicesText = data.services?.join(', ') || 'N/A';
  const sLines = doc.splitTextToSize(servicesText, 138);
  doc.text(sLines.slice(0, 2), 52, y);
  y += sLines.length > 1 ? 9.5 : 6.5;

  drawTwoColRow('Inquiry Purpose:', data.purpose || 'Project Inquiry', 'Budget Range:', data.budget || 'N/A');
  drawTwoColRow('Target Timeline:', data.timeline || 'N/A', 'Timezone Base:', 'Bangladesh Time (BST UTC+6)');

  y += 2;

  if (data.message) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(65, 85, 55);
    doc.text('Inquiry Message / Project Notes:', 18, y);
    y += 4.5;

    doc.setFillColor(245, 248, 242);
    doc.setDrawColor(210, 225, 200);
    doc.roundedRect(16, y, 178, 44, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(30, 45, 20);
    const lines = doc.splitTextToSize(data.message, 170);
    doc.text(lines.slice(0, 7), 20, y + 5.5);
    y += 49;
  } else {
    y += 4;
  }

  doc.setFillColor(240, 245, 235);
  doc.setDrawColor(200, 215, 190);
  doc.roundedRect(16, y, 178, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(22, 51, 0);
  doc.text('JIT KUMAR SAHA', 22, y + 7.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(70, 95, 60);
  doc.text('Executive Technology Consultant & Product Leader · mail@jitksaha.com · +880 1601 111994', 22, y + 14);

  doc.setFillColor(22, 51, 0);
  doc.rect(0, 282, 210, 15, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(220, 255, 133);
  doc.text('JITKSAHA.COM · CONFIDENTIAL INQUIRY RECORD', 16, 290);
  doc.setTextColor(200, 220, 195);
  doc.text(
    `Dispatched to mail@jitksaha.com & ${data.email} · Ref: ${data.refId}`,
    16,
    294.5
  );

  return doc;
}

export function generateInquiryPdf(data: InquiryPdfData) {
  const doc = buildInquiryPdfDoc(data);
  doc.save(`Jit_Kumar_Saha_Inquiry_${data.refId}.pdf`);
}

export function getInquiryPdfBase64(data: InquiryPdfData): string {
  const doc = buildInquiryPdfDoc(data);
  const dataUri = doc.output('datauristring');
  return dataUri.split(',')[1] || '';
}
