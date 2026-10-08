"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import PhotoCarousel, { type CarouselSlide } from "./PhotoCarousel";

/**
 * components/marketing/NearbyMatchFeature.tsx
 *
 * Showcase section for "Nearby Match" -- a Max-tier-exclusive feature
 * concept: surfacing comparable nearby properties (for sale or rent) that
 * match what the user is actually looking for, alongside their
 * evaluation. This is a MARKETING PREVIEW of the feature, not a wired-up
 * implementation -- no listings data source (MLS, Zillow-equivalent feed)
 * has been integrated in the backend yet. The three feature bullets below
 * describe the intended behavior; building it for real requires sourcing
 * an actual listings API, which is a separate, larger integration.
 */

const SLIDES: CarouselSlide[] = [
  // Photo credit: SnapSaga (@catauggie) on Unsplash
  { url: "https://images.unsplash.com/photo-1714199523604-f4f01ae8e0ec?auto=format&fit=crop&w=1800&q=80", alt: "A tree-lined residential street" },
  // Photo credit: Haberdoedas on Unsplash
  { url: "https://images.unsplash.com/photo-1755103114153-eb0a66e3725a?auto=format&fit=crop&w=1800&q=80", alt: "A modern apartment building" },
];

const FEATURES = [
  "See homes and apartments near you that match your budget and criteria",
  "Compare your property's value against similar nearby listings",
  "Get notified when a strong match appears in your area",
];

export default function NearbyMatchFeature({ onSeePricing }: { onSeePricing: () => void }) {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-14 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span
            className="text-xs uppercase tracking-wide px-2 py-1 rounded-sm inline-block mb-4"
            style={{ backgroundColor: COLORS.mossSoft, color: COLORS.moss, fontFamily: FONT_FAMILY.mono }}
          >
            Max exclusive
          </span>
          <h2
            className="text-2xl sm:text-3xl leading-tight mb-4"
            style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}
          >
            Nearby Match
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            See what else is out there. Nearby Match surfaces homes and apartments close to you that fit
            what you're actually looking for — so a sell, rent, or buy decision is never made in a vacuum.
          </p>
          <ul className="flex flex-col gap-3 mb-6">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                <span style={{ color: COLORS.moss }}>+</span>
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={onSeePricing}
            className="px-6 py-3 rounded-sm text-sm font-medium"
            style={{ backgroundColor: COLORS.ink, color: COLORS.paper, fontFamily: FONT_FAMILY.body }}
          >
            Unlock with Max
          </button>
        </div>

        <div className="rounded-sm overflow-hidden" style={{ border: `1px solid ${COLORS.hairline}` }}>
          <PhotoCarousel slides={SLIDES} minHeight="360px" overlayStrength="light" slideDurationMs={5000} sizes="(min-width: 768px) 50vw, 100vw">
            <div />
          </PhotoCarousel>
        </div>
      </div>
    </section>
  );
}
