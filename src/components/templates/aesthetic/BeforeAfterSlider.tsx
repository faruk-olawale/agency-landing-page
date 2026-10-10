"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, ArrowLeftRight, CheckCircle2, Eye } from "lucide-react";

export interface TransformationItem {
  id: string;
  title: string;
  subtitle: string;
  beforeImg: string;
  afterImg: string;
  duration: string;
  downtime: string;
  patientReview: string;
  author: string;
  tags: string[];
}

interface BeforeAfterSliderProps {
  transformation: TransformationItem;
  primaryColor?: string;
  onBookNow?: () => void;
}

export function BeforeAfterSlider({
  transformation,
  primaryColor = "#BE185D",
  onBookNow,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/80 p-6 sm:p-10 max-w-5xl mx-auto">
      {/* ── Case Header ─────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
              style={{
                color: primaryColor,
                borderColor: `${primaryColor}30`,
                backgroundColor: `${primaryColor}10`,
              }}
            >
              Unretouched Clinical Result
            </span>
            <span className="text-xs font-mono text-slate-400">
              ID: {transformation.id}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-sans font-medium text-slate-950">
            {transformation.title}
          </h3>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mt-0.5">
            {transformation.subtitle}
          </p>
        </div>

        {/* Clinical Specs */}
        <div className="flex items-center gap-2.5 text-xs font-mono text-slate-600 shrink-0">
          <span className="bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 font-medium">
            Procedure: {transformation.duration}
          </span>
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-semibold">
            {transformation.downtime}
          </span>
        </div>
      </div>

      {/* ── Interactive Before & After Slider Canvas ────────────────────── */}
      <div className="relative mb-6">
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[520px] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-inner border border-slate-200"
        >
          {/* AFTER Image (Full background layer) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${transformation.afterImg}')` }}
          />

          {/* BEFORE Image (Clipped overlay layer) */}
          <div
            className="absolute inset-0 bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage: `url('${transformation.beforeImg}')`,
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          />

          {/* Floating Pill Badges */}
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none">
            Before
          </div>
          <div
            className="absolute top-4 right-4 text-white text-[11px] font-mono uppercase tracking-widest font-bold px-3.5 py-1 rounded-full shadow-lg pointer-events-none flex items-center gap-1"
            style={{ backgroundColor: primaryColor }}
          >
            <Sparkles className="w-3 h-3" />
            <span>After Treatment</span>
          </div>

          {/* Interactive Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Draggable Center Button Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-slate-800 shadow-2xl border-2 border-slate-200 flex items-center justify-center pointer-events-auto transition-transform hover:scale-110 active:scale-95"
            >
              <ArrowLeftRight className="w-4 h-4 text-slate-600" />
            </div>
          </div>
        </div>

        {/* Quick Position Preset Controls */}
        <div className="flex items-center justify-between mt-3 px-1 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Drag handle left or right to compare</span>
            <span className="sm:hidden">Drag slider</span>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSliderPosition(100)}
              className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                sliderPosition === 100
                  ? "bg-slate-900 text-white font-bold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              100% Before
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                sliderPosition === 50
                  ? "bg-slate-900 text-white font-bold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              50/50 Split
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(0)}
              className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                sliderPosition === 0
                  ? "bg-slate-900 text-white font-bold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              100% After
            </button>
          </div>
        </div>
      </div>

      {/* ── Patient Review & Action Strip ───────────────────────────────── */}
      <div className="bg-slate-50/90 border border-slate-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <p className="text-sm sm:text-base italic text-slate-700 leading-relaxed">
            {transformation.patientReview}
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-slate-900">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{transformation.author}</span>
          </div>
        </div>

        {onBookNow && (
          <button
            type="button"
            onClick={onBookNow}
            className="shrink-0 text-xs sm:text-sm font-semibold px-6 py-3 rounded-full text-white shadow-lg transition-all duration-200 hover:opacity-95 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Inquire For This Outcome
          </button>
        )}
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
