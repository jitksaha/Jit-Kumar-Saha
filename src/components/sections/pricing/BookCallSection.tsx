import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Video,
  Mic,
  Activity,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  Send,
  MessageCircle,
  Mail,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Lock,
  Layers,
  Zap,
} from 'lucide-react';
import { createCalendarUrl } from '../../../utils/calendar';
import { Button, ActionLink } from '../../ui/Button';

export interface SelectedPackageInfo {
  title: string;
  category?: string;
  price?: string;
  delivery?: string;
  description?: string;
  type?: string;
}

interface BookCallSectionProps {
  selectedPackage?: SelectedPackageInfo | null;
}

const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:30 PM',
  '08:00 PM',
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const BookCallSection: React.FC<BookCallSectionProps> = ({ selectedPackage }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Initialize selected date to tomorrow (or next available date)
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDateStr = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const initialDateStr = formatDateStr(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  const todayStr = formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const [selectedDate, setSelectedDate] = useState<string>(initialDateStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('03:00 PM');
  const [viewDate, setViewDate] = useState<Date>(() => new Date(tomorrow));

  // Client form inputs
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientCompany, setClientCompany] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');

  const timeSlotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = timeSlotsRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Days calculations (Sunday first, standard calendar)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    setIsSubmitting(true);
    const generatedRefId = `DISC-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setRefId(generatedRefId);

    const payload = {
      type: 'discovery-call',
      refId: generatedRefId,
      name: clientName,
      email: clientEmail,
      company: clientCompany || 'Independent / Confidential',
      meetingDate: selectedDate,
      meetingSlot: selectedSlot,
      selectedPackage: selectedPackage?.title || 'General Technical Discovery',
      price: selectedPackage?.price || 'Custom Scope',
      notes: clientNotes,
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

      setIsBooked(true);
    } catch (err) {
      console.warn('Booking dispatch notice:', err);
      setIsBooked(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calendarInviteUrl = createCalendarUrl({
    title: `Project Discovery Consultation — Jit Kumar Saha & ${clientCompany || clientName}`,
    details: `Project Discovery & Technical Architecture Session.\nClient: ${clientName} (${clientEmail})\nCompany: ${clientCompany || 'N/A'}\nPackage: ${selectedPackage?.title || 'General'}\nNotes: ${clientNotes || 'N/A'}`,
    date: selectedDate,
    timeSlot: selectedSlot,
    location: 'Google Meet (Link will be emailed)',
  });

  return (
    <div className="w-full rounded-2xl md:rounded-3xl bg-[#090E06] text-white p-6 sm:p-8 md:p-10 lg:p-12 border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#9FE870]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#DCFF85]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#DCFF85] text-xs font-mono font-bold uppercase tracking-wider mb-3.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9FE870] animate-pulse" />
              <span>30-Min Technical Discovery</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-3">
              Book a Strategy Call
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-lg mb-5 font-normal">
              Direct technical consultation with Jit Kumar Saha. Discuss your architecture, timeline, custom scope, and technology roadmap with zero fluff and immediate actionable clarity.
            </p>

            {/* Comprehensive Capabilities Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-6">
              {[
                'Direct Principal Access',
                '0→1 Tech Architecture',
                '100% Code & IP Ownership',
                'Bilateral Mutual NDA',
                '95+ Core Web Vitals',
                'Fast 14-Day Delivery',
              ].map((pill, pi) => (
                <div
                  key={pi}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-[11px] font-medium transition-colors"
                >
                  <span className="w-3.5 h-3.5 rounded-md bg-[#10B981] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                    ✓
                  </span>
                  <span>{pill}</span>
                </div>
              ))}
            </div>

            {/* High-End Studio Design & Principal Director Showcase */}
            <div className="relative w-full rounded-xl bg-[#0F170B] border border-white/10 p-4 sm:p-5 overflow-hidden shadow-xl">
              {/* Studio Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#163300_1px,transparent_1px),linear-gradient(to_bottom,#163300_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#DCFF85]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Top Studio HUD */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                    Direct Partner Access
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  Google Meet / Zoom
                </span>
              </div>

              {/* Principal Card Row */}
              <div className="relative z-10 flex items-center gap-4 py-4">
                {/* Master Studio Portrait */}
                <div className="relative shrink-0 group">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden border border-[#DCFF85]/40 shadow-lg bg-black relative">
                    <img
                      src="/assets/jit-hero-A1GJo4Bd.webp"
                      alt="Jit Kumar Saha - Principal & Technology Director"
                      className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-[#163300] border border-[#DCFF85]/40 text-[#DCFF85] text-[9px] font-mono font-bold">
                    HOST
                  </div>
                </div>

                {/* Director Bio & Signals */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                      Jit Kumar Saha
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#DCFF85] font-mono font-medium">
                    Principal &amp; Technology Director
                  </p>
                  <p className="text-[11px] text-white/70 leading-relaxed line-clamp-2">
                    Ex-Director of Technology · 10+ Years Building High-Performance Web Apps, AI Workflows &amp; Digital Ventures.
                  </p>
                </div>
              </div>

              {/* Bottom Audio Spectrum & Session Status */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/80">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-1.5 bg-[#DCFF85] rounded-full animate-pulse" />
                    <span className="w-0.5 h-3 bg-[#DCFF85] rounded-full animate-pulse [animation-delay:0.15s]" />
                    <span className="w-0.5 h-2 bg-[#DCFF85] rounded-full animate-pulse [animation-delay:0.3s]" />
                    <span className="w-0.5 h-2.5 bg-[#DCFF85] rounded-full animate-pulse [animation-delay:0.45s]" />
                  </div>
                  <span className="text-white/90 font-medium">Live Briefing Ready</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Video size={12} className="text-[#DCFF85]" />
                  <Mic size={12} className="text-[#DCFF85]" />
                  <span>30 Min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Rating Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-black shadow-sm border border-gray-200">
              <span className="font-extrabold text-[11px] tracking-tight text-[#E03A3A] font-sans">Clutch</span>
              <div className="flex text-[#E03A3A] text-[11px]">★★★★★</div>
              <span className="text-[11px] font-extrabold font-mono text-black">5.0</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-black shadow-sm border border-gray-200">
              <span className="font-extrabold text-[11px] tracking-tight text-[#14A800] font-sans">upwork</span>
              <div className="flex text-[#14A800] text-[11px]">★★★★★</div>
              <span className="text-[11px] font-extrabold font-mono text-black">5.0 Top Rated</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (2-COLUMN CALENDAR FROM ENTERPRISE FORM) ================= */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-7 text-gray-900 shadow-2xl relative overflow-hidden border border-gray-100">
            
            {/* Selected Package Banner if clicked from pricing card */}
            {selectedPackage && (
              <div className="mb-5 p-3 rounded-xl bg-[#163300] text-white flex items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#DCFF85] font-bold">
                    Selected Scope: {selectedPackage.category || 'Package'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {selectedPackage.title} <span className="text-[#DCFF85] font-mono font-extrabold">({selectedPackage.price})</span>
                  </div>
                </div>
                <a
                  href="#pricing-models"
                  className="text-[10px] font-mono text-[#DCFF85] hover:underline shrink-0"
                >
                  Change ↑
                </a>
              </div>
            )}

            {!isBooked ? (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                      Select Date &amp; Time
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Choose a convenient slot for your 30-min discovery call.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#163300]/[0.06] text-[#163300] text-[11px] font-mono font-bold">
                    Free Consultation
                  </span>
                </div>

                {/* THE 2-COLUMN CALENDAR & TIME SLOTS PICKER (MATCHING ENTERPRISE FORM) */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden mb-5">
                  <div className="grid grid-cols-1 sm:grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    
                    {/* Calendar Month & Grid (7 cols) */}
                    <div className="sm:col-span-7 p-3.5 sm:p-4 flex flex-col justify-between">
                      <div>
                        {/* Month Header < Month Year > */}
                        <div className="flex items-center justify-between mb-3 px-1">
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
                            aria-label="Previous Month"
                          >
                            <ChevronLeft size={16} strokeWidth={2.5} />
                          </button>

                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight font-sans">
                            {MONTH_NAMES[month]} {year}
                          </h4>

                          <button
                            type="button"
                            onClick={handleNextMonth}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
                            aria-label="Next Month"
                          >
                            <ChevronRight size={16} strokeWidth={2.5} />
                          </button>
                        </div>

                        {/* Weekdays: Su Mo Tu We Th Fr Sa */}
                        <div className="grid grid-cols-7 text-center mb-1">
                          {WEEKDAYS.map((wd) => (
                            <span key={wd} className="text-[11px] font-semibold text-gray-400 py-0.5 select-none">
                              {wd}
                            </span>
                          ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-y-1 text-center">
                          {/* Previous month overflow days */}
                          {Array.from({ length: firstDayIndex }).map((_, i) => {
                            const prevDayNum = prevMonthDays - firstDayIndex + i + 1;
                            return (
                              <div key={`prev-${i}`} className="h-7 sm:h-8 flex items-center justify-center text-[11px] text-gray-300 select-none font-normal">
                                {prevDayNum}
                              </div>
                            );
                          })}

                          {/* Current month days */}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const dayNum = i + 1;
                            const dateStr = formatDateStr(year, month, dayNum);
                            const dayDate = new Date(year, month, dayNum);
                            dayDate.setHours(0, 0, 0, 0);

                            const isPast = dayDate < today;
                            const isSelected = selectedDate === dateStr;
                            const isToday = dateStr === todayStr;

                            return (
                              <div key={`curr-${dayNum}`} className="h-7 sm:h-8 flex items-center justify-center">
                                <button
                                  type="button"
                                  disabled={isPast}
                                  onClick={() => setSelectedDate(dateStr)}
                                  className={`w-7 h-7 rounded-md text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                                    isSelected
                                      ? '!bg-[#163300] !text-[#DCFF85] font-bold shadow-xs'
                                      : isPast
                                      ? 'text-gray-300 cursor-not-allowed font-normal'
                                      : isToday
                                      ? 'text-black bg-gray-100 font-bold hover:bg-gray-200'
                                      : 'text-gray-800 hover:bg-[#DCFF85]/30 hover:text-[#163300]'
                                  }`}
                                >
                                  {dayNum}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Time Slots List (5 cols) */}
                    <div className="sm:col-span-5 p-3.5 sm:p-4 bg-gray-50/50 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-600 mb-2">
                          Available Times:
                        </div>
                        <div
                          ref={timeSlotsRef}
                          className="space-y-1.5 h-[210px] max-h-[210px] overflow-y-auto pr-1.5 scrollbar-thin focus:outline-none"
                          tabIndex={0}
                          style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = selectedSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                style={
                                  !isSelected
                                    ? {
                                        backgroundColor: 'rgba(240, 242, 237, 0.75)',
                                        borderColor: 'rgba(22, 51, 0, 0.16)',
                                        color: '#163300',
                                      }
                                    : undefined
                                }
                                className={`w-full py-2 px-2.5 rounded-lg text-xs font-mono border text-center transition-all cursor-pointer select-none font-bold ${
                                  isSelected
                                    ? '!bg-[#163300] !text-[#DCFF85] !border-[#163300] shadow-xs hover:!bg-[#224808] hover:!text-[#DCFF85]'
                                    : '!bg-[#F0F2ED]/75 !text-[#163300] !border-[#163300]/15 hover:!bg-[#163300] hover:!text-[#DCFF85] hover:!border-[#163300] shadow-2xs'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-2 text-[10px] font-mono text-gray-500 text-center">
                        Slot: 30 minutes duration
                      </div>
                    </div>

                  </div>
                </div>

                {/* Compact Form Inputs with Small Border Radius */}
                <form onSubmit={handleBookingSubmit} className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-900 focus:border-[#163300] focus:ring-1 focus:ring-[#163300] focus:outline-none bg-white transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider block mb-1">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-900 focus:border-[#163300] focus:ring-1 focus:ring-[#163300] focus:outline-none bg-white transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Global Inc."
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-900 focus:border-[#163300] focus:ring-1 focus:ring-[#163300] focus:outline-none bg-white transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Project Objective / Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Next.js SaaS MVP or AI Workflow Integration"
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-900 focus:border-[#163300] focus:ring-1 focus:ring-[#163300] focus:outline-none bg-white transition-all shadow-2xs"
                    />
                  </div>

                  {/* Submission CTA Button (Animated & Compact) */}
                  <div className="pt-1">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      text={isSubmitting ? "Scheduling Strategy Call..." : `Confirm Free Strategy Call (${selectedDate} @ ${selectedSlot})`}
                      icon={!isSubmitting ? <ArrowRight size={13} /> : undefined}
                      variant="dark"
                      className="w-full py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider shadow-md btn-shine"
                    />
                  </div>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#163300] text-[#DCFF85] flex items-center justify-center mx-auto shadow-md">
                  <Check size={24} className="stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold text-[#163300]">Strategy Call Confirmed!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  We've reserved <strong>{selectedDate} at {selectedSlot}</strong> for your discovery consultation. Reference ID: <strong className="font-mono">{refId}</strong>.
                </p>

                <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
                  <Button
                    href={calendarInviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="dark"
                    text="Add to Google Calendar"
                    icon={<Calendar size={14} />}
                    className="w-full py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider shadow-xs btn-shine"
                  />

                  <Button
                    href={`https://wa.me/8801601111994?text=${encodeURIComponent(
                      `Hi Jit, I just booked a strategy call for ${selectedDate} at ${selectedSlot} (${refId}) regarding ${selectedPackage?.title || 'a new project'}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    text="Ping on WhatsApp"
                    icon={<MessageCircle size={14} />}
                    className="w-full py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider shadow-xs transition-colors duration-200 !bg-[#F0F2ED] !border-[#E2E5DC] !text-[#163300] hover:!bg-[#163300] hover:!border-[#163300] hover:!text-[#DCFF85]"
                  />
                </div>
              </div>
            )}

            {/* Bottom Guarantees */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span className="flex items-center gap-1 font-semibold text-gray-700">
                <ShieldCheck size={12} className="text-[#163300]" /> Mutual NDA Protected
              </span>
              <span>100% Free · Auto Email Dispatch</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
