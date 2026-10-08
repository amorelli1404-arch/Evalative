"use client";

import { Protect } from "@clerk/nextjs";
import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import PremiumDashboard from "../../components/dashboard/PremiumDashboard";
import PlanGate from "../../components/dashboard/PlanGate";
import { COLORS } from "../../lib/design-tokens";

/**
 * app/dashboard/page.tsx
 *
 * The one place subscribers are sent: the header's Dashboard link and the
 * post-checkout redirect both land here. Max subscribers get the Max
 * dashboard, Pro subscribers the Pro one, and everyone else is pointed at
 * the pricing page.
 */
export default function DashboardPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header alwaysSolid />
      <div style={{ height: "80px" }} />
      <Protect
        condition={(has) => has({ plan: "max" })}
        fallback={
          <PlanGate condition={(has) => has({ plan: "pro" })} planLabel="Pro">
            <PremiumDashboard tier="pro" />
          </PlanGate>
        }
      >
        <PremiumDashboard tier="max" />
      </Protect>
      <Footer />
    </main>
  );
}
