"use client";

import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import PremiumDashboard from "../../components/dashboard/PremiumDashboard";
import { COLORS } from "../../lib/design-tokens";

export default function DemoDashboardMaxPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header alwaysSolid />
      <div style={{ height: "80px" }} />
      <PremiumDashboard tier="max" />
      <Footer />
    </main>
  );
}
