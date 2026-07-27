"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

export default function ReportExport() {
  const [zillowUrl, setZillowUrl] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handlePrint = () => window.print();

  return (
    <div className="flex flex-col gap-8">
      <style jsx global>{`
        @media print {
          header, nav, footer, .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>

      <div>
        <h3 className="text-lg mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          Export formal report
        </h3>
        <p className="text-sm mb-4" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Formats your verdict, financial modeling, and comps into a clean layout for co-buyers, partners, or lenders.
        </p>
        <button
          onClick={handlePrint}
          className="px-6 py-3 rounded-sm text-sm font-medium"
          style={{ fontFamily: FONT_FAMILY.body, backgroundColor: COLORS.ink, color: "#FFFFFF" }}
        >
          Export Formal Evaluation Report
        </button>
        <p className="text-xs mt-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Opens your browser's print dialog — choose "Save as PDF" as the destination.
        </p>
      </div>

      <div>
        <h3 className="text-lg mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          Data integrations
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
            <label className="block text-xs uppercase tracking-wide mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              Import from Zillow / Redfin URL
            </label>
            <div className="flex gap-2">
              <input
                value={zillowUrl}
                onChange={(e) => setZillowUrl(e.target.value)}
                placeholder="https://www.zillow.com/homedetails/..."
                className="flex-1 px-3 py-2 text-sm rounded-sm border"
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
          </div>

          <div className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
            <label className="block text-xs uppercase tracking-wide mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              Upload property documents
            </label>
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
          </div>
        </div>
      </div>
    </div>
  );
}
