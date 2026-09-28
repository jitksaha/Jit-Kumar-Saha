import jsPDF from 'jspdf';

export interface EnterprisePdfData {
  refId: string;
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  website: string;
  country: string;
  companyType: string;
  companySize: string;
  industry: string;
  capabilities: string[];
  currentTechStack: string[];
  currentSituation: string;
  budget: string;
  timeline: string;
  objective: string;
  engagementPreference: string;
  userRole: string;
  procurementProcess: string;
  ndaRequired: string;
  meetingDate: string;
  meetingSlot: string;
}

export function generateEnterprisePdf(data: EnterprisePdfData) {
  const doc = new jsPDF();
  doc.setFillColor(22, 51, 0);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(220, 255, 133);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('JIT KUMAR SAHA', 14, 18);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('ENTERPRISE QUALIFICATION & SYSTEM ARCHITECTURE BRIEF', 14, 28);
  doc.text(`REF: ${data.refId}`, 150, 28);

  doc.setTextColor(22, 51, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('1. EXECUTIVE & ORGANIZATION PROFILE', 14, 52);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);

  let y = 62;
  const addField = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value || 'N/A', 65, y);
    y += 8;
  };

  addField('Full Name', data.name);
  addField('Work Email', data.email);
  addField('Role / Title', data.jobTitle);
  addField('Company / Organization', data.company);
  addField('Company Website', data.website);
  addField('Country / HQ Location', data.country);
  addField('Company Type & Size', `${data.companyType} · ${data.companySize}`);
  addField('Industry Sector', data.industry);

  y += 6;
  doc.setTextColor(22, 51, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. CAPABILITIES & TECHNICAL SCOPE', 14, y);
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);

  addField('Primary Focus Areas', data.capabilities.join(', '));
  addField('Current Tech Stack', data.currentTechStack.join(', '));
  addField('Current Situation', data.currentSituation);
  addField('Budget & Timeline Tier', `${data.budget} · ${data.timeline}`);
  addField('Initiative Objective', data.objective);

  y += 6;
  doc.setTextColor(22, 51, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3. GOVERNANCE & CONSULTATION', 14, y);
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);

  addField('Preferred Engagement', data.engagementPreference);
  addField('Decision Role', data.userRole);
  addField('Procurement Process', data.procurementProcess);
  addField('NDA Requirement', data.ndaRequired);
  addField('Consultation Schedule', `${data.meetingDate} @ ${data.meetingSlot}`);

  y += 12;
  doc.setDrawColor(22, 51, 0);
  doc.line(14, y, 196, y);
  y += 8;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    'Confidential Enterprise Intake Document · Jit Kumar Saha (mail@jitksaha.com · +880 1601 111994)',
    14,
    y
  );

  doc.save(`Jit_Kumar_Saha_Enterprise_Brief_${data.refId}.pdf`);
}
