import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Why we built Evalative: a second opinion on property decisions from someone with no stake in the outcome.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
