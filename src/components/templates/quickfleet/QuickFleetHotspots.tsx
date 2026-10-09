"use client";

import React, { useState } from "react";
import Image from "next/image";

import type { AutomotiveTruth } from "@/lib/automotiveTruth";

interface QuickFleetHotspotsProps {
  city?: string;
  truth?: AutomotiveTruth;
}

interface Hotspot {
  id: string;
  title: string;
  detail: string;
  code: string;
  x: number; // percentage
  y: number; // percentage
}

const BAY_HOTSPOTS: Hotspot[] = [
  {
    id: "picoscope",
    title: "PicoScope 4425A Lab Scope",
    detail: "Captures sub-microsecond ignition, injector solenoid, and CAN-bus communication waveforms before parts are ordered.",
    code: "CAN-01 · 400MS/s",
    x: 24,
    y: 42,
  },
  {
    id: "oem-scan",
    title: "Factory OEM Scan Platforms",
    detail: "Dealer-level SCN coding, module adaptation, and factory software flashes for Porsche, BMW, Mercedes, Audi & Domestic fleets.",
    code: "ECU-MOD · DEALER SCN",
    x: 48,
    y: 32,
  },
  {
    id: "rotary-lift",
    title: "Hydraulic Alignment & Load Bay",
    detail: "10,000-lb asymmetric lift with 3D laser chassis alignment and active suspension geometry calibration.",
    code: "BAY-03 · 10K LIFT",
    x: 74,
    y: 52,
  },
  {
    id: "borescope",
    title: "4K Digital Inspection Cam",
    detail: "Sends irrevocable time-stamped video of cylinder walls, carbon buildup, and valve seats directly to the owner's phone.",
    code: "DVI-4K · CLOUD VIDEO",
    x: 36,
    y: 68,
  },
  {
    id: "evap-smoke",
    title: "Nitrogen Vapor EVAP & Smoke Rig",
    detail: "High-pressure leak isolation detecting microscopic vacuum, boost, and EVAP system leaks in under 12 minutes.",
    code: "EVAP-N2 · 12 MIN",
    x: 62,
    y: 72,
  },
];

const POWERTRAIN_HOTSPOTS: Hotspot[] = [
  {
    id: "fuel-rail",
    title: "High-Pressure Direct Injection",
    detail: "200-Bar common rail pressure sensor telemetry, pulse width analysis, and ultrasonic cleaning verification.",
    code: "GDI · 200 BAR",
    x: 32,
    y: 38,
  },
  {
    id: "turbo-actuator",
    title: "Turbocharger Wastegate & Boost",
    detail: "Electronic wastegate duty cycle measurement, boost pressure solenoid actuation, and charge pipe leak isolation.",
    code: "BOOST · 1.8 BAR",
    x: 55,
    y: 28,
  },
  {
    id: "cam-vvt",
    title: "Dual Vanos / VVT Timing Actuators",
    detail: "Camshaft angle correlation testing and solenoid oil-control valve flow verification under dynamic load.",
    code: "VVT · PHASE CORR",
    x: 70,
    y: 45,
  },
  {
    id: "hybrid-inverter",
    title: "Hybrid / EV High-Voltage Inverter",
    detail: "High-voltage insulation resistance testing, DC-DC converter telemetry, and battery pack cell balance audit.",
    code: "HV · 400V SAFETY",
    x: 28,
    y: 65,
  },
  {
    id: "fluid-analysis",
    title: "Spectrometric Fluid Telemetry",
    detail: "Laboratory refractive analysis of engine oil, transmission fluid, and coolant for premature bearing and clutch wear.",
    code: "FLUID · REFR-LAB",
    x: 64,
    y: 68,
  },
];

