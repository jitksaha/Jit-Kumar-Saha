import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Linkedin, Mail, MessageCircle } from "lucide-react";
import { PortfolioShell, RevealBlock } from "@/components/site/PortfolioShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Jit Kumar Saha" },
      {
        name: "description",
        content: "Start a conversation with Jit Kumar Saha about strategy, product, or AI.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PortfolioShell page="contact">
      <section className="contact-page wrap">
        <div className="contact-status">
          <i /> AVAILABLE FOR SELECT COLLABORATIONS / 2026
        </div>
        <RevealBlock className="contact-page-title">
          <p>
            HAVE A CHALLENGE, AN IDEA,
            <br />
            OR A QUESTION WORTH EXPLORING?
          </p>
          <h1>
            Let’s make the
            <br />
            <em>next move count.</em>
          </h1>
        </RevealBlock>
        <div className="contact-grid">
          <RevealBlock className="contact-primary">
            <p>
              Tell me a little about what you are building, changing, or trying to understand. A
              useful conversation is always a good place to start.
            </p>
            <a href="mailto:mail.jitsaha@gmail.com">
              <span>
                <Mail /> Email me
              </span>
              <b>mail.jitsaha@gmail.com</b>
              <ArrowUpRight />
            </a>
          </RevealBlock>
          <RevealBlock className="contact-options">
            <a href="https://www.linkedin.com/in/jitksha" target="_blank" rel="noreferrer">
              <Linkedin />
              <span>
                <b>LinkedIn</b>Connect professionally
              </span>
              <ArrowUpRight />
            </a>
            <a href="https://wa.me/8801700000000" target="_blank" rel="noreferrer">
              <MessageCircle />
              <span>
                <b>WhatsApp</b>Start a quick conversation
              </span>
              <ArrowUpRight />
            </a>
          </RevealBlock>
        </div>
        <div className="contact-orbit" aria-hidden="true">
          <span>HELLO</span>
          <i />
          <i />
          <i />
          <b>✳</b>
        </div>
        <div className="contact-fineprint">
          <span>BASED IN BANGLADESH · WORKING GLOBALLY</span>
          <span>RESPONSE TIME: USUALLY WITHIN 48 HOURS</span>
        </div>
      </section>
    </PortfolioShell>
  );
}
