"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  label: string;
  sublabel?: string;
  badge?: string;
  primaryColor?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2.0,
  label,
  sublabel,
  badge,
  primaryColor = "#1E3A8A",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        if (decimals > 0) {
          setDisplayValue(latest.toFixed(decimals));
        } else {
          setDisplayValue(Math.floor(latest).toLocaleString());
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, decimals, duration]);

  return (
    <div
      ref={ref}
      className="group relative bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-900/90 hover:shadow-xl text-center flex flex-col justify-between"
    >
      {badge && (
        <div className="mb-3 flex justify-center">
          <span
            className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border"
            style={{
              color: primaryColor === "#1E3A8A" ? "#93C5FD" : primaryColor,
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}15`,
            }}
          >
            {badge}
          </span>
        </div>
      )}

      <div>
        <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-2 flex items-center justify-center">
          <span>{prefix}</span>
          <span className="tabular-nums">{displayValue}</span>
          <span>{suffix}</span>
        </div>

        <div className="text-sm font-semibold text-slate-200 tracking-wide uppercase font-mono mb-1">
          {label}
        </div>

        {sublabel && (
          <div className="text-xs text-slate-400 font-normal leading-relaxed">
            {sublabel}
          </div>
        )}
      </div>

      <div
        className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
        <span>Verified Registry Data</span>
      </div>
    </div>
  );
}

export default AnimatedCounter;
