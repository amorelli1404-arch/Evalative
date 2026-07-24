"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * components/marketing/PhotoCarousel.tsx
 *
 * Shared flowing-photo background used across Hero, FoundingOffer, the
 * About page hero, and NearbyMatchFeature -- crossfades between several
 * real licensed photos, pauses auto-advance for prefers-reduced-motion,
 * and always exposes manual dot controls regardless of motion settings.
 * Content (headline, copy, buttons) is passed as children and rendered
 * above the photo layer + dark gradient overlay.
 *
 * Every photo used with this component across the site is Unsplash
 * License (free for commercial use, no permission required) -- credit
 * each photo where its slide array is defined, not here.
 */

export interface CarouselSlide {
  url: string;
  alt: string;
}

interface PhotoCarouselProps {
  slides: CarouselSlide[];
  minHeight?: string;
  overlayStrength?: "light" | "medium" | "dark"; // controls gradient darkness for text legibility
  slideDurationMs?: number;
  children: ReactNode;
}

const OVERLAY_GRADIENTS: Record<NonNullable<PhotoCarouselProps["overlayStrength"]>, string> = {
  light: "linear-gradient(180deg, rgba(20,22,20,0.35) 0%, rgba(20,22,20,0.55) 100%)",
  medium: "linear-gradient(180deg, rgba(20,22,20,0.55) 0%, rgba(20,22,20,0.75) 100%)",
  dark: "linear-gradient(180deg, rgba(20,22,20,0.68) 0%, rgba(20,22,20,0.82) 100%)",
};

export default function PhotoCarousel({
  slides,
  minHeight = "640px",
  overlayStrength = "medium",
  slideDurationMs = 6000,
  children,
}: PhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, slideDurationMs);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, slides.length, slideDurationMs]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight }}>
      {slides.map((slide, i) => (
        <img
          key={slide.url}
          src={slide.url}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: prefersReducedMotion ? "none" : "opacity 1.2s ease-in-out",
          }}
        />
      ))}

      <div className="absolute inset-0" style={{ background: OVERLAY_GRADIENTS[overlayStrength] }} />

      <div className="relative z-10 w-full flex flex-col items-center">
        {children}

        {slides.length > 1 && (
          <div className="flex items-center gap-2 mt-8" role="tablist" aria-label="Image selector">
            {slides.map((slide, i) => (
              <button
                key={slide.url}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Show image ${i + 1} of ${slides.length}`}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: i === activeIndex ? "#F5F4EF" : "rgba(245,244,239,0.4)",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
