"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Sparkles,
  Check,
  X,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

interface LuxuryBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  city: string;
  primaryColor?: string;
  isMedSpa?: boolean;
}

export function LuxuryBookingModal({
  isOpen,
  onClose,
  companyName,
  city,
  primaryColor = "#BE185D",
  isMedSpa = false,
}: LuxuryBookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [passRef, setPassRef] = useState("VIP-4821");
  const [formData, setFormData] = useState({
    treatment: isMedSpa ? "Lip & Facial Sculpting" : "Porcelain Veneer Consultation",
    clinician: "Lead Clinical Director",
    date: "",
    timeSlot: "Morning (10:00 AM)",
    fullName: "",
    phone: "",
    email: "",
    amenity: "Aromatherapy & Noise-Cancelling Headphones",
  });

  const treatments = isMedSpa
    ? [
        {
          name: "Lip & Facial Dermal Sculpting",
          duration: "45 min",
          desc: "Subtle volume restoration and contour balancing",
        },
        {
          name: "HydraFacial Deluxe + Lymphatic Glow",
          duration: "60 min",
          desc: "Deep vacuum extraction, exfoliation & antioxidant infusion",
        },
        {
          name: "Morpheus8 RF Microneedling",
          duration: "75 min",
          desc: "Collagen synthesis and fractional tissue remodeling",
        },
        {
          name: "Neurotoxin Wrinkle Smoothing (Botox/Dysport)",
          duration: "30 min",
          desc: "Targeted smoothing of forehead and crow's feet lines",
        },
      ]
    : [
        {
          name: "Porcelain Veneer Smile Design",
          duration: "60 min",
          desc: "Handcrafted 3D smile mapping & shade visualization",
        },
        {
          name: "In-Office LED Laser Whitening",
          duration: "45 min",
          desc: "Up to 8 shades whiter with zero enamel sensitivity",
        },
        {
          name: "Clear Aligner Digital 3D Scan",
          duration: "30 min",
          desc: "Itero digital scan (no goop) & alignment simulation",
        },
        {
          name: "Comprehensive Spa Hygiene & Polish",
          duration: "60 min",
          desc: "Ultrasonic cleaning, enamel remineralization & polish",
        },
      ];

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setPassRef(`VIP-${Math.floor(1000 + Math.random() * 9000)}`);
    setStep(3); // Confirmation step
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative text-slate-900 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── Step 1: Treatment Selection ─────────────────────────────── */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full mb-2">
                <Sparkles className="w-3 h-3 text-rose-500" />
                <span>Step 1 of 2 • Treatment Selection</span>
              </div>
              <h3 className="text-2xl font-sans font-normal text-slate-950">
                Reserve Your VIP Consultation
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your desired aesthetic transformation to view private suite availability.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {treatments.map((t, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({ ...formData, treatment: t.name })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    formData.treatment === t.name
                      ? "border-rose-500 bg-rose-50/40 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{t.desc}</div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-[11px] font-mono text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      {t.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full inline-flex items-center justify-center gap-2 text-white font-medium py-3.5 px-6 rounded-full text-sm shadow-md transition-all hover:opacity-95 active:scale-95 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <span>Continue to Time & Patient Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Step 2: Date, Time & Patient Contact ────────────────────── */}
        {step === 2 && (
          <form onSubmit={handleFinish}>
            <div className="mb-6">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 mb-3 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Treatments</span>
              </button>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full mb-2">
                <Clock className="w-3 h-3 text-rose-500" />
                <span>Step 2 of 2 • Suite Booking</span>
              </div>
              <h3 className="text-2xl font-sans font-normal text-slate-950">
                Confirm Arrival Details
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Selected: <strong className="text-slate-800">{formData.treatment}</strong>
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Window
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option>Morning (9:30 AM - 12:00 PM)</option>
                    <option>Early Afternoon (12:30 PM - 3:00 PM)</option>
                    <option>Late Afternoon (3:30 PM - 6:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Legal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Phone (For SMS) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 019-2831"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@luxury.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  VIP Suite Amenity Preference
                </label>
                <select
                  value={formData.amenity}
                  onChange={(e) => setFormData({ ...formData, amenity: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option>Aromatherapy & Noise-Cancelling Headphones</option>
                  <option>Zero-Anxiety Warm Blanket & Calming Tea</option>
                  <option>Fast Express Protocol (In & Out in 30 Min)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 text-white font-medium py-3.5 px-6 rounded-full text-sm shadow-md transition-all hover:opacity-95 active:scale-95 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm VIP Consultation Request</span>
            </button>

            <p className="text-[11px] text-center text-slate-400 mt-2">
              Zero upfront payment. Private clinical suite reserved upon SMS confirmation.
            </p>
          </form>
        )}

        {/* ── Step 3: Success Confirmation State ──────────────────────── */}
        {step === 3 && (
          <div className="py-6 text-center space-y-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-rose-900/10"
              style={{ backgroundColor: primaryColor }}
            >
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 block mb-1">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-sans font-normal text-slate-950">
                Your Private Suite is Held
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pass Reference: {passRef}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Patient:</span>
                <span>{formData.fullName || "Valued Patient"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Treatment:</span>
                <span className="text-slate-900 font-medium">{formData.treatment}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Time Window:</span>
                <span>{formData.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Clinic Suite:</span>
                <span>{companyName} • {city}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Our clinical concierge has dispatched a confirmation SMS to{" "}
              <strong className="text-slate-700">{formData.phone || "your phone"}</strong>.
              Please reply YES to verify your arrival time.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default LuxuryBookingModal;
