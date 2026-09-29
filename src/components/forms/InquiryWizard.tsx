import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Calendar,
  Download,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';
import { SearchableSelect } from '../ui/SearchableSelect';
import { Button } from '../ui/Button';
import { generateInquiryPdf, getInquiryPdfBase64 } from '../../utils/pdf';

export interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  purpose: string;
  services: string[];
  budget: string;
  timeline: string;
  preferredContact: string;
  message: string;
}

export function InquiryWizard() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    country: 'United States',
    purpose: 'Project Inquiry',
    services: ['Product Development'],
    budget: '$10,000–$25,000',
    timeline: 'Within 1 Month',
    preferredContact: 'Email',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');

  const purposeOptions = [
    'General Inquiry',
    'Project Inquiry',
    'Partnership',
    'Product / SaaS',
    'Consulting',
    'Media / Speaking',
    'Collaboration',
    'Other',
  ];

  const serviceOptions = [
    'Product Development',
    'Web Development',
    'SaaS',
    'AI & Automation',
    'Digital Transformation',
    'Business Systems',
    'Technology Strategy',
    'Branding / Digital Experience',
    'Other',
  ];

  const budgetOptions = [
    'Under $5,000',
    '$5,000–$10,000',
    '$10,000–$25,000',
    '$25,000–$50,000',
    '$50,000+',
    'Not sure yet',
  ];

  const timelineOptions = [
    'ASAP',
    'Within 1 Month',
    '1–3 Months',
    '3–6 Months',
    '6+ Months',
    'Just Exploring',
  ];

  const countryOptions = [
    'United States',
    'Bangladesh',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'Singapore',
    'United Arab Emirates',
    'Saudi Arabia',
    'Other / Global Remote',
  ];

  const contactMethodOptions = ['Email', 'WhatsApp', 'Call', 'Other'];

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.message.trim()) {
      errs.message = 'Project details / message is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateCalendarLink = () => {
    const title = encodeURIComponent(
      `Project Discovery Consultation — Jit Kumar Saha & ${formData.company || formData.name}`
    );
    const details = encodeURIComponent(
      `Direct Contact & Project Discovery.\nClient: ${formData.name} (${formData.email})\nCompany/Role: ${
        formData.company || 'Individual'
      } (${formData.role || 'N/A'})\nPurpose: ${formData.purpose}\nServices: ${formData.services.join(
        ', '
      )}\nTimezone: Bangladesh Standard Time (BST, UTC+6)`
    );
    const date = new Date(Date.now() + 172800000)
      .toISOString()
      .split('T')[0]
      .replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${date}T150000/${date}T154500&ctz=Asia/Dhaka`;
  };

  const handleDownloadPdf = () => {
    generateInquiryPdf({
      refId: refId || 'INQ-SAMPLE',
      name: formData.name,
      email: formData.email,
      company: formData.company,
      role: formData.role,
      country: formData.country,
      purpose: formData.purpose,
      services: formData.services,
      budget: formData.budget,
      timeline: formData.timeline,
      preferredContact: formData.preferredContact,
      message: formData.message,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsSubmitting(true);
    const newRefId = `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefId(newRefId);

    const inquiryPdfData = {
      refId: newRefId,
      name: formData.name,
      email: formData.email,
      company: formData.company,
      role: formData.role,
      country: formData.country,
      purpose: formData.purpose,
      services: formData.services,
      budget: formData.budget,
      timeline: formData.timeline,
      preferredContact: formData.preferredContact,
      message: formData.message,
    };

    let pdfBase64 = '';
    try {
      pdfBase64 = getInquiryPdfBase64(inquiryPdfData);
    } catch (e) {
      console.warn('Inquiry PDF generation notice:', e);
    }

    const payload = {
      type: 'inquiry',
      refId: newRefId,
      name: formData.name,
      email: formData.email,
      company: formData.company,
      role: formData.role,
      country: formData.country,
      purpose: formData.purpose,
      services: formData.services,
      budget: formData.budget,
      timeline: formData.timeline,
      preferredContact: formData.preferredContact,
      message: formData.message,
      pdfBase64,
      pdfFilename: `Jit_Kumar_Saha_Inquiry_${newRefId}.pdf`,
    };

    try {
      let res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 404) {
        res = await fetch('/api/send-email.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      // Also trigger PDF download for immediate copy
      try {
        generateInquiryPdf(inquiryPdfData);
      } catch (pdfErr) {
        console.warn('PDF download notice:', pdfErr);
      }

      setIsSubmitted(true);
      setStep(3);
    } catch (err) {
      console.error('Email dispatch error:', err);
      // Still proceed to step 3 so user is confirmed
      setIsSubmitted(true);
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  const transitionConfig = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl border border-[#163300]/15 bg-white p-6 sm:p-8 md:p-10 shadow-xl relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-5 lg:border-r lg:border-[#163300]/10 lg:pr-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase bg-[#DCFF85] text-[#163300] border border-[#9FE870]">
              <Sparkles size={13} /> DIRECT INQUIRY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163300] mt-2.5">
              Get in Touch
            </h2>
            <p className="text-xs sm:text-sm text-[#163300]/75 mt-1 font-medium">
              Start a project conversation or business opportunity directly into Jit's inbox.
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <div
              className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                step === 1
                  ? 'bg-[#163300] text-[#DCFF85] border-[#163300] shadow-sm'
                  : step > 1
                    ? 'bg-[#DCFF85]/20 text-[#163300] border-[#9FE870]'
                    : 'bg-[#FAFAF8] text-[#163300]/50 border-[#163300]/10'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                  step === 1
                    ? 'bg-[#DCFF85] text-[#163300]'
                    : step > 1
                      ? 'bg-[#163300] text-[#DCFF85]'
                      : 'bg-[#163300]/10 text-[#163300]/50'
                }`}
              >
                {step > 1 ? <Check size={13} /> : '01'}
              </div>
              <div>
                <span className="text-xs font-bold block uppercase tracking-wider">Step 01</span>
                <span className="text-xs font-medium opacity-90">Basic Information</span>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                step === 2
                  ? 'bg-[#163300] text-[#DCFF85] border-[#163300] shadow-sm'
                  : step > 2
                    ? 'bg-[#DCFF85]/20 text-[#163300] border-[#9FE870]'
                    : 'bg-[#FAFAF8] text-[#163300]/50 border-[#163300]/10'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                  step === 2
                    ? 'bg-[#DCFF85] text-[#163300]'
                    : step > 2
                      ? 'bg-[#163300] text-[#DCFF85]'
                      : 'bg-[#163300]/10 text-[#163300]/50'
                }`}
              >
                {step > 2 ? <Check size={13} /> : '02'}
              </div>
              <div>
                <span className="text-xs font-bold block uppercase tracking-wider">Step 02</span>
                <span className="text-xs font-medium opacity-90">Project Scope & Details</span>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                step === 3
                  ? 'bg-[#163300] text-[#DCFF85] border-[#163300] shadow-sm'
                  : 'bg-[#FAFAF8] text-[#163300]/50 border-[#163300]/10'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                  step === 3
                    ? 'bg-[#DCFF85] text-[#163300]'
                    : 'bg-[#163300]/10 text-[#163300]/50'
                }`}
              >
                03
              </div>
              <div>
                <span className="text-xs font-bold block uppercase tracking-wider">Step 03</span>
                <span className="text-xs font-medium opacity-90">Confirmation & PDF Copy</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAFAF8] rounded-xl p-4 border border-[#163300]/10 space-y-2.5 text-xs text-[#163300]/80">
            <div className="flex items-center gap-2 font-mono font-bold text-[#163300] uppercase text-[11px]">
              <Clock size={14} className="text-[#163300]" /> Typical Response Window
            </div>
            <p className="leading-relaxed">
              Jit responds personally to qualified project inquiries within 24 business hours.
            </p>
            <div className="pt-2 border-t border-[#163300]/10 flex items-center gap-2 text-[11px] font-mono text-[#163300]/60">
              <Lock size={12} /> Confidentiality Assured
            </div>
          </div>
        </div>

        {/* Right Form Body */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={transitionConfig}
                className="space-y-5"
              >
                <div className="pb-2.5 border-b border-[#163300]/10 flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-[#163300] uppercase tracking-wider">
                    01. Basic Contact Information
                  </h3>
                  <span className="text-xs font-mono font-semibold text-[#163300]/60">Step 1 of 2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="Jane Doe"
                      className={`w-full p-3 rounded-xl border text-sm font-semibold text-[#163300] focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 bg-red-50 focus:border-red-500'
                          : 'border-[#163300]/20 bg-[#FAFAF8] focus:border-[#163300] focus:bg-white'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 font-semibold mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="jane@company.com"
                      className={`w-full p-3 rounded-xl border text-sm font-semibold text-[#163300] focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 bg-red-50 focus:border-red-500'
                          : 'border-[#163300]/20 bg-[#FAFAF8] focus:border-[#163300] focus:bg-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 font-semibold mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Global Inc."
                      className="w-full p-3 rounded-xl border border-[#163300]/20 bg-[#FAFAF8] text-sm font-semibold text-[#163300] focus:outline-none focus:border-[#163300] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Your Role / Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Founder / CTO / Product Lead"
                      className="w-full p-3 rounded-xl border border-[#163300]/20 bg-[#FAFAF8] text-sm font-semibold text-[#163300] focus:outline-none focus:border-[#163300] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <SearchableSelect
                    label="Your Country / Region"
                    options={countryOptions}
                    value={formData.country}
                    onChange={(val) => setFormData({ ...formData, country: val })}
                    searchable={true}
                  />
                </div>

                <div className="pt-3 border-t border-[#163300]/10 flex justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                    variant="dark"
                    text="Continue to Scope"
                    icon={ArrowRight}
                    className="px-6 py-3 text-xs font-mono font-bold uppercase"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} key="step-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={transitionConfig}
                  className="space-y-5"
                >
                  <div className="pb-2.5 border-b border-[#163300]/10 flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold text-[#163300] uppercase tracking-wider">
                      02. Project Scope & Discussion Goals
                    </h3>
                    <span className="text-xs font-mono font-semibold text-[#163300]/60">Step 2 of 2</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SearchableSelect
                      label="Primary Reason for Reaching Out"
                      options={purposeOptions}
                      value={formData.purpose}
                      onChange={(val) => setFormData({ ...formData, purpose: val })}
                      searchable={false}
                    />

                    <SearchableSelect
                      label="Preferred Contact Channel"
                      options={contactMethodOptions}
                      value={formData.preferredContact}
                      onChange={(val) => setFormData({ ...formData, preferredContact: val })}
                      searchable={false}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-2">
                      Services / Capabilities Required (Multi-Select)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((service) => {
                        const selected = formData.services.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            style={{
                              backgroundColor: selected ? '#163300' : undefined,
                              color: selected ? '#FFFFFF' : '#163300',
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                              selected
                                ? 'border-[#163300] shadow-sm !bg-[#163300] !text-white'
                                : 'bg-[#FAFAF8] text-[#163300] border-[#163300]/15 hover:border-[#163300]/40 hover:bg-[#DCFF85]/20'
                            }`}
                          >
                            {selected && <Check size={13} className="shrink-0 text-[#9FE870]" />}
                            <span
                              style={{ color: selected ? '#FFFFFF' : '#163300' }}
                              className="font-semibold select-none"
                            >
                              {service}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SearchableSelect
                      label="Estimated Budget Range (USD)"
                      options={budgetOptions}
                      value={formData.budget}
                      onChange={(val) => setFormData({ ...formData, budget: val })}
                      searchable={false}
                    />

                    <SearchableSelect
                      label="Target Timeline"
                      options={timelineOptions}
                      value={formData.timeline}
                      onChange={(val) => setFormData({ ...formData, timeline: val })}
                      searchable={false}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Tell me about your project or initiative *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Describe what you are looking to build, solve, or launch..."
                      className={`w-full p-3 rounded-xl border text-sm font-semibold text-[#163300] placeholder:text-[#163300]/40 focus:outline-none transition-colors ${
                        errors.message
                          ? 'border-red-500 bg-red-50 focus:border-red-500'
                          : 'border-[#163300]/20 bg-[#FAFAF8] focus:border-[#163300] focus:bg-white'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 font-semibold mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#163300]/10 flex items-center justify-between gap-4">
                    <Button
                      type="button"
                      onClick={() => setStep(1)}
                      variant="secondary"
                      text="Back"
                      icon={ArrowLeft}
                      className="px-5 py-3 text-xs font-semibold"
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      text={isSubmitting ? 'Transmitting...' : 'Submit Inquiry'}
                      icon={Send}
                      className="px-8 py-3.5 text-xs font-mono font-bold uppercase"
                    />
                  </div>
                </motion.div>
              </form>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={transitionConfig}
                className="py-4 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#163300] text-[#DCFF85] flex items-center justify-center shrink-0 shadow-lg">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-[#163300] bg-[#DCFF85] px-3 py-1 rounded-md border border-[#9FE870]">
                      INQUIRY REF: {refId}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163300] mt-1.5">
                      Inquiry Dispatched
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#163300]/85 leading-relaxed font-medium">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been transmitted to
                  Jit Kumar Saha's priority queue. A copy has been drafted and can be downloaded below.
                </p>

                <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#163300]/15 space-y-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#163300] block">
                    INQUIRY SUMMARY OVERVIEW
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#163300]">
                    <div>
                      <span className="block font-mono text-[#163300]/60">ORGANIZATION / ROLE</span>
                      <strong>{formData.company || 'N/A'}</strong> ({formData.role || 'Individual'})
                    </div>
                    <div>
                      <span className="block font-mono text-[#163300]/60">PRIMARY SERVICES</span>
                      <strong>{formData.services.slice(0, 3).join(', ')}</strong>
                    </div>
                    <div>
                      <span className="block font-mono text-[#163300]/60">BUDGET & TIMELINE</span>
                      <strong>{formData.budget}</strong> ({formData.timeline})
                    </div>
                    <div>
                      <span className="block font-mono text-[#163300]/60">PREFERRED CONTACT</span>
                      <strong>{formData.preferredContact}</strong> ({formData.email})
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={handleDownloadPdf}
                    variant="primary"
                    text="Download Inquiry PDF Copy"
                    icon={Download}
                    className="px-6 py-3.5 text-xs font-mono font-bold uppercase"
                  />

                  <Button
                    href={generateCalendarLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    text="Schedule Video Call (BST)"
                    icon={Calendar}
                    className="px-6 py-3.5 text-xs font-mono font-bold uppercase border border-[#163300]/20"
                  />

                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                    }}
                    variant="secondary"
                    text="Send Another Inquiry"
                    className="px-5 py-3 text-xs font-semibold"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
