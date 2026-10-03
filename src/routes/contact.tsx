import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
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

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
                ctaHref="mailto:mail@jitksaha.com"
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
                href="https://www.linkedin.com/in/jitksahabd/"
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
                      <WhatsAppIcon size={20} />
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

              {/* Additional Social Channels */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#163300]/10 flex items-center justify-between gap-4">
                <span className="text-xs font-mono font-semibold text-[#163300]/70">
                  CONNECT ON SOCIAL
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://x.com/jitksahabd"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#163300]/5 hover:bg-[#163300] text-[#163300] hover:text-[#DCFF85] flex items-center justify-center transition-all"
                    aria-label="X (Twitter)"
                  >
                    <XIcon size={14} />
                  </a>
                  <a
                    href="https://www.facebook.com/jitksahabd/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#163300]/5 hover:bg-[#163300] text-[#163300] hover:text-[#DCFF85] flex items-center justify-center transition-all"
                    aria-label="Facebook Profile"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/jitksaha"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#163300]/5 hover:bg-[#163300] text-[#163300] hover:text-[#DCFF85] flex items-center justify-center transition-all"
                    aria-label="Facebook Page"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="https://www.instagram.com/jitksahabd/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#163300]/5 hover:bg-[#163300] text-[#163300] hover:text-[#DCFF85] flex items-center justify-center transition-all"
                    aria-label="Instagram Profile"
                  >
                    <Instagram size={16} />
                  </a>
                </div>
              </div>
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
