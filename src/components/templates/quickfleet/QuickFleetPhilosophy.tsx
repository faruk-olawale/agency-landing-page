"use client";

import React from "react";

interface QuickFleetPhilosophyProps {
  city: string;
}

export function QuickFleetPhilosophy({ city }: QuickFleetPhilosophyProps) {
  return (
    <section id="facility" className="qf-s02">
      <div className="qf-s02__in">
        {/* Eyebrow */}
        <span className="qf-eyebrow">
          <i>01</i>
          <span>The Facility</span>
        </span>

        {/* Monumental Editorial Statement */}
        <h2>The wrench is the easy part.</h2>

        {/* Lede & Philosophy */}
        <p className="qf-s02__lede">
          Finding the root cause in minutes with laboratory-grade oscilloscopes and OEM scan
          protocols is what sets us apart.
        </p>

        <p className="mt-4 text-base sm:text-[17px] text-[#0C0730]/70 leading-relaxed max-w-[62ch]">
          Dealerships and franchise garages often rely on the &ldquo;parts cannon&rdquo;—swapping
          expensive assemblies until a warning light temporarily turns off. In our {city}{" "}
          diagnostic bays, we capture live sensor waveforms and module communication at the
          nanosecond level before a single bolt is loosened.
        </p>
      </div>
    </section>
  );
}
