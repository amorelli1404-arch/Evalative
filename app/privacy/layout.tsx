import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What information Evalative collects, how it is used, and the choices you have.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
