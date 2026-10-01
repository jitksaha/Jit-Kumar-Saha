import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";
import { assetUrls } from "../data/assets";
import { SubrouteLayout } from "../components/layout/SubrouteLayout";
import { ThreeBackground } from "../components/ui/ThreeBackground";
import { ExecutivePortraitCard } from "../components/ui/ExecutivePortraitCard";
import { CopyButton } from "../components/ui/CopyButton";
import { InquiryWizard } from "../components/forms/InquiryWizard";
import { ActionLink, RollingIcon } from "../components/ui/Button";
import { easeCustom, itemVariants, containerVariants } from "../utils/motion";

function ContactPage() {
  return (
    <SubrouteLayout page="contact">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAF8]">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <ThreeBackground variant="orb" accentColor={0x9fe870} />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeCustom }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163300] text-[#DCFF85] text-xs font-mono uppercase tracking-widest mb-6 border border-[#DCFF85]/30 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#9FE870] animate-ping" />
                AVAILABLE FOR SELECT COLLABORATIONS & PARTNERSHIPS
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
                Let's Build Something Meaningful
              </h1>
              <div className="space-y-4 text-base sm:text-lg text-[#163300]/80 leading-relaxed max-w-2xl mb-8 font-medium">
                <p>
                  Have a business idea, product opportunity, technology project
                  or potential partnership? I'd be interested in hearing about
                  it.
                </p>
                <p className="text-sm sm:text-base text-[#163300]/75">
                  Whether you're exploring a new digital product, building a
                  technology business or looking for strategic collaboration,
                  let's start a conversation.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <ActionLink
                  href="mailto:mail@jitksaha.com"
                  variant="dark"
                  text="Send Direct Email"
                  icon={<ArrowUpRight size={16} />}
                  className="px-7 py-3.5 text-sm font-semibold tracking-tight shadow-md hover:shadow-xl shadow-[#163300]/15"
                />
                <ActionLink
                  href="https://wa.me/8801601111994"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  text="WhatsApp Direct"
                  icon={<ArrowUpRight size={16} />}
                  className="px-6 py-3.5 text-sm font-semibold tracking-tight shadow-xs"
                />
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: easeCustom, delay: 0.15 }}
            >
              <ExecutivePortraitCard
                image={assetUrls.contact}
                badge="DIRECT ACCESS"
                tagline="mail@jitksaha.com · +880 1601 111994"
                location="Dhaka · Global Remote"
                aspectRatio="aspect-[16/10] max-h-72"
                quote="Send me the core business bottleneck as you understand it today, and we will sharpen and solve it together."
                highlights={[
                  { label: "Response SLA", value: "< 24 Hours" },
                  { label: "Availability", value: "Q1/Q2 2026" },
                ]}
                ctaText="Send Direct Email"
                ctaTo="mailto:mail@jitksaha.com"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Direct Contact Cards */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {/* Primary Channel */}
            <motion.div
              className="md:col-span-8 bg-[#163300] text-white rounded-3xl p-8 sm:p-12 border border-[#163300] flex flex-col justify-between relative overflow-hidden group shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#DCFF85]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#DCFF85]/20 transition-all duration-700" />
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] bg-white/10 px-3 py-1 rounded-full border border-[#DCFF85]/30 font-bold">
                    PRIMARY CHANNEL
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#DCFF85] text-[#163300] flex items-center justify-center font-bold">
                    <Mail size={18} />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
                  Direct Inquiries & Scopes
                </h3>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-xl">
                  Whether you are planning a strategic AI roadmap,
                  re-architecting an engineering stack, or building a
                  high-conversion venture, drop an email directly into my inbox.
                </p>
              </div>

              <div className="pt-10 mt-10 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <a
                    href="mailto:mail@jitksaha.com"
                    className="inline-flex items-center gap-3 text-lg sm:text-xl font-bold font-mono text-[#DCFF85] hover:underline block"
                  >
                    mail@jitksaha.com
                    <RollingIcon icon={ArrowUpRight} size={20} />
                  </a>
                  <a
                    href="mailto:mail.jitsaha@gmail.com"
                    className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-[#DCFF85]"
                  >
                    Alt: mail.jitsaha@gmail.com
                  </a>
                </div>
                <CopyButton
                  textToCopy="mail@jitksaha.com"
                  label="Copy Primary Email"
                  copiedLabel="Copied to clipboard!"
                  variant="pill"
                  className="!bg-[#DCFF85] !text-[#163300] hover:!bg-[#9FE870] py-3.5 px-6 font-bold shadow-md"
                />
              </div>
            </motion.div>

            {/* Social / Messaging */}
            <motion.div
              className="md:col-span-4 flex flex-col gap-6"
              variants={itemVariants}
            >
              <motion.a
                href="https://www.linkedin.com/in/jitksha"
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-3xl p-8 border border-[#163300]/10 hover:border-[#163300]/30 hover:shadow-md transition-all flex flex-col justify-between group flex-1"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#163300]/5 text-[#163300] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#163300] group-hover:text-[#DCFF85] transition-all">
                      <Linkedin size={20} />
                    </div>
                    <span className="text-xs font-mono text-[#163300]/60 font-semibold">
                      LINKEDIN
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#163300] mb-1">
                    Connect Professionally
                  </h4>
                  <p className="text-xs text-[#163300]/70">
                    Follow my writing on AI, Product, and Engineering.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#163300]/10 flex items-center justify-between text-xs font-bold text-[#163300]">
                  <span>VIEW PROFILE</span>
                  <RollingIcon icon={ArrowUpRight} size={15} />
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/8801601111994"
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-3xl p-8 border border-[#163300]/10 hover:border-[#163300]/30 hover:shadow-md transition-all flex flex-col justify-between group flex-1"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#163300]/5 text-[#163300] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#163300] group-hover:text-[#DCFF85] transition-all">
                      <MessageCircle size={20} />
                    </div>
                    <span className="text-xs font-mono text-[#163300]/60 font-semibold">
                      WHATSAPP
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#163300] mb-1">
                    +880 1601 111994
                  </h4>
                  <p className="text-xs text-[#163300]/70">
                    For urgent queries, advisory chats, or introductions.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#163300]/10 flex items-center justify-between text-xs font-bold text-[#163300]">
                  <span>START CHAT</span>
                  <RollingIcon icon={ArrowUpRight} size={15} />
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Quick info row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-[#163300]/10 flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#163300]/5 flex items-center justify-center text-[#163300]">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-xs font-mono text-[#163300]/60 block font-semibold">
                  LOCATION
                </span>
                <b className="text-sm font-semibold text-[#163300]">
                  Dhaka · Global Remote
                </b>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-[#163300]/10 flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#163300]/5 flex items-center justify-center text-[#163300]">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-xs font-mono text-[#163300]/60 block font-semibold">
                  RESPONSE SLA
                </span>
                <b className="text-sm font-semibold text-[#163300]">
                  Within 24–48 Hours
                </b>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-[#163300]/10 flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#163300]/5 flex items-center justify-center text-[#163300]">
                <CheckCircle size={18} />
              </div>
              <div>
                <span className="text-xs font-mono text-[#163300]/60 block font-semibold">
                  ENGAGEMENT FORMAT
                </span>
                <b className="text-sm font-semibold text-[#163300]">
                  Advisory / Retainer / Sprint
                </b>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Inquiry Wizard Form */}
      <section
        className="py-20 pb-28 bg-[#EFEFEA] border-t border-[#163300]/10"
        id="form"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <InquiryWizard />
        </div>
      </section>
    </SubrouteLayout>
  );
}

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});
