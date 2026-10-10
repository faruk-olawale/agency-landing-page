"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Play, Pause, Check, ShieldAlert, Cpu, Activity, Zap, RefreshCw } from "lucide-react";

import type { AutomotiveTruth } from "@/lib/automotiveTruth";

interface QuickFleetStickyCardsProps {
  city?: string;
  primaryColor?: string;
  truth?: AutomotiveTruth;
}

export function QuickFleetStickyCards({
  city: propCity,
  primaryColor = "#0A997D",
  truth,
}: QuickFleetStickyCardsProps) {
  const hasCity = truth ? truth.hasCity : Boolean(propCity);
  const city = truth?.city || propCity;
  // Strictly enforce QuickFleet teal #0A997D and eliminate orange
  const safeColor =
    !primaryColor ||
    primaryColor.toLowerCase().includes("f97316") ||
    primaryColor.toLowerCase().includes("ea580c") ||
    primaryColor.toLowerCase().includes("d97706") ||
    primaryColor.toLowerCase().includes("orange")
      ? "#0A997D"
      : primaryColor;

  // Card 1: Dual Instrument Mode (Lab Scope vs Dealer OEM Suite)
  const [instrumentMode, setInstrumentMode] = useState<"scope" | "oem">("scope");
  const [selectedChannel, setSelectedChannel] = useState<"A" | "B" | "C" | "D">("A");
  const [timebase, setTimebase] = useState<"1ms" | "5ms" | "20ms">("1ms");
  const [isScopePaused, setIsScopePaused] = useState(false);
  const [voltageFlicker, setVoltageFlicker] = useState(4.98);
  const [freqFlicker, setFreqFlicker] = useState(1422);

  // Card 1 OEM Mode State
  const [selectedModule, setSelectedModule] = useState<"DME" | "TCU" | "DSC" | "CGW" | "BDC">("DME");
  const [actuatorTestStatus, setActuatorTestStatus] = useState<"idle" | "running" | "passed">("idle");
  const [actuatorDuty, setActuatorDuty] = useState(0);

  // Subtle telemetry jitter simulation to make the ADC readings feel 100% authentic
  useEffect(() => {
    if (isScopePaused) return;
    const interval = setInterval(() => {
      setVoltageFlicker(+(4.96 + Math.random() * 0.08).toFixed(2));
      setFreqFlicker(Math.floor(1418 + Math.random() * 8));
    }, 850);
    return () => clearInterval(interval);
  }, [isScopePaused]);

  // Bi-directional actuator test runner simulation
  const handleRunActuatorTest = () => {
    if (actuatorTestStatus === "running") return;
    setActuatorTestStatus("running");
    setActuatorDuty(0);

    let progress = 0;
    const testInterval = setInterval(() => {
      progress += 20;
      setActuatorDuty(progress);
      if (progress >= 100) {
        clearInterval(testInterval);
        setTimeout(() => {
          setActuatorTestStatus("passed");
        }, 400);
      }
    }, 350);
  };

  // Card 2: Bay selection for workshop map
  const [selectedBay, setSelectedBay] = useState<number>(1);

  // Card 3: DVI approval state
  const [dviApproved, setDviApproved] = useState(false);

  return (
    <section id="tooling" className="qf-cards-container">
      {/* ──────────────────────────────────────────────────────────────────
          CARD 01: THE PLATFORMS (Warm Sand Paper #F4F2ED)
      ────────────────────────────────────────────────────────────────── */}
      <article className="qf-card qf-card--1" data-card="1">
        <div className="qf-card__text">
          <span className="qf-eyebrow">
            <i>01</i>
            <span>Platforms</span>
          </span>
          <h3>Factory OEM Scan Platforms &amp; Lab Scopes</h3>
          <p>
            Built for modern European and precision domestic vehicles. We plug directly into
            factory CAN networks with PicoScope 4425A 4-channel oscilloscopes and dealer OEM suites
            (Porsche PIWIS, BMW ISTA, Audi ODIS). No guesswork, no speculative parts replacement.
          </p>

          {/* Interactive Dual-Mode Switcher */}
          <div className="mt-5 p-1 bg-[#0C0730]/5 rounded-full w-fit border border-[#0C0730]/10 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setInstrumentMode("scope")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                instrumentMode === "scope"
                  ? "bg-[#0C0730] text-white shadow-sm"
                  : "text-[#0C0730]/70 hover:text-[#0C0730]"
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#6FD9C1]" />
              <span>PicoScope 4425A Lab Scope</span>
            </button>
            <button
              type="button"
              onClick={() => setInstrumentMode("oem")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                instrumentMode === "oem"
                  ? "bg-[#0C0730] text-white shadow-sm"
                  : "text-[#0C0730]/70 hover:text-[#0C0730]"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#0A997D]" />
              <span>Dealer OEM Scan Suite</span>
            </button>
          </div>

          <ul className="qf-card__facts mt-5">
            <li>Direct CAN-bus &amp; LIN-bus waveform capture at 400 MS/s</li>
            <li>Bidirectional actuator testing &amp; solenoid pulse modulation</li>
            <li>Dealer-level SCN coding &amp; factory ECU module reprogramming</li>
          </ul>
        </div>

        {/* Right Visual: Interactive Lab Scope / OEM Telemetry Cockpit */}
        <div className="qf-card__vis bg-[#EAE7DF] border-l border-[rgba(12,7,48,0.06)]">
          <div className="w-full max-w-lg bg-[#0C0730] rounded-2xl p-5 text-white shadow-xl border border-white/10 font-mono text-xs">
            {/* ─────────────────────────────────────────────────────────────
                VIEW A: PICOSCOPE 4425A OSCILLOSCOPE
            ───────────────────────────────────────────────────────────── */}
            {instrumentMode === "scope" ? (
              <>
                {/* Top Toolbar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isScopePaused ? "bg-amber-400" : "bg-[#6FD9C1] animate-pulse"
                      }`}
                    />
                    <span className="font-bold text-[#6FD9C1]">
                      PICOSCOPE 4425A · {isScopePaused ? "FREEZE-FRAME FROZEN" : "LIVE CAPTURE"}
                    </span>
                  </div>

                  {/* Pause / Run Button & Timebase */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1 bg-white/5 rounded p-0.5 border border-white/10 text-[9.5px]">
                      {(["1ms", "5ms", "20ms"] as const).map((tb) => (
                        <button
                          key={tb}
                          type="button"
                          onClick={() => setTimebase(tb)}
                          className={`px-1.5 py-0.5 rounded ${
                            timebase === tb ? "bg-[#0A997D] text-white font-bold" : "text-white/60 hover:text-white"
                          }`}
                        >
                          {tb}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsScopePaused(!isScopePaused)}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-white flex items-center gap-1 border border-white/10 transition-colors"
                      title={isScopePaused ? "Resume live sweep" : "Freeze current waveform"}
                    >
                      {isScopePaused ? (
                        <>
                          <Play className="w-2.5 h-2.5 text-[#6FD9C1]" />
                          <span>Run</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-2.5 h-2.5 text-amber-400" />
                          <span>Hold</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 4 Diagnostic Channel Selector Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 my-3">
                  <button
                    type="button"
                    onClick={() => setSelectedChannel("A")}
                    className={`px-2 py-1.5 rounded-lg text-left transition-all border ${
                      selectedChannel === "A"
                        ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-[10px] font-bold">CH A: CKP CRANK</div>
                    <div className="text-[9px] opacity-80">5.0V Square · 60-2</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedChannel("B")}
                    className={`px-2 py-1.5 rounded-lg text-left transition-all border ${
                      selectedChannel === "B"
                        ? "bg-[#0A997D]/25 border-[#0A997D] text-[#6FD9C1]"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-[10px] font-bold">CH B: GDI INJECTOR</div>
                    <div className="text-[9px] opacity-80">65V Flyback Spike</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedChannel("C")}
                    className={`px-2 py-1.5 rounded-lg text-left transition-all border ${
                      selectedChannel === "C"
                        ? "bg-sky-500/20 border-sky-400 text-sky-300"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-[10px] font-bold">CH C: CAN-DIFF</div>
                    <div className="text-[9px] opacity-80">500k Bitstream</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedChannel("D")}
                    className={`px-2 py-1.5 rounded-lg text-left transition-all border ${
                      selectedChannel === "D"
                        ? "bg-purple-500/20 border-purple-400 text-purple-300"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-[10px] font-bold">CH D: TURBO PWM</div>
                    <div className="text-[9px] opacity-80">250Hz Duty Cycle</div>
                  </button>
                </div>

                {/* Animated Oscilloscope Screen with CRT Phosphor Glow & Sweep Beam */}
                <div className="scope-crt relative h-48 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-2">
                  {/* Scope Precision Grid */}
                  <div className="scope-grid" />

                  {/* Continuous Phosphor Sweep Beam */}
                  {!isScopePaused && <div className="scope-sweep" />}

                  {/* Dynamic Waveform SVG */}
                  <svg className="w-full h-full overflow-visible relative z-1" viewBox="0 0 400 120">
                    {/* CH A: Crankshaft Sensor Square Wave (with 60-2 missing tooth gap) */}
                    {selectedChannel === "A" && (
                      <path
                        d="M 0,70 L 15,70 L 15,25 L 30,25 L 30,70 L 45,70 L 45,25 L 60,25 L 60,70 L 75,70 L 75,25 L 90,25 L 90,70 L 105,70 L 105,25 L 120,25 L 120,70 L 150,70 L 150,25 L 165,25 L 165,70 L 180,70 L 180,25 L 195,25 L 195,70 L 210,70 L 210,25 L 225,25 L 225,70 L 240,70 L 240,25 L 255,25 L 255,70 L 270,70 L 270,25 L 285,25 L 285,70 L 320,70 L 320,25 L 335,25 L 335,70 L 350,70 L 350,25 L 365,25 L 365,70 L 380,70 L 380,25 L 400,25"
                        fill="none"
                        stroke="#FACC15"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isScopePaused ? "" : "scope-wave-flow"}
                        strokeDasharray="400"
                        style={{ filter: "drop-shadow(0 0 6px rgba(250, 204, 21, 0.45))" }}
                      />
                    )}

                    {/* CH B: GDI High Pressure Injector (Inductive peak-and-hold spike) */}
                    {selectedChannel === "B" && (
                      <path
                        d="M 0,85 L 25,85 L 30,10 L 36,55 L 75,55 L 78,85 L 135,85 L 140,10 L 146,55 L 185,55 L 188,85 L 245,85 L 250,10 L 256,55 L 295,55 L 298,85 L 355,85 L 360,10 L 366,55 L 400,55"
                        fill="none"
                        stroke="#6FD9C1"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isScopePaused ? "" : "scope-wave-flow"}
                        strokeDasharray="400"
                        style={{ filter: "drop-shadow(0 0 6px rgba(111, 217, 193, 0.5))" }}
                      />
                    )}

                    {/* CH C: High-Speed CAN-Bus Differential Bitstream */}
                    {selectedChannel === "C" && (
                      <path
                        d="M 0,60 L 20,60 L 25,30 L 45,30 L 50,60 L 75,60 L 80,30 L 110,30 L 115,60 L 135,60 L 140,30 L 155,30 L 160,60 L 190,60 L 195,30 L 225,30 L 230,60 L 260,60 L 265,30 L 295,30 L 300,60 L 330,60 L 335,30 L 365,30 L 370,60 L 400,60"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isScopePaused ? "" : "scope-wave-flow"}
                        strokeDasharray="400"
                        style={{ filter: "drop-shadow(0 0 6px rgba(56, 189, 248, 0.5))" }}
                      />
                    )}

                    {/* CH D: Turbo Wastegate PWM Solenoid */}
                    {selectedChannel === "D" && (
                      <path
                        d="M 0,75 L 10,75 L 10,20 L 45,20 L 45,75 L 60,75 L 60,20 L 95,20 L 95,75 L 110,75 L 110,20 L 145,20 L 145,75 L 160,75 L 160,20 L 195,20 L 195,75 L 210,75 L 210,20 L 245,20 L 245,75 L 260,75 L 260,20 L 295,20 L 295,75 L 310,75 L 310,20 L 345,20 L 345,75 L 360,75 L 360,20 L 395,20 L 395,75 L 400,75"
                        fill="none"
                        stroke="#C084FC"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isScopePaused ? "" : "scope-wave-flow"}
                        strokeDasharray="400"
                        style={{ filter: "drop-shadow(0 0 6px rgba(192, 132, 252, 0.5))" }}
                      />
                    )}
                  </svg>

                  {/* Live Voltage Indicator Overlay */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur border border-white/10 text-[10px] text-[#6FD9C1] font-bold z-20">
                    {selectedChannel === "A" && `${voltageFlicker} V PK-PK · ${freqFlicker} Hz (820 RPM)`}
                    {selectedChannel === "B" && "64.8 V PEAK · 1.42 ms PULSE WIDTH"}
                    {selectedChannel === "C" && "2.5V RECESS / 3.5V DOM · 0 BIT ERRORS"}
                    {selectedChannel === "D" && "88.2% PWM DUTY · 250.0 Hz"}
                  </div>

                  {/* Channel Tag Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9.5px] font-mono text-white/70 z-20">
                    {timebase} / DIV · TRIGGER: 2.50V RISING
                  </div>
                </div>

                {/* Bottom Telemetry Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-[10px] text-slate-300">
                  <div>
                    <span className="text-slate-500 block">CLOCK JITTER</span>
                    <span className="text-emerald-400 font-bold">&lt; 0.08 ns</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">HARMONIC NOISE</span>
                    <span className="text-[#6FD9C1] font-bold">&lt; 0.02% THD</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">BUFFER STATUS</span>
                    <span className="text-white font-bold">128M SAMPLES PASS</span>
                  </div>
                </div>
              </>
            ) : (
              /* ─────────────────────────────────────────────────────────────
                  VIEW B: DEALER OEM SCAN SUITE & TOPOLOGY
              ───────────────────────────────────────────────────────────── */
              <>
                {/* OEM Suite Top Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0A997D] animate-ping" />
                    <span className="font-bold text-[#6FD9C1]">
                      OEM TOPOLOGY &amp; SCN CODING
                    </span>
                  </div>
                  <span className="text-[10px] text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    DIAG PROTOCOL: UDS ISO-14229
                  </span>
                </div>

                {/* Vehicle Network Topology Bus */}
                <div className="my-3 p-3 rounded-xl bg-[#07041D] border border-white/10 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] text-white/50 mb-2 font-mono">
                    <span>CAN-BUS 500 KBPS TOPOLOGY</span>
                    <span className="text-[#6FD9C1]">ALL 5 NODES RESPONDING</span>
                  </div>

                  {/* Animated Central CAN-Bus Trunk Line */}
                  <div className="relative h-1 bg-white/15 my-4 rounded-full">
                    <div className="can-packet-dot" />
                  </div>

                  {/* Module Nodes */}
                  <div className="grid grid-cols-5 gap-1 text-center">
                    {(
                      [
                        { id: "CGW", name: "CGW", desc: "Gateway" },
                        { id: "DME", name: "DME", desc: "Engine" },
                        { id: "TCU", name: "TCU", desc: "Trans" },
                        { id: "DSC", name: "DSC", desc: "ABS/ESP" },
                        { id: "BDC", name: "BDC", desc: "Body" },
                      ] as const
                    ).map((mod) => (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => setSelectedModule(mod.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          selectedModule === mod.id
                            ? "bg-[#0A997D]/30 border-[#6FD9C1] text-white shadow-[0_0_12px_rgba(111,217,193,0.3)]"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <div className="text-[11px] font-bold flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6FD9C1]" />
                          <span>{mod.name}</span>
                        </div>
                        <div className="text-[8.5px] text-white/50 mt-0.5">{mod.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Selected Module Detail Banner */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10.5px]">
                    <span className="text-white/60">
                      Active Node: <strong className="text-white">{selectedModule}</strong>
                    </span>
                    <span className="text-[#6FD9C1] font-bold">
                      {selectedModule === "DME" && "0 DTCs · Bosch MG1 · SCN 0x9A4F"}
                      {selectedModule === "TCU" && "Adaptations OK · ZF 8HP"}
                      {selectedModule === "DSC" && "Hydraulic Pre-charge: 0.0 Bar"}
                      {selectedModule === "CGW" && "Packet Integrity 100%"}
                      {selectedModule === "BDC" && "Sleep Draw: 12 mA (Normal)"}
                    </span>
                  </div>
                </div>

                {/* Bi-Directional Actuator Test Interactive Box */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-white">
                        Bi-Directional Component Actuation Test
                      </div>
                      <div className="text-[9.5px] text-white/50">
                        Target: Turbo Wastegate Solenoid (PWM Valve)
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRunActuatorTest}
                      disabled={actuatorTestStatus === "running"}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                        actuatorTestStatus === "running"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-400 cursor-not-allowed"
                          : actuatorTestStatus === "passed"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400"
                          : "bg-[#0A997D] text-white hover:bg-[#088069]"
                      }`}
                    >
                      {actuatorTestStatus === "running" ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>Testing...</span>
                        </>
                      ) : actuatorTestStatus === "passed" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Re-Test</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3 text-[#6FD9C1]" />
                          <span>Fire Actuator</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Actuator Meter Bar */}
                  <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10 mt-1">
                    <div
                      className="actuator-meter-bar h-full bg-gradient-to-r from-[#0A997D] to-[#6FD9C1] rounded-full"
                      style={{ width: `${actuatorDuty}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[9.5px] font-mono text-white/60">
                    <span>DUTY CYCLE: {actuatorDuty}%</span>
                    <span>
                      {actuatorTestStatus === "running" && "ACTUATING DISPLACEMENT..."}
                      {actuatorTestStatus === "passed" && (
                        <span className="text-[#6FD9C1] font-bold">12.4mm STROKE · VERIFIED PASSED</span>
                      )}
                      {actuatorTestStatus === "idle" && "READY TO EXECUTE"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </article>

      {/* ──────────────────────────────────────────────────────────────────
          CARD 02: THE BAYS (Crisp White #FFFFFF)
      ────────────────────────────────────────────────────────────────── */}
      <article className="qf-card qf-card--2" data-card="2">
        <div className="qf-card__text">
          <span className="qf-eyebrow">
            <i>02</i>
            <span>Diagnostic Bays</span>
          </span>
          <h3>{truth?.isDemoMode ? "Four Dedicated Triage & Calibration Bays (Demo Model)" : "Dedicated Triage & Calibration Bays"}</h3>
          <p>
            Dedicated engineering bays equipped with laser alignment, ultrasonic
            parts cleaning, and calibrated digital torque tools. Each bay is assigned to one
            vehicle at a time with strict intake SLAs.
          </p>
          <ul className="qf-card__facts">
            <li>Zero bay double-booking or staged delays</li>
            <li>3D laser alignment &amp; ADAS radar calibration capability</li>
            <li>Assigned Master Diagnostic Specialist on duty</li>
          </ul>
        </div>

        {/* Right Visual: Interactive Workshop Bay Map */}
        <div className="qf-card__vis bg-[#F8F9FA] border-l border-[rgba(12,7,48,0.06)]">
          <div className="w-full max-w-lg bg-white rounded-2xl p-5 text-[#0C0730] shadow-lg border border-[rgba(12,7,48,0.08)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-mono text-xs">
              <span className="font-bold text-[#0C0730] uppercase tracking-wider">
                {truth ? truth.bays.matrixTitle : (hasCity ? `${city} Bay Dispatch Matrix` : "Diagnostic Bay Schedule")}
              </span>
              <span className="text-[10px] text-[#0A997D] font-bold">
                {truth ? truth.bays.statusSummary : "ACTIVE BAYS · ACCEPTING INTAKE"}
              </span>
            </div>

            {/* 4 Interactive Bays Grid */}
            <div className="grid grid-cols-2 gap-3 my-4">
              {[
                {
                  id: 1,
                  name: "Bay 1: Oscilloscope Triage",
                  vehicle: "2023 BMW M3 Comp",
                  status: "In Waveform Scan",
                  tech: truth?.isDemoMode ? "M. Vance (ASE L1) · Sample" : "Lead Scope Specialist",
                  tool: "PicoScope 4425A",
                },
                {
                  id: 2,
                  name: "Bay 2: Drivetrain Clean Room",
                  vehicle: "2022 Porsche Macan GTS",
                  status: "Valve Body Assembly",
                  tech: truth?.isDemoMode ? "J. Mercer (Porsche Cert) · Sample" : "Master Drivetrain Specialist",
                  tool: "Stahlwille Digital Torque",
                },
                {
                  id: 3,
                  name: "Bay 3: ADAS & 3D Alignment",
                  vehicle: "2021 Audi RS6 Avant",
                  status: "Radar Calibration",
                  tech: truth?.isDemoMode ? "S. Chen (ODIS Master) · Sample" : "ADAS Calibration Lead",
                  tool: "Hunter Hawkeye Elite",
                },
                {
                  id: 4,
                  name: "Bay 4: Express Handover",
                  vehicle: "2024 Mercedes C63 AMG",
                  status: "Road Test & QC Done",
                  tech: truth?.isDemoMode ? "K. Davis (Xentry Tech) · Sample" : "Quality Inspection Lead",
                  tool: "4-Digit Handover Code",
                },
              ].map((bay) => (
                <button
                  key={bay.id}
                  onClick={() => setSelectedBay(bay.id)}
                  className={`p-3 rounded-xl text-left transition-all border font-mono ${
                    selectedBay === bay.id
                      ? "bg-[#0C0730] text-white border-[#0C0730] shadow-md"
                      : "bg-[#F4F2ED] text-[#0C0730] border-transparent hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span>{bay.name.split(":")[0]}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selectedBay === bay.id ? "bg-[#6FD9C1]" : "bg-[#0A997D]"
                      }`}
                    />
                  </div>
                  <div className="text-[12px] font-sans font-bold mt-1 truncate">
                    {bay.vehicle}
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 truncate ${
                      selectedBay === bay.id ? "text-[#6FD9C1]" : "text-[#0A997D]"
                    }`}
                  >
                    {bay.status}
                  </div>
                </button>
              ))}
            </div>

            {/* Bay Detail Card */}
            <div className="p-3 bg-[#F4F2ED] rounded-xl text-xs font-mono border border-slate-200">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>BAY #{selectedBay} TELEMETRY</span>
                <span className="text-[#0A997D] font-bold">100% SPEC VERIFIED</span>
              </div>
              <div className="text-sm font-bold text-[#0C0730] mt-1">
                {selectedBay === 1 && (truth?.isDemoMode ? "Bay 1: Oscilloscope Triage — M. Vance (ASE L1 #4928) · Sample" : "Bay 1: Oscilloscope Triage — Lead Scope Specialist")}
                {selectedBay === 2 && (truth?.isDemoMode ? "Bay 2: Drivetrain Clean Room — J. Mercer (Factory Cert) · Sample" : "Bay 2: Drivetrain Clean Room — Master Drivetrain Specialist")}
                {selectedBay === 3 && (truth?.isDemoMode ? "Bay 3: ADAS & 3D Alignment — S. Chen (Hunter Master) · Sample" : "Bay 3: ADAS & 3D Alignment — ADAS Calibration Lead")}
                {selectedBay === 4 && (truth?.isDemoMode ? "Bay 4: Express Handover — K. Davis (Lead QA) · Sample" : "Bay 4: Express Handover — Quality Inspection Lead")}
              </div>
              <div className="text-[11px] text-slate-600 mt-1">
                Air quality index: &lt; 15 ppm · Torqued to ±0.5 Nm precision · Zero debris protocol.
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ──────────────────────────────────────────────────────────────────
          CARD 03: THE DIGITAL RECORD (Deep Midnight Ink #0C0730)
      ────────────────────────────────────────────────────────────────── */}
      <article className="qf-card qf-card--3" data-card="3">
        <div className="qf-card__text">
          <span className="qf-eyebrow text-[#6FD9C1]">
            <i className="border-[#6FD9C1]">03</i>
            <span className="text-[#6FD9C1]">Digital Inspection</span>
          </span>
          <h3 className="text-white">Irrevocable Digital Video Inspection (DVI)</h3>
          <p>
            From initial scan to final torque verification, every step is logged. You receive
            high-definition video inspection of every failing component before any wrench turns,
            and an irrevocable digital repair order.
          </p>
          <ul className="qf-card__facts text-white">
            <li>4K HD video walkthrough sent directly to your phone</li>
            <li>Transparent itemized labor &amp; OEM parts breakdown</li>
            <li>Irrevocable digital release record with 4-digit verification code</li>
          </ul>
        </div>

        {/* Right Visual: Interactive Mobile DVI Report Widget */}
        <div className="qf-card__vis bg-[#0A0726] border-l border-white/10">
          <div className="w-full max-w-sm bg-[#110C3B] rounded-3xl p-5 text-white shadow-2xl border border-white/15 font-sans">
            {/* Phone Screen Mockup Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#6FD9C1]" />
                <span className="text-white font-bold">DIGITAL DVI REPORT</span>
              </div>
              <span className="text-slate-400">RO-40912</span>
            </div>

            {/* Video Walkthrough Preview Card */}
            <div className="relative h-28 bg-[#1B144E] rounded-xl my-3 overflow-hidden border border-white/10 flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white z-20 group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
              <div className="absolute bottom-2 left-2 z-20 font-mono text-[10px] text-slate-200">
                <span>Technician Walkthrough (01:42) · 4K HD</span>
              </div>
            </div>

            {/* Line Item Diagnostic Findings */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <div className="font-bold text-red-200">HPFP Fuel Sensor O-Ring</div>
                    <div className="text-[10px] font-mono text-red-300">0.42V Signal Drop · DTC P0087</div>
                  </div>
                </div>
                <span className="font-mono text-red-400 font-bold">$185.00</span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-emerald-200">Timing Chain Tension</div>
                    <div className="text-[10px] font-mono text-emerald-300">0.8° Deviation (Nominal &lt; 4°)</div>
                  </div>
                </div>
                <span className="font-mono text-emerald-400 font-bold">PASSED</span>
              </div>
            </div>

            {/* One-Tap SMS Approval Interaction */}
            <div className="mt-4 pt-3 border-t border-white/10">
              {dviApproved ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center font-mono text-xs text-emerald-300 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Approved via SMS · Tech Dispatched to Bay 2</span>
                </div>
              ) : (
                <button
                  onClick={() => setDviApproved(true)}
                  style={{ backgroundColor: safeColor }}
                  className="w-full py-2.5 rounded-xl hover:brightness-110 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Authorize Line Item ($185.00)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
