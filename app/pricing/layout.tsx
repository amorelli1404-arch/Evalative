import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  alternates: { canonical: "/pricing" },
  description: "Start free with three evaluations, or see what the Pro and Max plans unlock.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
