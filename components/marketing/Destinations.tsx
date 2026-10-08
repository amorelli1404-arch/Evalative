"use client";

import { FONT_FAMILY } from "../../lib/design-tokens";

interface Destination {
  imageUrl: string;
  imageAlt: string;
  label: string;
}

const DESTINATIONS: Destination[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1611005813863-6c1bc3d3908b?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Downtown Austin, TX skyline",
    label: "Austin, TX",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1714199523604-f4f01ae8e0ec?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "A tree-lined suburban street",
    label: "Suburban Markets",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1755103114153-eb0a66e3725a?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "A modern apartment building",
    label: "Growing Cities",
  },
];

export default function Destinations() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-wide block mb-2" style={{ fontFamily: FONT_FAMILY.body, color: "#D4AF37", letterSpacing: "0.1em" }}>
          Coverage
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "32px", fontWeight: 600, color: "#1A1A1A" }}>
          Markets we evaluate in
        </h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {DESTINATIONS.map((d) => (
          <div key={d.label} className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "3 / 4" }}>
            <img src={d.imageUrl} alt={d.imageAlt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)" }} />
            <div className="absolute inset-0 flex items-end justify-center pb-6">
              <span
                className="text-xl font-semibold"
                style={{ fontFamily: FONT_FAMILY.body, color: "#FFFFFF", letterSpacing: "0.03em" }}
              >
                {d.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
