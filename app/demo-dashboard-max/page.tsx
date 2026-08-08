"use client";

import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import PremiumDashboard from "../../components/dashboard/PremiumDashboard";
import PlanGate from "../../components/dashboard/PlanGate";
import { COLORS } from "../../lib/design-tokens";

export default function DemoDashboardMaxPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header alwaysSolid />
      <div style={{ height: "80px" }} />
      <PlanGate when={(has) => has({ plan: "max" })} planLabel="Max">
        <PremiumDashboard tier="max" />
      </PlanGate>
      <Footer />
    </main>
  );
}
