"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Phone, Activity, RotateCcw, Wrench } from "lucide-react";

export interface LiveDispatchChatProps {
  companyName?: string;
  city?: string;
  phone?: string;
  primaryColor?: string;
}

interface MessageItem {
  id: string;
  sender: "driver" | "advisor";
  senderLabel: string;
  time: string;
  text: string;
}

const CONVERSATION: MessageItem[] = [
  {
    id: "msg-1",
    sender: "driver",
    senderLabel: "DRIVER // DIRECT INTAKE",
    time: "10:41 AM",
    text: "Check engine light flashing and rough idle on my BMW 330i. Can I get a diagnostic scan today?",
  },
  {
    id: "msg-2",
    sender: "advisor",
    senderLabel: "SERVICE ADVISOR // BAY DISPATCH",
    time: "10:42 AM",
    text: "Yes. Bring it straight in—we run OEM factory scan tools. Bay 2 clears in 20 minutes.",
  },
  {
    id: "msg-3",
    sender: "driver",
    senderLabel: "DRIVER // DIRECT INTAKE",
    time: "10:43 AM",
    text: "Great, pulling up now. Tow truck just dropped it.",
  },
  {
    id: "msg-4",
    sender: "advisor",
    senderLabel: "SERVICE ADVISOR // BAY DISPATCH",
    time: "10:43 AM",
    text: "Lead master tech is flagged. We’ll pull diagnostic trouble codes the minute you hit the lot.",
  },
];

export function LiveDispatchChat({
  companyName = "Precision Auto Diagnostics",
  city = "Metropolitan Area",
  phone = "(555) 019-2834",
  primaryColor = "#F97316",
}: LiveDispatchChatProps) {
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  // Sequence state:
  // 0: Initial
  // 1: Driver 1 visible
  // 2: Advisor typing 1
  // 3: Advisor 1 visible
  // 4: Driver 2 visible
  // 5: Advisor typing 2
  // 6: Advisor 2 visible (complete)
  const [stage, setStage] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);   // Driver 1
    const t2 = setTimeout(() => setStage(2), 1600);  // Advisor typing
    const t3 = setTimeout(() => setStage(3), 2900);  // Advisor 1
    const t4 = setTimeout(() => setStage(4), 4300);  // Driver 2
    const t5 = setTimeout(() => setStage(5), 5500);  // Advisor typing 2
    const t6 = setTimeout(() => setStage(6), 6800);  // Advisor 2

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [replayKey]);

  const handleReplay = () => {
    setStage(0);
    setReplayKey((prev) => prev + 1);
  };

  const isVisible = (index: number) => {
    if (index === 0) return stage >= 1;
    if (index === 1) return stage >= 3;
    if (index === 2) return stage >= 4;
    if (index === 3) return stage >= 6;
    return false;
  };

  const isTyping = (stage === 2) || (stage === 5);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Outer ambient glow behind smartphone */}
      <div
        className="absolute -inset-1.5 rounded-[2.5rem] blur-xl opacity-30 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${primaryColor}, transparent 70%)`,
        }}
      />

      {/* Floating Smartphone Shell */}
      <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-5 text-slate-100 overflow-hidden ring-1 ring-white/10">
        {/* Hardware Status / Speaker Notch */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 10px ${primaryColor}`,
              }}
            />
            <span className="text-xs font-semibold tracking-tight text-white flex items-center gap-1.5">
              <span>Service Advisor Online</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-mono text-[11px] font-bold">Bay 3 Open</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>LIVE DISPATCH</span>
          </div>
        </div>

        {/* Telemetry Sub-Pill */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 bg-white/[0.03] rounded-lg px-2.5 py-1 mb-3.5 border border-white/5">
          <span className="truncate">{`${companyName} // ${city.toUpperCase()}`}</span>
          <span className="text-emerald-400 font-semibold shrink-0">ETA: &lt; 20m</span>
        </div>

        {/* Message Thread Area */}
        <div className="space-y-3 min-h-[300px] flex flex-col justify-end">
          {/* Driver Message 1 */}
          {isVisible(0) && (
            <motion.div
              key="msg-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="self-start max-w-[86%] space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                <span>{CONVERSATION[0].senderLabel}</span>
                <span>{CONVERSATION[0].time}</span>
              </div>
              <div className="bg-slate-900/90 border border-white/10 text-slate-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs leading-relaxed shadow-sm">
                {CONVERSATION[0].text}
              </div>
            </motion.div>
          )}

          {/* Advisor Message 1 */}
          {isVisible(1) && (
            <motion.div
              key="msg-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="self-end max-w-[88%] space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 px-1">
                <span className="font-bold flex items-center gap-1">
                  <Wrench className="w-2.5 h-2.5" />
                  {CONVERSATION[1].senderLabel}
                </span>
                <span>{CONVERSATION[1].time}</span>
              </div>
              <div
                className="rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-xs leading-relaxed shadow-lg font-medium border border-white/15"
                style={{
                  backgroundColor: primaryColor,
                  color: "#ffffff",
                  boxShadow: `0 4px 18px -4px ${primaryColor}66`,
                }}
              >
                {CONVERSATION[1].text}
              </div>
            </motion.div>
          )}

          {/* Driver Message 2 */}
          {isVisible(2) && (
            <motion.div
              key="msg-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="self-start max-w-[86%] space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                <span>{CONVERSATION[2].senderLabel}</span>
                <span>{CONVERSATION[2].time}</span>
              </div>
              <div className="bg-slate-900/90 border border-white/10 text-slate-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs leading-relaxed shadow-sm">
                {CONVERSATION[2].text}
              </div>
            </motion.div>
          )}

          {/* Advisor Message 2 */}
          {isVisible(3) && (
            <motion.div
              key="msg-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="self-end max-w-[88%] space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 px-1">
                <span className="font-bold flex items-center gap-1">
                  <Wrench className="w-2.5 h-2.5" />
                  {CONVERSATION[3].senderLabel}
                </span>
                <span>{CONVERSATION[3].time}</span>
              </div>
              <div
                className="rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-xs leading-relaxed shadow-lg font-medium border border-white/15"
                style={{
                  backgroundColor: primaryColor,
                  color: "#ffffff",
                  boxShadow: `0 4px 18px -4px ${primaryColor}66`,
                }}
              >
                {CONVERSATION[3].text}
              </div>
            </motion.div>
          )}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="self-end bg-slate-900/90 border border-white/10 rounded-2xl rounded-tr-sm px-3.5 py-2.5 flex items-center gap-2 shadow-sm"
              >
                <span className="text-[10px] font-mono text-slate-400">Advisor typing</span>
                <div className="flex items-center gap-1">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: primaryColor }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dispatch Action Bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <a
            href={`tel:${cleanPhone}`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110 active:scale-95 border border-white/15 shadow-md"
            style={{ backgroundColor: primaryColor }}
          >
            <Phone className="w-3.5 h-3.5 animate-pulse" />
            <span>Call Live Bay Dispatch</span>
          </a>

          <button
            type="button"
            onClick={handleReplay}
            title="Replay dispatch simulation"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-2 text-center">
          <span className="text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1">
            <Activity className="w-2.5 h-2.5 text-emerald-400" />
            <span>Real-time shop operations simulation • Zero hold times</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LiveDispatchChat;
