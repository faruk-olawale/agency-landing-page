"use client";

import React, { useState } from "react";
import { ArrowRight, Phone, CheckCircle2, Clock, MapPin, Key } from "lucide-react";

interface QuickFleetBookingCloseProps {
  companyName: string;
  city: string;
  phone: string;
  cleanPhone: string;
  primaryColor?: string;
}

export function QuickFleetBookingClose({
  companyName,
  city,
  phone,
  cleanPhone,
  primaryColor = "#0A997D",
}: QuickFleetBookingCloseProps) {
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
            Reserve your bay before triage fills.
          </h2>

          <p className="text-base text-white/75 leading-relaxed mt-5 max-w-[44ch]">
            We accept a strictly limited number of vehicles per day to maintain zero-delay
            diagnostic standards. Enter your details below or call our direct bay dispatch line.
          </p>

          {submitted ? (
            <div className="mt-8 p-6 rounded-2xl bg-[#0A997D]/20 border border-[#0A997D]/40 text-white font-mono text-xs">
              <div className="flex items-center gap-2 text-[#6FD9C1] text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#6FD9C1]" />
                <span>Bay Intake Reserved for {vehicleModel || "Your Vehicle"}</span>
              </div>
              <p className="mt-2 text-slate-300">
                Service Advisor Marcus has logged your priority intake request. We will contact{" "}
                <span className="text-white font-bold">{clientPhone}</span> within 10 minutes to
                confirm drop-off bay assignment.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>INTAKE SLA: &lt; 10 MINS</span>
                <span>STATUS: QUEUED IN BAY 2</span>
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
                  type="text"
                  required
                  placeholder="e.g. 2022 Porsche Macan or BMW M3"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-sans focus:outline-none focus:border-[#6FD9C1] transition-colors placeholder:text-slate-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="qf-control qf-control--teal text-sm font-semibold justify-center flex-1"
                >
                  <span>Confirm Bay Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${cleanPhone}`}
                  className="qf-control qf-control--ghost-dark text-xs sm:text-sm font-mono justify-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#6FD9C1]" />
                  <span>Call Bay Desk: {phone}</span>
                </a>
              </div>

              <div className="text-[11px] font-mono text-slate-400 pt-1">
                Zero obligation · Immediate technician response within 10 minutes.
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
                {city} Diagnostic Hub
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A997D]/20 text-[#6FD9C1] text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6FD9C1] animate-pulse" />
                2 BAYS READY TODAY
              </span>
            </div>
            <div className="text-base font-bold text-white font-sans mt-2">
              {companyName} Central Facility
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#6FD9C1]" />
              <span>Serving {city} &amp; surrounding 35-mile metro radius</span>
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
                <span className="text-white font-bold">7:00 AM – 6:30 PM</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5">
                <span className="text-slate-400 block text-[10px]">SATURDAY</span>
                <span className="text-white font-bold">8:00 AM – 3:00 PM</span>
              </div>
            </div>
          </div>

          {/* 24/7 Key Drop Locker */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Key className="w-4 h-4 text-[#6FD9C1] shrink-0 mt-0.5" />
            <div className="text-[11px]">
              <strong className="text-white block font-sans">24/7 Secure Digital Key Locker:</strong>
              Drop off before work or overnight. Digital touch keypad sends receipt timestamp
              straight to your SMS.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
