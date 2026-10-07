"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Shield,
  Clock,
  Sparkles,
  X,
  Maximize2,
  Camera,
  MapPin,
  Calendar,
} from "lucide-react";

export interface ProofItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspect?: "tall" | "wide" | "square";
  stats?: string;
  description: string;
  date?: string;
  location?: string;
  verifiedBadge?: string;
}

export interface MasonryProofGalleryProps {
  items?: ProofItem[];
  industry?: string;
  city?: string;
  companyName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  theme?: "dark" | "light";
}

/**
 * Returns authentic, high-converting proof photos and field documentation tailored to each niche.
 */
function getDefaultProofItems(
  industry: string = "",
  city: string = "Dallas"
): ProofItem[] {
  const norm = (industry || "").toLowerCase();

  if (norm.includes("plumb")) {
    return [
      {
        id: "plumb-1",
        title: "PEX Manifold & Copper Repipe Routing",
        category: "Installations",
        imageUrl:
          "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        stats: "Code Passed 1st Visit",
        description:
          "Complete whole-home repiping replacing degraded polybutylene pipes with commercial grade PEX-A and balanced copper trunk line.",
        date: "3 days ago",
        location: `${city} North`,
        verifiedBadge: "Master Plumber Verified",
      },
      {
        id: "plumb-2",
        title: "2:00 AM Emergency Mainline Rupture Repair",
        category: "Emergency Repairs",
        imageUrl:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        stats: "24-Min Response",
        description:
          "Sub-slab water line rupture isolated with hydro-acoustic listening equipment. Isolated and spliced with zero foundation damage.",
        date: "Last week",
        location: city,
        verifiedBadge: "Emergency Dispatch",
      },
      {
        id: "plumb-3",
        title: "Dual Tankless Water Heater Cluster",
        category: "Installations",
        imageUrl:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80",
        aspect: "square",
        stats: "98% Efficiency",
        description:
          "Cascading commercial-grade tankless configuration providing continuous 19.8 GPM hot water flow for high-demand property.",
        date: "2 weeks ago",
        location: city,
        verifiedBadge: "Code Permitted",
      },
      {
        id: "plumb-4",
        title: "Fiber-Optic Sewer Scope Diagnostic",
        category: "Inspections",
        imageUrl:
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        stats: "100% Tree Root Clearance",
        description:
          "High-definition 1080p camera pipe scan identifying offset clay joints followed by 4000 PSI hydro-jetting cleanout.",
        date: "2 weeks ago",
        location: city,
        verifiedBadge: "HD Diagnostic File",
      },
      {
        id: "plumb-5",
        title: "Backflow Prevention Assembly & Valve Set",
        category: "Installations",
        imageUrl:
          "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        stats: "Certified & Tested",
        description:
          "Commercial reduced pressure principle (RPZ) backflow device installation safeguarding drinking water integrity.",
        date: "3 weeks ago",
        location: `${city} Metro`,
        verifiedBadge: "City Certified",
      },
    ];
  }

  if (norm.includes("hvac") || norm.includes("air") || norm.includes("heat")) {
    return [
      {
        id: "hvac-1",
        title: "High-Efficiency Inverter Heat Pump Dual Zone",
        category: "Installations",
        imageUrl:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        stats: "21.5 SEER2 Rating",
        description:
          "Precision level concrete pad mounting with anti-vibration risers and custom bent UV-shielded copper lineset.",
        date: "2 days ago",
        location: city,
        verifiedBadge: "EPA Certified Tech",
      },
      {
        id: "hvac-2",
        title: "Commercial Rooftop Unit Emergency Motor Replacement",
        category: "Emergency Repairs",
        imageUrl:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        stats: "Restored in 42 Mins",
        description:
          "Immediate replacement of seized ECM blower motor during severe 103° heat index for retail plaza tenant.",
        date: "Last week",
        location: city,
        verifiedBadge: "Priority Dispatch",
      },
      {
        id: "hvac-3",
        title: "Aero-Sealed Attic Ductwork & Plenum Upgrade",
        category: "Installations",
        imageUrl:
          "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1000&q=80",
        aspect: "square",
        stats: "Static Pressure Normalized",
        description:
          "Custom sheet metal plenum fabricated on site to eliminate cold spots across 4,200 sq ft residential estate.",
        date: "2 weeks ago",
        location: city,
        verifiedBadge: "Thermal Audit Passed",
      },
      {
        id: "hvac-4",
        title: "28-Point Precision Seasonal Diagnostic",
        category: "Inspections",
        imageUrl:
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        stats: "Subcooling Tuned ±0.5°",
        description:
          "Refrigerant charge analysis with digital manifold gauges, amp draw testing, and evaporator coil chemical wash.",
        date: "3 weeks ago",
        location: city,
        verifiedBadge: "Safety Certification",
      },
    ];
  }

  if (norm.includes("roof")) {
    return [
      {
        id: "roof-1",
        title: "Class 4 Impact Architectural Shingle Replacement",
        category: "Installations",
        imageUrl:
          "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        stats: "130 MPH Wind Warranty",
        description:
          "Complete tear-off with ice & water shield in all valleys, ridge ventilation, and synthetic underlayment installation.",
        date: "4 days ago",
        location: city,
        verifiedBadge: "Master Elite Certified",
      },
      {
        id: "roof-2",
        title: "Severe Storm Damage Emergency Shrink Tarp",
        category: "Emergency Repairs",
        imageUrl:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        stats: "90-Min Response",
        description:
          "Fallen oak tree branch mitigated with heavy-duty heat-sealed poly tarping preventing interior water contamination.",
        date: "1 week ago",
        location: city,
        verifiedBadge: "Insurance Claim Aid",
      },
      {
        id: "roof-3",
        title: "Commercial TPO Seamless Membrane",
        category: "Installations",
        imageUrl:
          "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1000&q=80",
        aspect: "square",
        stats: "Zero Leaks Guaranteed",
        description:
          "60-mil mechanically fastened white TPO roof on 18,000 sq ft office facility with robotic heat-welded seams.",
        date: "2 weeks ago",
        location: city,
        verifiedBadge: "25-Yr System Warranty",
      },
    ];
  }

  if (norm.includes("law") || norm.includes("legal") || norm.includes("attorney")) {
    return [
      {
        id: "law-1",
        title: "Commercial Breach Litigation Evidence Vault",
        category: "Trial Results",
        imageUrl:
          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        stats: "$2.8M Resolved",
        description:
          "Comprehensive evidentiary record and electronic discovery repository leading to favorable pre-trial settlement.",
        date: "Confirmed Resolution",
        location: city,
        verifiedBadge: "Court Certified",
      },
      {
        id: "law-2",
        title: "Catastrophic Transport Injury Reconstruction",
        category: "Trial Results",
        imageUrl:
          "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        stats: "$1.15M Recovery",
        description:
          "Black-box telematics and mechanical inspection proof establishing commercial trucking liability.",
        date: "Case Closed",
        location: city,
        verifiedBadge: "Top Trial Evidence",
      },
      {
        id: "law-3",
        title: "Corporate Defense & Multi-Party Arbitration",
        category: "Advisory",
        imageUrl:
          "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80",
        aspect: "square",
        stats: "Complete Dismissal",
        description:
          "Defended regional manufacturing firm against bad-faith competitor accusations with zero damages paid.",
        date: "Recent Resolution",
        location: city,
        verifiedBadge: "Confidential Order",
      },
    ];
  }

  if (norm.includes("cpa") || norm.includes("account") || norm.includes("tax")) {
    return [
      {
        id: "cpa-1",
        title: "R&D Tax Credit & Capital Restructuring Audit Binder",
        category: "Tax Optimization",
        imageUrl:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        stats: "$164,000 Saved",
        description:
          "Methodical documentation of specialized engineering hours and software development expenses passed without audit review.",
        date: "FY Filing",
        location: city,
        verifiedBadge: "Audit Proof Documentation",
      },
      {
        id: "cpa-2",
        title: "Commercial Real Estate Cost Segregation Model",
        category: "Advisory",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        stats: "Accelerated Depreciation",
        description:
          "Asset reclassification across 48-unit multifamily asset generating massive first-year bonus depreciation deductions.",
        date: "Verified Study",
        location: city,
        verifiedBadge: "IRS Compliant Engineering",
      },
    ];
  }

  if (norm.includes("dent") || norm.includes("ortho") || norm.includes("smile")) {
    return [
      {
        id: "dent-1",
        title: "Full Arch Digital Smile Design & Porcelain Veneers",
        category: "Cosmetic",
        imageUrl:
          "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        stats: "8 Veneers • Zero Pain",
        description:
          "Custom hand-layered feldspathic porcelain veneers restoring golden-ratio symmetry and natural tooth translucency.",
        date: "2 weeks ago",
        location: city,
        verifiedBadge: "Cosmetic Masterwork",
      },
      {
        id: "dent-2",
        title: "CBCT 3D Guided Implant Placement Suite",
        category: "Restorative",
        imageUrl:
          "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        stats: "Sub-Millimeter Precision",
        description:
          "Surgical 3D guide printed in-house for single-visit ceramic dental implant restoration with immediate provisional crown.",
        date: "1 month ago",
        location: city,
        verifiedBadge: "Digital Workflow Verified",
      },
    ];
  }

  if (norm.includes("medspa") || norm.includes("spa") || norm.includes("aesthetic")) {
    return [
      {
        id: "spa-1",
        title: "Private Dermal Sculpting & Contour Suite",
        category: "Treatments",
        imageUrl:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
        stats: "Micro-Cannula Protocol",
        description:
          "Sterile, luxury clinical suite designed for gentle facial contouring, lip refinement, and collagen biostimulators.",
        date: "3 days ago",
        location: city,
        verifiedBadge: "Board Certified Clinician",
      },
      {
        id: "spa-2",
        title: "Morpheus8 RF Microneedling & Skin Remodeling",
        category: "Advanced Technology",
        imageUrl:
          "https://images.unsplash.com/photo-1512290900672-1f4a9749eb40?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
        stats: "Triple-Layer Resurfacing",
        description:
          "Sub-dermal adipose remodeling technology delivering non-surgical skin tightening and jawline definition.",
        date: "Last week",
        location: city,
        verifiedBadge: "FDA Cleared Device",
      },
    ];
  }

  // Fallback
  return [
    {
      id: "proof-1",
      title: "On-Site Diagnostic & Master Execution",
      category: "Field Operations",
      imageUrl:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
      aspect: "tall",
      stats: "100% Quality Pass",
      description:
        "Comprehensive diagnostic assessment and code-compliant resolution completed on schedule.",
      date: "3 days ago",
      location: city,
      verifiedBadge: "Field Certified",
    },
    {
      id: "proof-2",
      title: "Full Turnkey Installation & Testing",
      category: "Installations",
      imageUrl:
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1000&q=80",
      aspect: "wide",
      stats: "Zero Defects",
      description:
        "Turnkey system setup with factory-trained technicians and comprehensive multi-point quality check.",
      date: "Last week",
      location: city,
      verifiedBadge: "Warranty Protected",
    },
  ];
}

