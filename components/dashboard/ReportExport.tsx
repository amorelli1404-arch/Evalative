"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { Eyebrow, Panel, SectionTitle } from "./ui";
import type { PanelProps } from "./PremiumDashboard";

export default function ReportExport({ onExport }: PanelProps) {
  const [listingUrl, setListingUrl] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionTitle className="mb-3">Export formal report</SectionTitle>
        <p className="text-sm mb-4" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Prints the Overview — every verdict plus the numbers behind them — in a clean layout for co-buyers,
          partners, or lenders.
        </p>
        <button
          onClick={onExport}
          className="px-6 py-3 rounded-sm text-sm font-medium"
          style={{ fontFamily: FONT_FAMILY.body, backgroundColor: COLORS.ink, color: "#FFFFFF" }}
        >
          Export Formal Evaluation Report
        </button>
        <p className="text-xs mt-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Opens your browser&apos;s print dialog — choose &quot;Save as PDF&quot; as the destination.
        </p>
      </div>

      <div>
        <SectionTitle className="mb-3">Data integrations</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          <Panel padding="p-4">
            <Eyebrow>Import from Zillow / Redfin URL</Eyebrow>
            <div className="flex gap-2">
              <input
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="https://www.zillow.com/homedetails/..."
                className="flex-1 min-w-0 px-3 py-2 text-sm rounded-sm border"
                style={{ borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.body }}
              />
              <button
                disabled
                title="Not yet connected — requires a backend listing-import integration"
                className="px-4 py-2 text-sm rounded-sm"
                style={{ backgroundColor: COLORS.hairline, color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body, cursor: "not-allowed" }}
              >
                Import
              </button>
            </div>
            <p className="text-xs mt-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              Coming soon. For now, enter the listing&apos;s numbers on the Overview tab.
            </p>
          </Panel>

          <Panel padding="p-4">
            <Eyebrow>Upload property documents</Eyebrow>
            <input
              type="file"
              onChange={(e) => setUploadedFileName(e.target.files?.[0]?.name ?? null)}
              className="w-full text-sm"
              style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}
            />
            {uploadedFileName && (
              <p className="text-xs mt-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                Selected: {uploadedFileName} (not yet processed — storage/parsing backend not connected)
              </p>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
