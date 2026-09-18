import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/site/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jit Kumar Saha — Business Consultant, Head of Product, AI Strategist" },
      {
        name: "description",
        content:
          "Building businesses through strategy, products & AI. Jit Kumar Saha is a Business Consultant, Head of Product and AI Strategist helping organizations scale through innovation and digital transformation.",
      },
      {
        property: "og:title",
        content: "Jit Kumar Saha — Business Leader, Product Executive, AI Strategist",
      },
      {
        property: "og:description",
        content:
          "Business consulting, product leadership and AI transformation for modern organizations.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