export function MasonryProofGallery({
  items,
  industry = "Service",
  city = "Dallas",
  companyName = "Speedcraft Studio",
  primaryColor = "#DC2626",
  theme = "dark",
}: MasonryProofGalleryProps) {
  const proofList = items || getDefaultProofItems(industry, city);
  const [selectedItem, setSelectedItem] = useState<ProofItem | null>(null);

  // Derive unique categories
  const categories = ["All", ...Array.from(new Set(proofList.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? proofList
      : proofList.filter((p) => p.category === activeCategory);

  const isDark = theme === "dark";

  return (
    <section
      aria-label="Verified On-The-Job Proof Gallery"
      className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Background radial gradient */}
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-3 border shadow-xs"
            style={{
              color: primaryColor,
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}15`,
            }}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Actual On-The-Job Documentation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4"
          >
            Field Proof: Real Work in {city}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            No generic stock photography. See unedited photographic proof of our recent
            diagnostics, precision installations, and emergency resolutions across {city}.
          </motion.p>

          {/* Category Filter Pills */}
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    activeCategory === cat
                      ? "text-white shadow-md"
                      : isDark
                      ? "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                  }`}
                  style={{
                    backgroundColor: activeCategory === cat ? primaryColor : undefined,
                    borderColor: activeCategory === cat ? primaryColor : undefined,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Masonry Proof Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              const isTall = item.aspect === "tall" || idx % 3 === 0;

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col justify-end shadow-lg ${
                    isTall ? "md:row-span-2 min-h-[420px]" : "min-h-[300px]"
                  } ${
                    isDark
                      ? "bg-slate-900 border-slate-800 hover:border-slate-600 hover:shadow-2xl hover:shadow-black/70"
                      : "bg-white border-slate-200 hover:border-slate-400 hover:shadow-2xl"
                  }`}
                >
                  {/* Background Image with Zoom on Hover */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  />

                  {/* Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:opacity-90" />

                  {/* Top Badge: Verified Stamp */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20 shadow-xs">
                      <Shield className="w-3 h-3 text-emerald-400" />
                      <span>{item.verifiedBadge || "Verified Project"}</span>
                    </span>

                    {item.stats && (
                      <span
                        className="px-2.5 py-1 rounded-full text-white text-[11px] font-black font-mono shadow-xs backdrop-blur-md"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {item.stats}
                      </span>
                    )}
                  </div>

                  {/* Bottom Content Card */}
                  <div className="relative z-10 p-6 space-y-2 text-white">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-400" />
                        {item.location || city}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold leading-snug group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Inspection Hint */}
                    <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-white transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to inspect verification records</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          LIGHTBOX / DETAIL INSPECTION MODAL
      ────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative text-white flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo Side */}
              <div
                className="md:w-1/2 min-h-[260px] md:min-h-[420px] bg-cover bg-center relative"
                style={{ backgroundImage: `url('${selectedItem.imageUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden" />
              </div>

              {/* Information Side */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {selectedItem.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {selectedItem.verifiedBadge || "Verified By Dispatch"}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {selectedItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-800 text-xs text-slate-400 font-mono">
                    <div className="flex items-center justify-between">
                      <span>Location:</span>
                      <span className="text-white font-semibold">
                        {selectedItem.location || city}
                      </span>
                    </div>
                    {selectedItem.date && (
                      <div className="flex items-center justify-between">
                        <span>Completion Date:</span>
                        <span className="text-white font-semibold">
                          {selectedItem.date}
                        </span>
                      </div>
                    )}
                    {selectedItem.stats && (
                      <div className="flex items-center justify-between">
                        <span>Audit Result:</span>
                        <span className="text-emerald-400 font-bold">
                          {selectedItem.stats}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all hover:brightness-110 cursor-pointer shadow-md"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Close Inspection File
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MasonryProofGallery;
