"use client";

import React, { useState } from "react";
import { ArrowRight, Phone, CheckCircle2, Clock, MapPin, Key, Wrench } from "lucide-react";
import type { AutomotiveTruth } from "@/lib/automotiveTruth";

interface QuickFleetBookingCloseProps {
  companyName?: string;
  city?: string;
  phone?: string;
  cleanPhone?: string;
  primaryColor?: string;
  truth?: AutomotiveTruth;
}

export function QuickFleetBookingClose({
  companyName: propCompanyName = "Independent Diagnostic Specialist",
  city: propCity,
  phone: propPhone,
  cleanPhone: propCleanPhone,
  truth,
}: QuickFleetBookingCloseProps) {
  const companyName = truth?.companyName || propCompanyName;
  const hasCity = truth ? truth.hasCity : Boolean(propCity);
  const city = truth?.city || propCity;
  const hasPhone = truth ? truth.hasPhone : Boolean(propCleanPhone && propCleanPhone.length >= 7);
  const phone = truth?.phone || propPhone;
  const cleanPhone = truth?.cleanPhone || propCleanPhone;

  const [vehicleIssue, setVehicleIssue] = useState("Check Engine / Drivetrain Fault");
  const [clientPhone, setClientPhone] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="book-intake" className="qf-close">
      <div className="qf-close__grid">
        {/* Left Column: Instant Bay Intake Form */}
        <div>
          <span className="qf-eyebrow text-[#6FD9C1]">
            <i className="border-[#6FD9C1]">08</i>
            <span className="text-[#6FD9C1]">Intake &amp; Scheduling</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-[-0.028em] mt-5 leading-tight max-w-[14ch]">
            Request priority diagnostic intake.
          </h2>

          <p className="text-base text-white/75 leading-relaxed mt-5 max-w-[44ch]">
            We accept a managed volume of vehicles per day to maintain zero-delay
            diagnostic standards. Enter your details below to request a diagnostic intake slot
            or call our direct service desk.
          </p>

          {submitted ? (
            <div
              id="booking-submitted-card"
              role="alert"
              className="mt-8 p-6 rounded-2xl bg-[#0A997D]/20 border border-[#0A997D]/40 text-white font-mono text-xs"
            >
              <div className="flex items-center gap-2 text-[#6FD9C1] text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#6FD9C1]" />
                <span>Prototype Demonstration Form Submitted</span>
              </div>
              <p className="mt-3 text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
                This is an interactive concept demonstration created by Speedcraft Studio. In an active production deployment, intake requests for{" "}
                <strong className="text-white">{vehicleModel || "your vehicle"}</strong> (symptom: {vehicleIssue}) route directly to {companyName}&apos;s service desk or shop management system.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-300">
                <span>WORKFLOW: INTERACTIVE PROTOTYPE DEMONSTRATION</span>
                <span className="text-[#6FD9C1]">NOTICE: NO APPOINTMENT REQUEST HAS BEEN TRANSMITTED TO {companyName.toUpperCase()}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-lg font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Vehicle Issue Dropdown */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase tracking-wider">
                    Primary Symptom
                  </label>
                  <select
                    id="intake-issue-select"
                    value={vehicleIssue}
                    onChange={(e) => setVehicleIssue(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-sans focus:outline-none focus:border-[#6FD9C1] transition-colors"
                  >
                    <option value="Check Engine / Drivetrain Fault" className="bg-[#0C0730] text-white">
                      Check Engine / Drivetrain Fault
                    </option>
                    <option value="Strange Noise / Vibration" className="bg-[#0C0730] text-white">
                      Strange Noise / Vibration
                    </option>
                    <option value="Transmission Slipping / Hard Shift" className="bg-[#0C0730] text-white">
                      Transmission / Gearbox Fault
                    </option>
                    <option value="Hunter 3D Alignment & ADAS" className="bg-[#0C0730] text-white">
                      Laser Alignment &amp; ADAS
                    </option>
                    <option value="Factory OEM Maintenance" className="bg-[#0C0730] text-white">
                      Factory OEM Scheduled Service
                    </option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase tracking-wider">
                    Direct Phone / Cell
                  </label>
                  <input
                    id="intake-phone-input"
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-[#6FD9C1] transition-colors placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Vehicle Year, Make, Model */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase tracking-wider">
                  Vehicle Year, Make &amp; Model
                </label>
                <input
                  id="intake-vehicle-input"
                  type="text"
                  required
                  placeholder="e.g. 2022 Porsche Macan or BMW M3"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-sans focus:outline-none focus:border-[#6FD9C1] transition-colors placeholder:text-slate-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col md:flex-row gap-3 w-full">
                <button
                  type="submit"
                  id="intake-submit-btn"
                  className="qf-control qf-control--teal text-sm font-semibold justify-center w-full md:w-auto md:flex-1 shrink-0"
                >
                  <span className="truncate">Submit Intake Request</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                {hasPhone ? (
                  <a
                    href={`tel:${cleanPhone}`}
                    id="intake-phone-btn"
                    className="qf-control qf-control--ghost-dark text-xs sm:text-sm font-mono justify-center w-full md:w-auto shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#6FD9C1] shrink-0" />
                    <span className="truncate">Call Bay Desk: {phone}</span>
                  </a>
                ) : (
                  <a
                    href="#facility"
                    className="qf-control qf-control--ghost-dark text-xs sm:text-sm font-mono justify-center w-full md:w-auto shrink-0"
                  >
                    <Wrench className="w-3.5 h-3.5 text-[#6FD9C1] shrink-0" />
                    <span className="truncate">View Diagnostic Bays</span>
                  </a>
                )}
              </div>

              <div className="text-[11px] font-mono text-slate-400 pt-1">
                Zero obligation · Service advisor contacts you to confirm scheduling.
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Workshop Bay Telemetry & Operations */}
        <div className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 font-mono text-xs text-slate-300 space-y-6">
          {/* Live Bay Status */}
          <div className="pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                {hasCity ? `${city} Diagnostic Hub` : "Diagnostic Hub"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A997D]/20 text-[#6FD9C1] text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6FD9C1] animate-pulse" />
                {truth ? truth.bays.bookingReadyBadge : "DIAGNOSTIC BAYS ACTIVE"}
              </span>
            </div>
            <div className="text-base font-bold text-white font-sans mt-2">
              {companyName} Central Facility
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#6FD9C1]" />
              <span>
                {hasCity
                  ? `Serving ${city} & surrounding metro radius`
                  : "Serving local drivers & surrounding metro radius"}
              </span>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-2">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#6FD9C1]" />
              <span>Hours of Diagnostic Operations</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5">
                <span className="text-slate-400 block text-[10px]">MON – FRI</span>
                <span className="text-white font-bold">
                  {truth?.isDemoMode ? "7:00 AM – 6:30 PM (Sample)" : "Standard Service Hours"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5">
                <span className="text-slate-400 block text-[10px]">{truth?.isDemoMode ? "SATURDAY" : "WEEKENDS"}</span>
                <span className="text-white font-bold">
                  {truth?.isDemoMode ? "8:00 AM – 3:00 PM (Sample)" : "By Appointment / Inquire"}
                </span>
              </div>
            </div>
          </div>

          {/* Key Drop & Vehicle Handover */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Key className="w-4 h-4 text-[#6FD9C1] shrink-0 mt-0.5" />
            <div className="text-[11px]">
              <strong className="text-white block font-sans">
                {truth?.isDemoMode ? "24/7 Secure Digital Key Locker (Sample Feature):" : "Early Drop-Off & Key Box Coordination:"}
              </strong>
              {truth?.isDemoMode
                ? "Drop off before work or overnight. Digital touch keypad sends receipt timestamp straight to your phone."
                : "Coordinate early morning or after-hours vehicle drop-off directly with the service desk upon submitting an intake request."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuickFleetBookingClose;
