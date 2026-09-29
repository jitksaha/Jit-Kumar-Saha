import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Calendar,
  Download,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  Sparkles,
  Lock,
  Paperclip,
  Send,
  Zap,
  User,
  Layers,
  Wand2,
  RotateCcw,
  Loader2,
  Clock,
} from 'lucide-react';
import { SearchableSelect } from '../ui/SearchableSelect';
import { Button } from '../ui/Button';
import { CalendarTimePicker } from './CalendarTimePicker';
import { generateEnterprisePdf, getEnterprisePdfBase64 } from '../../utils/pdf';
import { createCalendarUrl } from '../../utils/calendar';

export function EnterpriseForm() {
  const [step, setStep] = useState<number>(1);

  // Step 1: About You & Core Initiative
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    country: 'United States',
  });

  const [initiativeData, setInitiativeData] = useState({
    primaryNeeds: ['Product Development', 'SaaS / Platform Development'],
    brief: '',
    currentSituation: 'Scaling an Existing Platform',
    budget: '$25K–$50K',
    timeline: '1–3 Months',
    focusAreas: ['Architecture & Tech Stack', 'Production Delivery'],
  });

  // AI Writer state
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuccessMsg, setAiSuccessMsg] = useState<string | null>(null);
  const [prevBrief, setPrevBrief] = useState<string | null>(null);

  // Step 3: Consultation
  const [consultationData, setConsultationData] = useState({
    meetingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    meetingSlot: '03:00 PM BST (Dhaka UTC+6)',
    agreed: true,
  });

  const [rfpFile, setRfpFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');

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

  const primaryNeedOptions = [
    'Product Development',
    'AI & Automation',
    'SaaS / Platform Development',
    'Digital Transformation',
    'Enterprise Web / Software',
    'Architecture & Technology',
    'Business / Product Strategy',
    'Other',
  ];

  const situationOptions = [
    'New Product / New Initiative',
    'Scaling an Existing Platform',
    'Rebuilding / Modernizing',
    'Looking for Technical Leadership',
    'Exploring a Partnership',
  ];

  const budgetOptions = [
    'Under $10K',
    '$10K–$25K',
    '$25K–$50K',
    '$50K–$100K',
    '$100K+',
  ];

  const timelineOptions = [
    'ASAP',
    '1–3 Months',
    '3–6 Months',
    '6+ Months',
    'Flexible',
  ];

  const focusAreaOptions = [
    'Architecture & Tech Stack',
    '0→1 MVP Execution',
    'Production Delivery',
    'AI Workflow Integration',
    'Fractional CTO Advisory',
    'Performance & Scaling',
  ];

  const togglePrimaryNeed = (need: string) => {
    setInitiativeData((prev) => ({
      ...prev,
      primaryNeeds: prev.primaryNeeds.includes(need)
        ? prev.primaryNeeds.filter((n) => n !== need)
        : [...prev.primaryNeeds, need],
    }));
  };

  const toggleFocusArea = (focus: string) => {
    setInitiativeData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(focus)
        ? prev.focusAreas.filter((f) => f !== focus)
        : [...prev.focusAreas, focus],
    }));
  };

  // Secure Server-Side AI Writer
  const handleAiAction = async (actionType: 'auto-draft' | 'polish' | 'concise') => {
    setIsAiGenerating(true);
    setAiError(null);
    setAiSuccessMsg(null);
    setPrevBrief(initiativeData.brief);

    let prompt = '';
    const company = userData.company.trim() || 'Our Company';
    const role = userData.jobTitle.trim() || 'Executive';
    const needs =
      initiativeData.primaryNeeds.length > 0
        ? initiativeData.primaryNeeds.join(', ')
        : 'Product Development and Architecture';

    if (actionType === 'auto-draft') {
      prompt = `Draft a concise 2-3 sentence executive problem summary and project scope for:
Company: ${company}
Role: ${role}
Primary Initiatives: ${needs}
Current Notes: ${initiativeData.brief || 'None provided'}

Directly output a sharp problem statement and high-impact project objective without conversational fluff.`;
    } else if (actionType === 'polish') {
      if (!initiativeData.brief.trim()) {
        prompt = `Write a crisp, professional executive problem statement for ${company} seeking ${needs}.`;
      } else {
        prompt = `Refine and structure the following rough brief into a professional executive problem statement:
"${initiativeData.brief}"
Context: Company is ${company}, Role is ${role}, Needs are ${needs}.`;
      }
    } else if (actionType === 'concise') {
      if (!initiativeData.brief.trim()) {
        prompt = `Write a 2-sentence concise executive problem brief for ${company} needing ${needs}.`;
      } else {
        prompt = `Condense the following initiative notes into 2 sharp, high-impact executive sentences:
"${initiativeData.brief}"`;
      }
    }

    try {
      let response = await fetch('/api/ai-writer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          system:
            'You are an executive technology consultant. Write crisp, high-impact enterprise problem summaries in 2-3 sentences. Output the brief directly.',
        }),
      });

      if (response.status === 404) {
        response = await fetch('/api/ai-writer.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
          }),
        });
      }

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate brief with AI');
      }

      const cleanResult = (data.result || '').trim();
      setInitiativeData((prev) => ({ ...prev, brief: cleanResult }));
      setAiSuccessMsg(
        actionType === 'auto-draft'
          ? 'Generated tailored executive brief!'
          : actionType === 'polish'
          ? 'Polished and structured notes!'
          : 'Condensed to executive summary!'
      );
      setTimeout(() => setAiSuccessMsg(null), 3500);
    } catch (err: any) {
      setAiError(err.message || 'AI generation failed. Please try again.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleUndoAi = () => {
    if (prevBrief !== null) {
      setInitiativeData((prev) => ({ ...prev, brief: prevBrief }));
      setPrevBrief(null);
      setAiSuccessMsg('Restored previous notes.');
      setTimeout(() => setAiSuccessMsg(null), 3000);
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!userData.name.trim()) errs.name = 'Full Name is required';
    if (!userData.email.trim()) {
      errs.email = 'Work Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errs.email = 'Valid work email is required';
    }
    if (!userData.company.trim()) errs.company = 'Company / Organization is required';
    if (initiativeData.primaryNeeds.length === 0) {
      errs.primaryNeeds = 'Please select at least one primary need';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getCalendarLink = () => {
    return createCalendarUrl({
      title: `Executive Consultation — Jit Kumar Saha & ${userData.company || userData.name}`,
      details: `Executive Project Consultation with Jit Kumar Saha.\nOrganization: ${
        userData.company || 'N/A'
      }\nRole: ${userData.jobTitle || 'Executive'}\nPrimary Needs: ${initiativeData.primaryNeeds.join(
        ', '
      )}\nProblem Summary: ${initiativeData.brief || 'N/A'}\nSituation: ${
        initiativeData.currentSituation
      }\nBudget: ${initiativeData.budget} (${initiativeData.timeline})`,
      date: consultationData.meetingDate,
    });
  };

  const handleDownloadPdf = () => {
    generateEnterprisePdf({
      refId: refId || 'ENT-SAMPLE',
      name: userData.name,
      email: userData.email,
      jobTitle: userData.jobTitle,
      company: userData.company,
      country: userData.country,
      primaryNeeds: initiativeData.primaryNeeds,
      currentSituation: initiativeData.currentSituation,
      budget: initiativeData.budget,
      timeline: initiativeData.timeline,
      brief: initiativeData.brief,
      meetingDate: consultationData.meetingDate,
      meetingSlot: consultationData.meetingSlot,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationData.agreed) {
      setErrors({ agreed: 'Please accept the terms to proceed' });
      return;
    }
    setIsSubmitting(true);
    const newRefId = `EXEC-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(newRefId);

    const pdfData = {
      refId: newRefId,
      name: userData.name,
      email: userData.email,
      jobTitle: userData.jobTitle,
      company: userData.company,
      country: userData.country,
      primaryNeeds: initiativeData.primaryNeeds,
      currentSituation: initiativeData.currentSituation,
      budget: initiativeData.budget,
      timeline: initiativeData.timeline,
      brief: initiativeData.brief,
      meetingDate: consultationData.meetingDate,
      meetingSlot: consultationData.meetingSlot,
    };

    let pdfBase64 = '';
    try {
      pdfBase64 = getEnterprisePdfBase64(pdfData);
    } catch (e) {
      console.warn('PDF generation notice:', e);
    }

    const payload = {
      type: 'enterprise',
      refId: newRefId,
      name: userData.name,
      email: userData.email,
      company: userData.company,
      role: userData.jobTitle,
      country: userData.country,
      needs: initiativeData.primaryNeeds,
      currentSituation: initiativeData.currentSituation,
      budget: initiativeData.budget,
      timeline: initiativeData.timeline,
      brief: initiativeData.brief,
      meetingDate: consultationData.meetingDate,
      meetingSlot: consultationData.meetingSlot,
      pdfBase64,
      pdfFilename: `Jit_Kumar_Saha_Executive_Brief_${newRefId}.pdf`,
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

      // Trigger instant browser download copy as well
      try {
        generateEnterprisePdf(pdfData);
      } catch (dlErr) {
        console.warn('Download prompt notice:', dlErr);
      }

      setIsSubmitted(true);
      setStep(4);
    } catch (err) {
      console.error('Email dispatch error:', err);
      // Still proceed to step 4 confirmation so user experience is smooth
      setIsSubmitted(true);
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const transitionConfig = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  const stepsList = [
    { step: 1, title: 'About & Initiative', icon: User },
    { step: 2, title: 'Scope & Timeline', icon: Layers },
    { step: 3, title: 'Consultation', icon: Check },
  ];

  return (
    <div className="w-full rounded-xl sm:rounded-2xl border border-[#163300]/15 bg-white text-[#163300] p-4 sm:p-7 md:p-8 shadow-xl relative z-10">
      {/* Top Header with Connected Icon Progress Bar */}
      <div className="mb-5 sm:mb-7 pb-4 sm:pb-5 border-b border-[#163300]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="max-w-2xl space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase bg-[#163300] text-[#DCFF85] border border-[#163300] shadow-2xs">
            <Sparkles size={11} /> ENTERPRISE QUALIFICATION & INTAKE
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#163300] leading-tight">
            Build, Scale or Modernize Your Platform
          </h2>
          <p className="text-xs text-[#163300]/70 leading-relaxed font-medium">
            Confidential intake for venture-backed startups, mid-market businesses, and enterprises
            seeking senior technical leadership, digital architecture, and custom AI execution.
          </p>
        </div>

        {/* Connected Step Icons Progress Bar */}
        <div className="w-full lg:w-auto lg:min-w-[320px] pt-1 pb-1">
          <div className="relative flex items-center justify-between">
            {/* Background Connecting Line */}
            <div className="absolute top-[16px] sm:top-[18px] left-[20px] right-[20px] h-[2px] bg-[#163300]/12 rounded-full z-0" />

            {/* Active Progress Fill Line */}
            <div
              className="absolute top-[16px] sm:top-[18px] left-[20px] h-[2px] bg-[#163300] rounded-full transition-all duration-300 z-0"
              style={{
                width: step === 1 ? '0%' : step === 2 ? '50%' : 'calc(100% - 40px)',
              }}
            />

            {stepsList.map((s) => {
              const isActive = step === s.step;
              const isDone = step > s.step;
              const IconComponent = isDone ? Check : s.icon;

              return (
                <div key={s.step} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#163300] text-[#DCFF85] border-2 border-[#163300] shadow-sm ring-3 ring-[#DCFF85]/80 scale-105'
                        : isDone
                        ? 'bg-[#163300] text-[#DCFF85] border-2 border-[#163300] shadow-xs'
                        : 'bg-white text-[#163300]/40 border-2 border-[#163300]/20'
                    }`}
                  >
                    <IconComponent size={14} strokeWidth={2.5} />
                  </div>
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono font-bold mt-1 transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[#163300]'
                        : isDone
                        ? 'text-[#163300]/80'
                        : 'text-[#163300]/40'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column Rich Trust & Governance Sidebar */}
        <div className="lg:col-span-4 space-y-4 lg:border-r lg:border-[#163300]/10 lg:pr-6">
          {/* Dynime Connected Badge */}
          <div className="bg-[#DCFF85]/20 rounded-xl p-3.5 border border-[#9FE870] flex items-start gap-2.5 text-xs shadow-xs">
            <div className="p-1.5 rounded-lg bg-[#163300] text-[#DCFF85] shrink-0 mt-0.5">
              <ShieldCheck size={15} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#163300] block">
                DYNIME BUSINESS SERVICES CONNECTED
              </span>
              <p className="text-[11px] text-[#163300]/90 leading-relaxed font-medium mt-0.5">
                All platform architecture is seamlessly connected to <b>Dynime Business Services</b> and autonomous AI swarm infrastructure.
              </p>
            </div>
          </div>

          {/* Governance & Security Card */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono font-bold uppercase text-[#163300]/80 tracking-wider">
              ENTERPRISE GOVERNANCE & SECURITY
            </h4>
            <div className="bg-[#FAFAF8] rounded-xl p-3.5 border border-[#163300]/12 space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-[#163300] text-[#DCFF85] shrink-0 mt-0.5">
                  <Lock size={13} />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-[#163300]">Bilateral NDA Guaranteed</h5>
                  <p className="text-[10px] text-[#163300]/75 leading-relaxed font-medium">
                    Strict mutual confidentiality executed prior to architectural discovery or codebase access.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2.5 border-t border-[#163300]/8">
                <div className="p-1.5 rounded-md bg-[#163300] text-[#DCFF85] shrink-0 mt-0.5">
                  <ShieldCheck size={13} />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-[#163300]">Zero-Data Retention AI</h5>
                  <p className="text-[10px] text-[#163300]/75 leading-relaxed font-medium">
                    Private LLM agent swarms deployed in your isolated VPC with strict zero data retention.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2.5 border-t border-[#163300]/8">
                <div className="p-1.5 rounded-md bg-[#163300] text-[#DCFF85] shrink-0 mt-0.5">
                  <Zap size={13} />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-[#163300]">High-Velocity Delivery Pods</h5>
                  <p className="text-[10px] text-[#163300]/75 leading-relaxed font-medium">
                    2-week clarity diagnostics, rapid 0→1 builds, and fractional technical leadership.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#FAFAF8] p-2.5 rounded-lg border border-[#163300]/12 text-center">
              <span className="text-base sm:text-lg font-bold font-mono text-[#163300] block leading-none">
                7+ Yrs
              </span>
              <span className="text-[9px] font-mono text-[#163300]/60 block font-semibold uppercase mt-1">
                Experience
              </span>
            </div>
            <div className="bg-[#FAFAF8] p-2.5 rounded-lg border border-[#163300]/12 text-center">
              <span className="text-base sm:text-lg font-bold font-mono text-[#163300] block leading-none">
                30+
              </span>
              <span className="text-[9px] font-mono text-[#163300]/60 block font-semibold uppercase mt-1">
                Live Systems
              </span>
            </div>
            <div className="bg-[#FAFAF8] p-2.5 rounded-lg border border-[#163300]/12 text-center">
              <span className="text-base sm:text-lg font-bold font-mono text-[#163300] block leading-none">
                100%
              </span>
              <span className="text-[9px] font-mono text-[#163300]/60 block font-semibold uppercase mt-1">
                Confidential
              </span>
            </div>
          </div>

          {/* Response Commitment Badge */}
          <div className="p-2.5 rounded-lg bg-[#FAFAF8] border border-[#163300]/10 flex items-center gap-2 text-[10px] font-mono text-[#163300]/80">
            <Clock size={13} className="text-[#163300] shrink-0" />
            <span>Response within 4h · Direct 1:1 Review</span>
          </div>
        </div>

        {/* Right Column Compact Interactive Wizard */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {step === 4 || isSubmitted ? (
              <motion.div
                key="enterprise-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="py-2 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#163300] text-[#DCFF85] flex items-center justify-center shrink-0 shadow-md">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase text-[#163300] bg-[#DCFF85] px-2.5 py-0.5 rounded border border-[#9FE870]">
                      CONSULTATION REF: {refId}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#163300] mt-1">
                      Consultation Requested
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#163300]/85 leading-relaxed font-medium">
                  Thank you, <strong>{userData.name}</strong> ({userData.company || 'Executive'}).
                  Your initiative brief has been received. I will review your requirements and follow
                  up promptly before our scheduled consultation.
                </p>

                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#163300]/12 text-left space-y-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#163300] block">
                    EXECUTIVE BRIEF OVERVIEW
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#163300]">
                    <div>
                      <span className="block font-mono text-[10px] text-[#163300]/60">ORGANIZATION & ROLE</span>
                      <strong>{userData.company}</strong> ({userData.jobTitle || 'Executive'})
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-[#163300]/60">PRIMARY NEEDS</span>
                      <strong>{initiativeData.primaryNeeds.slice(0, 3).join(', ')}</strong>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-[#163300]/60">TIER & TIMELINE</span>
                      <strong>{initiativeData.budget}</strong> ({initiativeData.timeline})
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-[#163300]/60">SCHEDULED TIME (BST)</span>
                      <strong>
                        {consultationData.meetingDate} @ {consultationData.meetingSlot}
                      </strong>
                    </div>
                  </div>
                  {initiativeData.brief && (
                    <div className="pt-2 border-t border-[#163300]/8 text-xs">
                      <span className="block font-mono text-[10px] text-[#163300]/60 mb-0.5">PROBLEM SUMMARY & SCOPE</span>
                      <p className="text-[#163300]/90 leading-relaxed italic text-[11px]">{initiativeData.brief}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Button
                    onClick={handleDownloadPdf}
                    variant="primary"
                    text="Download Executive PDF Brief"
                    icon={Download}
                    className="px-5 py-2.5 text-xs font-mono font-bold uppercase"
                  />

                  <Button
                    href={getCalendarLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    text="Add to Calendar"
                    icon={Calendar}
                    className="px-5 py-2.5 text-xs font-mono font-bold uppercase border border-[#163300]/20"
                  />

                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                    }}
                    variant="secondary"
                    text="Submit Another Brief"
                    className="px-4 py-2.5 text-xs font-semibold"
                  />
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={transitionConfig}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#163300] tracking-tight">
                    About You & The Initiative
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#163300]/70 font-medium">
                    Provide contact details, core initiative focus, and problem summary.
                  </p>
                </div>

                {/* Profile Fields (2-col compact) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={userData.name}
                      onChange={(e) => {
                        setUserData({ ...userData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="Jane Doe"
                      className={`w-full p-2.5 sm:p-3 rounded-lg border text-xs sm:text-sm font-semibold text-[#163300] focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 bg-red-50'
                          : 'border-[#163300]/20 bg-[#FAFAF8] focus:border-[#163300] focus:bg-white'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-600 font-semibold mt-0.5">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={userData.email}
                      onChange={(e) => {
                        setUserData({ ...userData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="jane@enterprise.com"
                      className={`w-full p-2.5 sm:p-3 rounded-lg border text-xs sm:text-sm font-semibold text-[#163300] focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 bg-red-50'
                          : 'border-[#163300]/20 bg-[#FAFAF8] focus:border-[#163300] focus:bg-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-600 font-semibold mt-0.5">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase mb-1">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={userData.company}
                      onChange={(e) => {
                        setUserData({ ...userData, company: e.target.value });
                        if (errors.company) setErrors({ ...errors, company: '' });
                      }}
                      placeholder="Acme Global Inc."
                      className={`w-full p-2.5 sm:p-3 rounded-lg border text-xs sm:text-sm font-semibold text-[#163300] focus:outline-none transition-colors ${
                        errors.company
                          ? 'border-red-500 bg-red-50'
                          : 'border-[#163300]/20 bg-[#FAFAF8] focus:border-[#163300] focus:bg-white'
                      }`}
                    />
                    {errors.company && (
                      <p className="text-[10px] text-red-600 font-semibold mt-0.5">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase mb-1">
                      Job Title / Role
                    </label>
                    <input
                      type="text"
                      value={userData.jobTitle}
                      onChange={(e) => setUserData({ ...userData, jobTitle: e.target.value })}
                      placeholder="Founder / CTO / VP of Product"
                      className="w-full p-2.5 sm:p-3 rounded-lg border border-[#163300]/20 bg-[#FAFAF8] text-xs sm:text-sm font-semibold text-[#163300] focus:outline-none focus:border-[#163300] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <SearchableSelect
                    isDark={false}
                    label="Country / Region"
                    options={countryOptions}
                    value={userData.country}
                    onChange={(val) => setUserData({ ...userData, country: val })}
                    searchable={true}
                  />
                </div>

                {/* Primary Needs (Compact Cards) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase">
                      Primary Need * (Select all that apply)
                    </label>
                    <span className="text-[10px] text-[#163300]/60 font-medium font-mono">
                      {initiativeData.primaryNeeds.length} selected
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {primaryNeedOptions.map((need) => {
                      const selected = initiativeData.primaryNeeds.includes(need);
                      return (
                        <button
                          key={need}
                          type="button"
                          onClick={() => {
                            togglePrimaryNeed(need);
                            if (errors.primaryNeeds) setErrors({ ...errors, primaryNeeds: '' });
                          }}
                          style={{
                            backgroundColor: selected ? '#163300' : undefined,
                            color: selected ? '#FFFFFF' : '#163300',
                          }}
                          className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between text-left border ${
                            selected
                              ? 'border-[#163300] shadow-xs !bg-[#163300] !text-white'
                              : 'bg-[#FAFAF8] text-[#163300] border-[#163300]/15 hover:border-[#163300]/40 hover:bg-[#DCFF85]/20'
                          }`}
                        >
                          <span className="text-[10px] sm:text-[11px] leading-tight line-clamp-1">{need}</span>
                          {selected && (
                            <Check size={12} className="shrink-0 text-[#9FE870] ml-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.primaryNeeds && (
                    <p className="text-[10px] text-red-600 font-semibold">{errors.primaryNeeds}</p>
                  )}
                </div>

                {/* Problem Summary & Project Brief with Compact AI Writer Suite */}
                <div className="space-y-2 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase">
                        Problem Summary & Project Brief
                      </label>
                    </div>

                    {/* Compact AI Assistant Toolbar */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        disabled={isAiGenerating}
                        onClick={() => handleAiAction('auto-draft')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-bold bg-[#163300] text-[#DCFF85] border border-[#163300] hover:bg-[#1f4700] transition-colors shadow-2xs disabled:opacity-50"
                        title="Auto-draft problem summary with AI"
                      >
                        {isAiGenerating ? (
                          <Loader2 size={11} className="animate-spin" />
                        ) : (
                          <Sparkles size={11} />
                        )}
                        <span>Auto-Draft with AI</span>
                      </button>

                      <button
                        type="button"
                        disabled={isAiGenerating || !initiativeData.brief.trim()}
                        onClick={() => handleAiAction('polish')}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-bold bg-[#FAFAF8] text-[#163300] border border-[#163300]/15 hover:bg-[#DCFF85]/30 transition-colors disabled:opacity-40"
                        title="Polish notes"
                      >
                        <Wand2 size={11} />
                        <span>Polish</span>
                      </button>

                      <button
                        type="button"
                        disabled={isAiGenerating || !initiativeData.brief.trim()}
                        onClick={() => handleAiAction('concise')}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-bold bg-[#FAFAF8] text-[#163300] border border-[#163300]/15 hover:bg-[#DCFF85]/30 transition-colors disabled:opacity-40"
                        title="Make concise"
                      >
                        <span>Concise</span>
                      </button>

                      {prevBrief !== null && (
                        <button
                          type="button"
                          onClick={handleUndoAi}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-bold text-[#163300]/70 hover:text-[#163300] hover:bg-[#163300]/5 transition-colors"
                          title="Undo AI generation"
                        >
                          <RotateCcw size={11} />
                          <span>Undo</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* AI Status / Error Message */}
                  {isAiGenerating && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#DCFF85]/30 border border-[#9FE870] text-[11px] font-medium text-[#163300] animate-pulse">
                      <Loader2 size={12} className="animate-spin text-[#163300]" />
                      <span>Generating executive problem statement with server-side AI...</span>
                    </div>
                  )}

                  {aiSuccessMsg && (
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#DCFF85]/40 border border-[#9FE870] text-[11px] font-bold text-[#163300]">
                      <Check size={12} className="text-[#163300]" />
                      <span>{aiSuccessMsg}</span>
                    </div>
                  )}

                  {aiError && (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-200 text-[11px] font-medium text-red-700">
                      <span>{aiError}</span>
                      <button
                        type="button"
                        onClick={() => handleAiAction('auto-draft')}
                        className="font-bold underline ml-1"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  <div>
                    <textarea
                      rows={3}
                      value={initiativeData.brief}
                      onChange={(e) =>
                        setInitiativeData({ ...initiativeData, brief: e.target.value })
                      }
                      placeholder="e.g., We are scaling a B2B SaaS platform and need senior architecture guidance to refactor our real-time data pipelines before our enterprise launch."
                      className="w-full p-2.5 sm:p-3 rounded-lg border border-[#163300]/20 bg-[#FAFAF8] text-xs sm:text-sm font-semibold text-[#163300] placeholder:text-[#163300]/40 focus:outline-none focus:border-[#163300] focus:bg-white leading-relaxed"
                    />
                    <div className="flex items-center justify-between text-[10px] text-[#163300]/50 font-mono mt-0.5 px-0.5">
                      <span>Confidential · Bilateral NDA Protected</span>
                      <span>{initiativeData.brief.length} characters</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#163300]/10 flex justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                    variant="primary"
                    text="Continue to Scope & Timeline"
                    icon={ArrowRight}
                    className="px-6 py-2.5 text-xs font-mono font-bold uppercase"
                  />
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={transitionConfig}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#163300] tracking-tight">
                    Scope & Timeline
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#163300]/70 font-medium">
                    Define the current stage of your system, budget range, and timeline expectations.
                  </p>
                </div>

                {/* Current Situation (Compact Cards) */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase">
                    Current Stage / Situation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {situationOptions.map((sit) => {
                      const selected = initiativeData.currentSituation === sit;
                      return (
                        <button
                          key={sit}
                          type="button"
                          onClick={() =>
                            setInitiativeData({ ...initiativeData, currentSituation: sit })
                          }
                          style={{
                            backgroundColor: selected ? '#163300' : undefined,
                            color: selected ? '#FFFFFF' : '#163300',
                          }}
                          className={`p-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between text-left border ${
                            selected
                              ? 'border-[#163300] shadow-xs !bg-[#163300] !text-white'
                              : 'bg-[#FAFAF8] text-[#163300] border-[#163300]/15 hover:border-[#163300]/40 hover:bg-[#DCFF85]/20'
                          }`}
                        >
                          <span className="text-[11px] leading-tight">{sit}</span>
                          {selected && (
                            <Check size={12} className="shrink-0 text-[#9FE870] ml-1.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget & Timeline in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase">
                      Investment Range
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {budgetOptions.map((b) => {
                        const selected = initiativeData.budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setInitiativeData({ ...initiativeData, budget: b })}
                            style={{
                              backgroundColor: selected ? '#163300' : undefined,
                              color: selected ? '#FFFFFF' : '#163300',
                            }}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 border ${
                              selected
                                ? 'border-[#163300] shadow-xs !bg-[#163300] !text-white'
                                : 'bg-[#FAFAF8] text-[#163300] border-[#163300]/15 hover:border-[#163300]/40 hover:bg-[#DCFF85]/20'
                            }`}
                          >
                            {selected && <Check size={11} className="text-[#9FE870]" />}
                            <span>{b}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase">
                      Target Timeline
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {timelineOptions.map((t) => {
                        const selected = initiativeData.timeline === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setInitiativeData({ ...initiativeData, timeline: t })}
                            style={{
                              backgroundColor: selected ? '#163300' : undefined,
                              color: selected ? '#FFFFFF' : '#163300',
                            }}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 border ${
                              selected
                                ? 'border-[#163300] shadow-xs !bg-[#163300] !text-white'
                                : 'bg-[#FAFAF8] text-[#163300] border-[#163300]/15 hover:border-[#163300]/40 hover:bg-[#DCFF85]/20'
                            }`}
                          >
                            {selected && <Check size={11} className="text-[#9FE870]" />}
                            <span>{t}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Strategic Scope & Focus Areas */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase">
                    Strategic Scope & Focus Areas (Optional)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {focusAreaOptions.map((focus) => {
                      const selected = initiativeData.focusAreas.includes(focus);
                      return (
                        <button
                          key={focus}
                          type="button"
                          onClick={() => toggleFocusArea(focus)}
                          style={{
                            backgroundColor: selected ? '#163300' : undefined,
                            color: selected ? '#FFFFFF' : '#163300',
                          }}
                          className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between text-left border ${
                            selected
                              ? 'border-[#163300] shadow-xs !bg-[#163300] !text-white'
                              : 'bg-[#FAFAF8] text-[#163300] border-[#163300]/15 hover:border-[#163300]/40 hover:bg-[#DCFF85]/20'
                          }`}
                        >
                          <span className="text-[10px] sm:text-[11px] leading-tight line-clamp-1">{focus}</span>
                          {selected && (
                            <Check size={11} className="shrink-0 text-[#9FE870] ml-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#163300]/10 flex items-center justify-between gap-3">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="secondary"
                    text="Back"
                    icon={ArrowLeft}
                    className="px-4 py-2 text-xs font-semibold"
                  />

                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    variant="primary"
                    text="Continue to Consultation"
                    icon={ArrowRight}
                    className="px-6 py-2.5 text-xs font-mono font-bold uppercase"
                  />
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} key="step-3">
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={transitionConfig}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#163300] tracking-tight">
                      Choose a time to talk.
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#163300]/70 font-medium">
                      Select a convenient time for an executive consultation.
                    </p>
                  </div>

                  {/* Side-by-side Calendar & Available Times Slots */}
                  <CalendarTimePicker
                    selectedDate={consultationData.meetingDate}
                    selectedTime={consultationData.meetingSlot}
                    onSelectDate={(date) =>
                      setConsultationData({ ...consultationData, meetingDate: date })
                    }
                    onSelectTime={(slot) =>
                      setConsultationData({ ...consultationData, meetingSlot: slot })
                    }
                  />

                  {/* Upload a Brief (Optional) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-[#163300] uppercase">
                        Upload a brief (Optional)
                      </label>
                      <span className="text-[10px] text-[#163300]/60 font-medium font-mono">PDF, DOCX, ZIP</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#163300]/20 bg-[#FAFAF8]">
                      <Paperclip size={15} className="text-[#163300] shrink-0" />
                      <input
                        type="file"
                        onChange={(e) => setRfpFile(e.target.files?.[0] || null)}
                        className="text-xs text-[#163300] file:mr-2.5 file:py-0.5 file:px-2.5 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-[#163300] file:text-[#DCFF85]"
                      />
                    </div>
                  </div>

                  {/* Distinctive Custom Checkbox */}
                  <div
                    onClick={() =>
                      setConsultationData({
                        ...consultationData,
                        agreed: !consultationData.agreed,
                      })
                    }
                    className="p-3 rounded-lg bg-[#FAFAF8] border border-[#163300]/15 flex items-start gap-2.5 text-xs shadow-2xs cursor-pointer hover:border-[#163300]/30 transition-all select-none"
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 ${
                        consultationData.agreed
                          ? 'bg-[#163300] text-[#DCFF85] border border-[#163300] shadow-xs scale-100'
                          : 'bg-white border border-[#163300]/40 text-transparent scale-95'
                      }`}
                    >
                      <Check size={11} strokeWidth={3} className={consultationData.agreed ? 'opacity-100' : 'opacity-0'} />
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#163300]/85 leading-relaxed font-medium">
                      I agree to the{' '}
                      <span className="font-bold underline text-[#163300]">
                        Enterprise Terms
                      </span>{' '}
                      and{' '}
                      <span className="font-bold underline text-[#163300]">Mutual NDA</span>, and
                      understand that relevant Dynime Business Services may be involved.
                    </p>
                  </div>

                  {errors.agreed && (
                    <p className="text-[10px] text-red-600 font-semibold">{errors.agreed}</p>
                  )}

                  <div className="pt-4 border-t border-[#163300]/10 flex items-center justify-between gap-3">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      variant="secondary"
                      text="Back"
                      icon={ArrowLeft}
                      className="px-4 py-2 text-xs font-semibold"
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      text={isSubmitting ? 'Transmitting...' : 'Request Executive Consultation'}
                      icon={Send}
                      className="px-6 py-2.5 text-xs font-mono font-bold uppercase shadow-md hover:shadow-lg"
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
