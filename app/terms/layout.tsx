import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
  description: "The terms that apply when you use Evalative.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
