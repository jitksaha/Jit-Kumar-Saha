import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  Calendar,
  Download,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  Clock,
  Sparkles,
  Lock,
  Paperclip,
  Send,
  Zap,
} from 'lucide-react';
import { SearchableSelect } from '../ui/SearchableSelect';
import { Button } from '../ui/Button';
import { generateEnterprisePdf } from '../../utils/pdf';
import { createCalendarUrl } from '../../utils/calendar';

export function EnterpriseForm() {
  const [step, setStep] = useState<number>(1);
  const [orgData, setOrgData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    website: '',
    country: 'United States',
    companyType: 'Enterprise',
    industry: 'Technology / SaaS',
    companySize: '51–200 Employees',
  });

  const [scopeData, setScopeData] = useState({
    capabilities: ['Digital Transformation', 'Enterprise Software'],
    objective: '',
    currentSituation: 'Scaling an existing platform',
    currentTechStack: ['React / Next.js', 'Node.js', 'AWS / Azure / GCP'],
    budget: '$25K–$50K',
    timeline: '1–3 Months',
  });

  const [govData, setGovData] = useState({
    engagementPreference: 'Strategic Advisory',
    userRole: 'CTO / CIO',
    stakeholdersInvolved: 'Yes',
    procurementProcess: 'Direct Engagement',
    confidentialInfo: true,
    ndaRequired: 'Yes',
    additionalNotes: '',
    meetingDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    meetingSlot: '03:00 PM BST (Dhaka UTC+6)',
  });

  const [rfpFile, setRfpFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');

  const companyTypeOptions = [
    'Enterprise',
    'Mid-Market',
    'Startup',
    'Scale-up',
    'Agency / Consultancy',
    'Government / Organization',
    'Other',
  ];

  const industryOptions = [
    'Technology / SaaS',
    'Financial Services',
    'E-commerce',
    'Healthcare',
    'Education',
    'Professional Services',
    'Manufacturing',
    'Real Estate',
    'Media',
    'Logistics',
    'Other',
  ];

  const companySizeOptions = [
    '1–10 Employees',
    '11–50 Employees',
    '51–200 Employees',
    '201–500 Employees',
    '501–1,000 Employees',
    '1,000+ Employees',
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

  const capabilityOptions = [
    'Digital Transformation',
    'Enterprise Software',
    'SaaS Product Development',
    'AI & Automation',
    'Business Systems / ERP',
    'CRM / HRM',
    'E-commerce',
    'Enterprise Web Platform',
    'Product Strategy',
    'Technology Strategy',
  ];

  const techStackOptions = [
    'React / Next.js',
    'TypeScript',
    'Node.js',
    'Python / AI Tools',
    'PostgreSQL / MySQL',
    'AWS / Azure / GCP',
    'Docker / Kubernetes',
    'REST / GraphQL APIs',
    'Tailwind CSS / Design System',
    'Legacy Monolith',
  ];

  const situationOptions = [
    'Scaling an existing platform',
    'Building a 0→1 digital product',
    'Modernizing legacy codebase',
    'Consolidating fragmented tools',
    'Integrating AI & Swarm automation',
    'Strategic architecture advisory',
  ];

  const budgetOptions = [
    '$10K–$25K',
    '$25K–$50K',
    '$50K–$100K',
    '$100K+',
    'Retainer / Monthly Partnership',
  ];

  const timelineOptions = [
    'Immediate (< 1 Month)',
    '1–3 Months',
    '3–6 Months',
    'Flexible / Exploratory',
  ];

  const engagementModelOptions = [
    'Strategic Advisory',
    'Project Engagement',
    'Product Partnership',
    'Technology Leadership',
  ];

  const decisionRoleOptions = [
    'CTO / CIO',
    'VP of Product / Head of Product',
    'Founder / CEO',
    'Engineering Lead',
    'Operations Lead',
    'Other',
  ];

  const toggleArrayItem = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!orgData.name.trim()) errs.name = 'Full Name is required';
    if (!orgData.email.trim()) {
      errs.email = 'Work Email is required';
    } else if (!/\S+@\S+\.\S+/.test(orgData.email)) {
      errs.email = 'Valid work email is required';
    }
    if (!orgData.company.trim()) errs.company = 'Company / Organization is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getCalendarLink = () => {
    return createCalendarUrl({
      title: `Executive Consultation with Jit Kumar Saha (Ref: ${refId || 'ENT-SPEC'})`,
      details: `Enterprise Project Consultation with Jit Kumar Saha.\nOrganization: ${
        orgData.company || 'N/A'
      }\nFocus: ${scopeData.capabilities.join(', ')}`,
      date: govData.meetingDate,
    });
  };

  const handleDownloadPdf = () => {
    generateEnterprisePdf({
      refId: refId || 'ENT-SAMPLE',
      name: orgData.name,
      email: orgData.email,
      jobTitle: orgData.jobTitle,
      company: orgData.company,
      website: orgData.website,
      country: orgData.country,
      companyType: orgData.companyType,
      companySize: orgData.companySize,
      industry: orgData.industry,
      capabilities: scopeData.capabilities,
      currentTechStack: scopeData.currentTechStack,
      currentSituation: scopeData.currentSituation,
      budget: scopeData.budget,
      timeline: scopeData.timeline,
      objective: scopeData.objective,
      engagementPreference: govData.engagementPreference,
      userRole: govData.userRole,
      procurementProcess: govData.procurementProcess,
      ndaRequired: govData.ndaRequired,
      meetingDate: govData.meetingDate,
      meetingSlot: govData.meetingSlot,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newRefId = `ENT-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(newRefId);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
      setStep(4);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const transitionConfig = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="w-full rounded-3xl border border-[#163300]/15 bg-white text-[#163300] p-6 sm:p-10 md:p-12 shadow-2xl relative z-10">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[#163300] text-[#DCFF85] border border-[#163300] shadow-sm">
            <Sparkles size={13} /> ENTERPRISE QUALIFICATION & ASSESSMENT
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300] leading-[1.1]">
            Build, Scale or Modernize Your Platform
          </h2>
          <p className="text-base text-[#163300]/75 leading-relaxed font-medium">
            Confidential intake for venture-backed startups, mid-market businesses, and enterprises
            seeking senior technical leadership, digital architecture, and custom AI execution.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column Info */}
        <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-[#163300]/10 lg:pr-8">
          <div className="bg-[#DCFF85]/20 rounded-2xl p-4 border border-[#9FE870] flex items-start gap-3 text-xs shadow-sm">
            <div className="p-2 rounded-lg bg-[#163300] text-[#DCFF85] shrink-0 mt-0.5">
              <ShieldCheck size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#163300] block">
                DYNIME BUSINESS SERVICES CONNECTED
              </span>
              <p className="text-[11px] text-[#163300]/90 leading-relaxed font-medium mt-0.5">
                All enterprise solutions & platform architecture are seamlessly connected to{' '}
                <b>Dynime Business Services</b> and autonomous AI swarm infrastructure where
                applicable.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-[#163300] tracking-wider">
              ENTERPRISE GOVERNANCE & SECURITY
            </h4>
            <div className="bg-[#FAFAF8] rounded-2xl p-4 border border-[#163300]/15 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#163300] text-[#DCFF85] shrink-0 mt-0.5">
                  <Lock size={18} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#163300]">Bilateral NDA Guaranteed</h5>
                  <p className="text-[11px] text-[#163300]/75 leading-relaxed font-medium">
                    Standard mutual NDA executed prior to deep architectural discovery or codebase
                    access.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-[#163300]/10">
                <div className="p-2 rounded-lg bg-[#163300] text-[#DCFF85] shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#163300]">Zero-Data Retention AI</h5>
                  <p className="text-[11px] text-[#163300]/75 leading-relaxed font-medium">
                    Private LLM agent swarms deployed within your isolated VPC with strict zero data
                    retention.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-[#163300]/10">
                <div className="p-2 rounded-lg bg-[#163300] text-[#DCFF85] shrink-0 mt-0.5">
                  <Zap size={18} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#163300]">High-Velocity Delivery Pods</h5>
                  <p className="text-[11px] text-[#163300]/75 leading-relaxed font-medium">
                    2-week clarity diagnostics, rapid 0→1 builds, and fractional technical
                    leadership.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#FAFAF8] p-3 rounded-xl border border-[#163300]/15 text-center">
              <span className="text-xl font-bold font-mono text-[#163300] block">7+ Yrs</span>
              <span className="text-[10px] font-mono text-[#163300]/60 block font-semibold uppercase">
                Experience
              </span>
            </div>
            <div className="bg-[#FAFAF8] p-3 rounded-xl border border-[#163300]/15 text-center">
              <span className="text-xl font-bold font-mono text-[#163300] block">30+</span>
              <span className="text-[10px] font-mono text-[#163300]/60 block font-semibold uppercase">
                Live Systems
              </span>
            </div>
            <div className="bg-[#FAFAF8] p-3 rounded-xl border border-[#163300]/15 text-center">
              <span className="text-xl font-bold font-mono text-[#163300] block">100%</span>
              <span className="text-[10px] font-mono text-[#163300]/60 block font-semibold uppercase">
                Confidential
              </span>
            </div>
          </div>
        </div>

        {/* Right Column Wizard Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {step === 4 || isSubmitted ? (
              <motion.div
                key="enterprise-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="py-4 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#163300] text-[#DCFF85] flex items-center justify-center shrink-0 shadow-lg">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-[#163300] bg-[#DCFF85] px-3 py-1 rounded-md border border-[#9FE870]">
                      ENTERPRISE BRIEF REF: {refId}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163300] mt-1.5">
                      Enterprise Brief Transmitted
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#163300]/85 leading-relaxed font-medium">
                  Thank you, <strong>{orgData.name}</strong> ({orgData.company || 'Executive'}).
                  Your qualified project brief has been received. Our executive leadership will
                  review your requirements and follow up within 4 business hours.
                </p>

                <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#163300]/15 text-left space-y-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#163300] block">
                    EXECUTIVE BRIEF SUMMARY
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#163300]">
                    <div>
                      <span className="block font-mono text-[#163300]/60">ORGANIZATION & ROLE</span>
                      <strong>{orgData.company}</strong> ({orgData.jobTitle})
                    </div>
                    <div>
                      <span className="block font-mono text-[#163300]/60">PRIMARY CAPABILITIES</span>
                      <strong>{scopeData.capabilities.slice(0, 3).join(', ')}</strong>
                    </div>
                    <div>
                      <span className="block font-mono text-[#163300]/60">INVESTMENT TIER</span>
                      <strong>{scopeData.budget}</strong> ({scopeData.timeline})
                    </div>
                    <div>
                      <span className="block font-mono text-[#163300]/60">
                        SCHEDULED CONSULTATION
                      </span>
                      <strong>
                        {govData.meetingDate} @ {govData.meetingSlot}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={handleDownloadPdf}
                    variant="primary"
                    text="Download Executive PDF Brief"
                    icon={Download}
                    className="px-6 py-3.5 text-xs font-mono font-bold uppercase"
                  />

                  <Button
                    href={getCalendarLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    text="Add Consultation to Calendar (BST)"
                    icon={Calendar}
                    className="px-6 py-3.5 text-xs font-mono font-bold uppercase border border-[#163300]/20"
                  />

                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                    }}
                    variant="secondary"
                    text="Submit Another Brief"
                    className="px-5 py-3 text-xs font-semibold"
                  />
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={transitionConfig}
                className="space-y-6"
              >
                <div className="pb-3 border-b border-[#163300]/10 flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-[#163300] uppercase tracking-wider">
                    01. Executive & Organization Profile
                  </h3>
                  <span className="text-xs font-mono font-semibold text-[#163300]/60">Step 1 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={orgData.name}
                      onChange={(e) => {
                        setOrgData({ ...orgData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="Jane Doe"
                      className={`w-full p-3.5 rounded-xl border text-sm font-semibold text-[#163300] focus:outline-none transition-colors ${
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
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={orgData.email}
                      onChange={(e) => {
                        setOrgData({ ...orgData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="jane@enterprise.com"
                      className={`w-full p-3.5 rounded-xl border text-sm font-semibold text-[#163300] focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 bg-red-50 focus:border-red-500'
                          : 'border-[#163300]/20 bg-[#FAFAF8] focus:border-[#163300] focus:bg-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 font-semibold mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Job Title / Executive Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={orgData.jobTitle}
                      onChange={(e) => setOrgData({ ...orgData, jobTitle: e.target.value })}
                      placeholder="CTO / VP of Product / Founder"
                      className="w-full p-3.5 rounded-xl border border-[#163300]/20 bg-[#FAFAF8] text-sm font-semibold text-[#163300] focus:outline-none focus:border-[#163300] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="text"
                      value={orgData.phone}
                      onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full p-3.5 rounded-xl border border-[#163300]/20 bg-[#FAFAF8] text-sm font-semibold text-[#163300] focus:outline-none focus:border-[#163300] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={orgData.company}
                      onChange={(e) => {
                        setOrgData({ ...orgData, company: e.target.value });
                        if (errors.company) setErrors({ ...errors, company: '' });
                      }}
                      placeholder="Acme Global Inc."
                      className={`w-full p-3.5 rounded-xl border text-sm font-semibold text-[#163300] focus:outline-none transition-colors ${
                        errors.company
                          ? 'border-red-500 bg-red-50 focus:border-red-500'
                          : 'border-[#163300]/20 bg-[#FAFAF8] focus:border-[#163300] focus:bg-white'
                      }`}
                    />
                    {errors.company && (
                      <p className="text-xs text-red-600 font-semibold mt-1">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                      Company Website
                    </label>
                    <input
                      type="text"
                      value={orgData.website}
                      onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
                      placeholder="https://enterprise.com"
                      className="w-full p-3.5 rounded-xl border border-[#163300]/20 bg-[#FAFAF8] text-sm font-semibold text-[#163300] focus:outline-none focus:border-[#163300] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <SearchableSelect
                    isDark={false}
                    label="Company Type"
                    options={companyTypeOptions}
                    value={orgData.companyType}
                    onChange={(val) => setOrgData({ ...orgData, companyType: val })}
                    searchable={false}
                  />

                  <SearchableSelect
                    isDark={false}
                    label="Industry Sector"
                    options={industryOptions}
                    value={orgData.industry}
                    onChange={(val) => setOrgData({ ...orgData, industry: val })}
                    searchable={true}
                  />

                  <SearchableSelect
                    isDark={false}
                    label="Company Size"
                    options={companySizeOptions}
                    value={orgData.companySize}
                    onChange={(val) => setOrgData({ ...orgData, companySize: val })}
                    searchable={false}
                  />
                </div>

                <div>
                  <SearchableSelect
                    isDark={false}
                    label="Country / Primary Headquarters"
                    options={countryOptions}
                    value={orgData.country}
                    onChange={(val) => setOrgData({ ...orgData, country: val })}
                    searchable={true}
                  />
                </div>

                <div className="pt-4 border-t border-[#163300]/10 flex justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                    variant="primary"
                    text="Next: Architecture & Scope"
                    icon={ArrowRight}
                    className="px-8 py-3.5 text-xs font-mono font-bold uppercase"
                  />
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={transitionConfig}
                className="space-y-6"
              >
                <div className="pb-3 border-b border-[#163300]/10 flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-[#163300] uppercase tracking-wider">
                    02. Scope, Architecture & Technology Stack
                  </h3>
                  <span className="text-xs font-mono font-semibold text-[#163300]/60">Step 2 of 3</span>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-2">
                    Primary Solution Capabilities Needed (Multi-Select)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {capabilityOptions.map((cap) => {
                      const selected = scopeData.capabilities.includes(cap);
                      return (
                        <button
                          key={cap}
                          type="button"
                          onClick={() =>
                            toggleArrayItem(
                              scopeData.capabilities,
                              (val) => setScopeData({ ...scopeData, capabilities: val }),
                              cap
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            selected
                              ? 'bg-[#163300] text-[#DCFF85] border border-[#163300] shadow-sm'
                              : 'bg-[#FAFAF8] text-[#163300]/75 border border-[#163300]/15 hover:border-[#163300]/40'
                          }`}
                        >
                          {selected && <Check size={12} />}
                          {cap}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-2">
                    Primary Tech Stack / Target Environment
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {techStackOptions.map((tech) => {
                      const selected = scopeData.currentTechStack.includes(tech);
                      return (
                        <button
                          key={tech}
                          type="button"
                          onClick={() =>
                            toggleArrayItem(
                              scopeData.currentTechStack,
                              (val) => setScopeData({ ...scopeData, currentTechStack: val }),
                              tech
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            selected
                              ? 'bg-[#163300] text-[#DCFF85] border border-[#163300] shadow-sm'
                              : 'bg-[#FAFAF8] text-[#163300]/75 border border-[#163300]/15 hover:border-[#163300]/40'
                          }`}
                        >
                          {selected && <Check size={12} />}
                          {tech}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <SearchableSelect
                    isDark={false}
                    label="Current Platform / Team Situation"
                    options={situationOptions}
                    value={scopeData.currentSituation}
                    onChange={(val) => setScopeData({ ...scopeData, currentSituation: val })}
                    searchable={false}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <SearchableSelect
                    isDark={false}
                    label="Target Investment Tier"
                    options={budgetOptions}
                    value={scopeData.budget}
                    onChange={(val) => setScopeData({ ...scopeData, budget: val })}
                    searchable={false}
                  />

                  <SearchableSelect
                    isDark={false}
                    label="Target Timeline"
                    options={timelineOptions}
                    value={scopeData.timeline}
                    onChange={(val) => setScopeData({ ...scopeData, timeline: val })}
                    searchable={false}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1.5">
                    Core Initiative Objective & Problem Summary
                  </label>
                  <textarea
                    rows={4}
                    value={scopeData.objective}
                    onChange={(e) => setScopeData({ ...scopeData, objective: e.target.value })}
                    placeholder="Describe your enterprise bottleneck, platform modernization goals, or product requirements..."
                    className="w-full p-3.5 rounded-xl border border-[#163300]/20 bg-[#FAFAF8] text-sm font-semibold text-[#163300] placeholder:text-[#163300]/40 focus:outline-none focus:border-[#163300] focus:bg-white"
                  />
                </div>

                <div className="pt-4 border-t border-[#163300]/10 flex items-center justify-between gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="secondary"
                    text="Back"
                    icon={ArrowLeft}
                    className="px-5 py-3 text-xs font-semibold"
                  />

                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    variant="primary"
                    text="Next: Governance & Meeting"
                    icon={ArrowRight}
                    className="px-8 py-3.5 text-xs font-mono font-bold uppercase"
                  />
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} key="step-3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={transitionConfig}
                  className="space-y-6"
                >
                  <div className="pb-3 border-b border-[#163300]/10 flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold text-[#163300] uppercase tracking-wider">
                      03. Governance & Consultation Schedule
                    </h3>
                    <span className="text-xs font-mono font-semibold text-[#163300]/60">Step 3 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SearchableSelect
                      isDark={false}
                      label="Preferred Engagement Model"
                      options={engagementModelOptions}
                      value={govData.engagementPreference}
                      onChange={(val) => setGovData({ ...govData, engagementPreference: val })}
                      searchable={false}
                    />

                    <SearchableSelect
                      isDark={false}
                      label="Your Decision Role"
                      options={decisionRoleOptions}
                      value={govData.userRole}
                      onChange={(val) => setGovData({ ...govData, userRole: val })}
                      searchable={false}
                    />

                    <SearchableSelect
                      isDark={false}
                      label="Procurement Process"
                      options={[
                        'Direct Engagement',
                        'RFP / Tender Process',
                        'Vendor Onboarding Required',
                        'Third-party Partner',
                      ]}
                      value={govData.procurementProcess}
                      onChange={(val) => setGovData({ ...govData, procurementProcess: val })}
                      searchable={false}
                    />

                    <SearchableSelect
                      isDark={false}
                      label="NDA Required Prior to Technical Call?"
                      options={['Yes', 'No', 'Already Signed']}
                      value={govData.ndaRequired}
                      onChange={(val) => setGovData({ ...govData, ndaRequired: val })}
                      searchable={false}
                    />
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#163300]/15 space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-[#163300]" />
                      <span className="text-xs font-mono font-bold text-[#163300] uppercase">
                        Schedule Executive Consultation (Bangladesh Standard Time BST, UTC+6)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[#163300]/70 font-semibold uppercase mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={govData.meetingDate}
                          onChange={(e) => setGovData({ ...govData, meetingDate: e.target.value })}
                          className="w-full p-3 rounded-xl border border-[#163300]/20 bg-white text-xs font-mono text-[#163300] focus:outline-none focus:border-[#163300]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#163300]/70 font-semibold uppercase mb-1">
                          Preferred Time Slot (BST UTC+6)
                        </label>
                        <select
                          value={govData.meetingSlot}
                          onChange={(e) => setGovData({ ...govData, meetingSlot: e.target.value })}
                          className="w-full p-3 rounded-xl border border-[#163300]/20 bg-white text-xs font-mono text-[#163300] focus:outline-none focus:border-[#163300]"
                        >
                          <option value="11:00 AM BST (Dhaka UTC+6)">11:00 AM BST (Dhaka UTC+6)</option>
                          <option value="03:00 PM BST (Dhaka UTC+6)">03:00 PM BST (Dhaka UTC+6)</option>
                          <option value="07:00 PM BST (Dhaka UTC+6)">07:00 PM BST (Dhaka UTC+6)</option>
                          <option value="10:00 PM BST (Dhaka UTC+6)">10:00 PM BST (Dhaka UTC+6)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#163300] uppercase mb-1">
                      Upload Architecture Brief / RFP / Specs (Optional)
                    </label>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#163300]/20 bg-[#FAFAF8]">
                      <Paperclip size={18} className="text-[#163300]" />
                      <input
                        type="file"
                        onChange={(e) => setRfpFile(e.target.files?.[0] || null)}
                        className="text-xs text-[#163300] file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#163300] file:text-[#DCFF85]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#163300]/20 flex items-start gap-3 text-xs shadow-sm">
                    <input
                      type="checkbox"
                      id="dynimeTermsAgree"
                      required
                      defaultChecked
                      className="mt-0.5 w-4 h-4 rounded border-[#163300]/40 text-[#163300] focus:ring-[#163300] accent-[#163300] shrink-0"
                    />
                    <label
                      htmlFor="dynimeTermsAgree"
                      className="text-xs text-[#163300]/90 leading-relaxed font-medium cursor-pointer"
                    >
                      I agree to the <b>Enterprise Partnership Terms</b>, Bilateral Mutual NDA, and
                      acknowledge integration with <b>Dynime Business Services & AI Swarms</b> where
                      applicable upon submission.
                    </label>
                  </div>

                  <div className="pt-4 border-t border-[#163300]/10 flex items-center justify-between gap-4">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      variant="secondary"
                      text="Back"
                      icon={ArrowLeft}
                      className="px-5 py-3 text-xs font-semibold"
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      text={isSubmitting ? 'Transmitting...' : 'Submit Enterprise Brief'}
                      icon={Send}
                      className="px-8 py-3.5 text-xs font-mono font-bold uppercase"
                    />
                  </div>
                </motion.div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