export function QuickFleetHotspots({ city: propCity, truth }: QuickFleetHotspotsProps) {
  const [activeView, setActiveView] = useState<"bay" | "powertrain">("bay");
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);

  const hasCity = truth ? truth.hasCity : Boolean(propCity);
  const city = truth?.city || propCity;

  const hotspots = activeView === "bay" ? BAY_HOTSPOTS : POWERTRAIN_HOTSPOTS;
  const currentSpotObj = hotspots.find((h) => h.id === selectedSpot) || hotspots[0];

  return (
    <section id="facility" className="qf-s02 py-16 sm:py-24">
      <div className="qf-s02__in">
        {/* Editorial Eyebrow */}
        <span className="qf-eyebrow">
          <i>01</i>
          <span>The Diagnostic Station &amp; Facility</span>
        </span>

        {/* Monumental Editorial Statement */}
        <h2 className="mt-4">The wrench is the easy part.</h2>

        {/* Lede & Philosophy */}
        <p className="qf-s02__lede">
          Finding the root cause in minutes with laboratory-grade oscilloscopes and OEM scan
          protocols is what sets us apart.
        </p>

        <p className="mt-3 text-base sm:text-[17px] text-[#0C0730]/70 leading-relaxed max-w-[64ch]">
          Dealerships often rely on the &ldquo;parts cannon&rdquo;—swapping expensive components until a
          warning light temporarily clears. In our {hasCity ? `${city} ` : ""}diagnostic bays, we capture live
          sensor waveforms and module communication at the nanosecond level before touching a single bolt.
        </p>

        {/* ──────────────────────────────────────────────────────────────────
            QUICKFLEET HOTSPOT EXPLORER (.hubfig)
        ────────────────────────────────────────────────────────────────── */}
        <figure className="hubfig" role="region" aria-label="Interactive diagnostic facility explorer">
          {/* Background Technical Visual */}
          <div className="hubfig__img">
            <Image
              src="/images/quickfleet_auto_facility.jpg"
              alt={`Precision Automotive Diagnostic Facility${hasCity ? ` in ${city}` : ""}`}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          <div className="hubfig__scrim" aria-hidden="true" />

          {/* Top Left Status Badge */}
          <div className="hubfig__title">
            <i aria-hidden="true" />
            <span>{activeView === "bay" ? "Bay 02 Diagnostic Station" : "Powertrain & Sensor Lab"}</span>
            <small>Live Calibration Active{hasCity ? ` · ${city}` : ""}</small>
          </div>

          {/* Top Right View Switcher Pill */}
          <div className="views" role="group" aria-label="Facility View Angle">
            <button
              type="button"
              aria-pressed={activeView === "bay"}
              onClick={() => {
                setActiveView("bay");
                setSelectedSpot(null);
              }}
            >
              Diagnostic Bays
            </button>
            <button
              type="button"
              aria-pressed={activeView === "powertrain"}
              onClick={() => {
                setActiveView("powertrain");
                setSelectedSpot(null);
              }}
            >
              Powertrain Lab
            </button>
          </div>

          {/* Interactive Pulsing Hotspot Pins */}
          <div className="spots">
            {hotspots.map((spot) => {
              const isOpen = selectedSpot === spot.id;
              return (
                <div
                  key={spot.id}
                  className={`spot ${isOpen ? "is-open" : ""}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onMouseEnter={() => setSelectedSpot(spot.id)}
                  onMouseLeave={() => setSelectedSpot(null)}
                >
                  <button
                    type="button"
                    className="spot__dot"
                    aria-label={spot.title}
                    onClick={() => setSelectedSpot(isOpen ? null : spot.id)}
                  />
                  <div className="spot__tip" role="tooltip">
                    <span>{spot.title}</span>
                    <small>{spot.detail}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </figure>

        {/* Mobile & Tablet Interactive Feature Chips */}
        <div className="mt-4 sm:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {hotspots.map((spot) => {
              const isActive = (selectedSpot || hotspots[0].id) === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setSelectedSpot(spot.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-[#0C0730] text-white border-[#0C0730]"
                      : "bg-white text-[#0C0730] border-gray-200"
                  }`}
                >
                  {spot.title}
                </button>
              );
            })}
          </div>

          {/* Active Feature Detail Sheet on Mobile */}
          <div className="mt-2.5 p-3.5 bg-white rounded-xl border border-gray-200 text-xs text-[#0C0730] shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-[#0C0730]">{currentSpotObj.title}</span>
              <span className="font-mono text-[10px] text-[#0A997D] font-semibold">{currentSpotObj.code}</span>
            </div>
            <p className="text-gray-600 leading-relaxed">{currentSpotObj.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuickFleetHotspots;
