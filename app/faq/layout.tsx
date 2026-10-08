import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  alternates: { canonical: "/faq" },
  description: "Answers about how Evalative works, what the plans include, cancellation and refunds.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
