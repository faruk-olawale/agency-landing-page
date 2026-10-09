"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Phone, ArrowRight, Wrench, X } from "lucide-react";

interface QuickFleetNavProps {
  companyName: string;
  city: string;
  phone: string;
  cleanPhone: string;
  primaryColor?: string;
}

export function QuickFleetNav({
  companyName,
  city,
  phone,
  cleanPhone,
  primaryColor = "#0A997D",
}: QuickFleetNavProps) {
  // Strictly enforce QuickFleet teal and eliminate any orange
  const safeColor =
    !primaryColor ||
    primaryColor.toLowerCase().includes("f97316") ||
    primaryColor.toLowerCase().includes("ea580c") ||
    primaryColor.toLowerCase().includes("d97706") ||
    primaryColor.toLowerCase().includes("orange")
      ? "#0A997D"
      : primaryColor;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMcta, setShowMcta] = useState(false);
  const [activeSection, setActiveSection] = useState("facility");

  // Lock body scroll cleanly without page jumping on mobile
  const setMenu = useCallback((open: boolean) => {
    setMobileMenuOpen(open);
    const root = document.documentElement;
    const body = document.body;

    if (open) {
      const scrollY = window.pageYOffset || 0;
      body.setAttribute("data-lock-scroll-y", String(scrollY));
      root.classList.add("qf-menu-open");
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
    } else {
      const scrollY = parseInt(body.getAttribute("data-lock-scroll-y") || "0", 10);
      root.classList.remove("qf-menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    }
  }, []);

  // Handle scroll events for sticky nav elevation, active section, and bottom thumb CTA
  useEffect(() => {
    const handleScroll = (e?: Event) => {
      let scrollY = window.scrollY;
      if (e && e.target && (e.target as HTMLElement).scrollTop !== undefined) {
        scrollY = (e.target as HTMLElement).scrollTop || window.scrollY;
      }
      setIsScrolled(scrollY > 15);

      // Check if user has scrolled past hero (~380px) and hasn't reached booking close section
      const bookSection = document.getElementById("book-intake");
      let atBooking = false;
      if (bookSection) {
        const rect = bookSection.getBoundingClientRect();
        atBooking = rect.top < window.innerHeight * 0.9;
      }
      setShowMcta(scrollY > 380 && !atBooking);

      // Detect active section
      const sections = ["facility", "services", "tooling", "service-record", "cost-benchmark", "why-it-matters"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  // Auto-close menu on escape or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMenu(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 1080 && mobileMenuOpen) {
        setMenu(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen, setMenu]);

  // Clean navigation link click
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenu(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────────
          1. QUICKFLEET TOP NAVIGATION (Strict Parity: Logo, Center Pill, Actions)
      ────────────────────────────────────────────────────────────────────── */}
      <header
        className={`qf-nav ${isScrolled ? "is-scrolled" : ""}`}
        role="banner"
      >
        <div className="qf-nav__row">
          {/* Logo (Identical to QuickFleet: Circular Teal Brand Mark + Bold Company Title) */}
          <a
            href="#top"
            className="qf-nav__logo"
            aria-label={`${companyName} home`}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="qf-nav__logo-icon">
              <svg
                className="w-9 h-9"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="18" r="18" fill={safeColor} />
                <path
                  d="M12.5 19.5C12.5 15.634 15.634 12.5 19.5 12.5C23.366 12.5 26.5 15.634 26.5 19.5C26.5 23.366 23.366 26.5 19.5 26.5H13.5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 16.5L12 19.5L15.5 22.5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="qf-nav__brand-name" title={companyName}>
              {companyName}
            </span>
          </a>

          {/* Centered Floating Pill Navigation Links (Desktop) */}
          <nav aria-label="Primary" className="qf-nav__center">
            <ul className="qf-nav__links">
              <li>
                <a
                  href="#facility"
                  data-active={activeSection === "facility"}
                  aria-current={activeSection === "facility" ? "page" : undefined}
                  onClick={(e) => handleLinkClick(e, "#facility")}
                >
                  The Facility
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  data-active={activeSection === "services"}
                  aria-current={activeSection === "services" ? "page" : undefined}
                  onClick={(e) => handleLinkClick(e, "#services")}
                >
                  What We Do
                </a>
              </li>
              <li>
                <a
                  href="#tooling"
                  data-active={activeSection === "tooling"}
                  aria-current={activeSection === "tooling" ? "page" : undefined}
                  onClick={(e) => handleLinkClick(e, "#tooling")}
                >
                  Diagnostic Bays
                </a>
              </li>
              <li>
                <a
                  href="#service-record"
                  data-active={activeSection === "service-record"}
                  aria-current={activeSection === "service-record" ? "page" : undefined}
                  onClick={(e) => handleLinkClick(e, "#service-record")}
                >
                  Live Telemetry
                </a>
              </li>
              <li>
                <a
                  href="#cost-benchmark"
                  data-active={activeSection === "cost-benchmark"}
                  aria-current={activeSection === "cost-benchmark" ? "page" : undefined}
                  onClick={(e) => handleLinkClick(e, "#cost-benchmark")}
                >
                  Cost Benchmark
                </a>
              </li>
              <li>
                <a
                  href="#why-it-matters"
                  data-active={activeSection === "why-it-matters"}
                  aria-current={activeSection === "why-it-matters" ? "page" : undefined}
                  onClick={(e) => handleLinkClick(e, "#why-it-matters")}
                >
                  Why Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Action Pills & Labelled Burger Button */}
          <div className="qf-nav__right">
            <a
              href={`tel:${cleanPhone}`}
              id="qf-nav-contact"
              aria-label={`Contact ${companyName}`}
              className="qf-control qf-control--ghost"
            >
              Contact
            </a>

            <a
              href="#book-intake"
              id="qf-nav-cta"
              onClick={(e) => handleLinkClick(e, "#book-intake")}
              className="qf-control qf-control--ink group"
            >
              <span>Book Intake</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            {/* Signature QuickFleet Labelled Burger Pill (Menu + 2 animated bars) */}
            <button
              className="qf-nav__burger"
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="qf-mobile-menu"
              onClick={() => setMenu(!mobileMenuOpen)}
            >
              Menu
              <i>
                <b />
                <b />
              </i>
            </button>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          2. FULL-SCREEN BRAND DEEP NAVY OVERLAY MENU (.qf-mnav)
          Strict Parity to QuickFleet: Luminous mint aura, staggered links,
          drawing line dividers, and high-contrast thumb-level footer.
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className={`qf-mnav ${mobileMenuOpen ? "is-open" : ""}`}
        id="qf-mobile-menu"
        aria-hidden={!mobileMenuOpen}
      >
        {/* Top Header Row of the Menu */}
        <div className="qf-mnav__bar">
          <div className="flex items-center gap-2.5 min-w-0 max-w-[calc(100%-60px)]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              <svg
                className="w-8 h-8"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="18" r="18" fill={safeColor} />
                <path
                  d="M12.5 19.5C12.5 15.634 15.634 12.5 19.5 12.5C23.366 12.5 26.5 15.634 26.5 19.5C26.5 23.366 23.366 26.5 19.5 26.5H13.5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 16.5L12 19.5L15.5 22.5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white truncate min-w-0">
              {companyName}
            </span>
          </div>

          <button
            className="qf-mnav__close"
            type="button"
            aria-label="Close menu"
            onClick={() => setMenu(false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-white"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Editorial Body Links with Staggered Slide & Line Drawing */}
        <nav className="qf-mnav__body" aria-label="Mobile Navigation">
          <a
            className="qf-mnav__link"
            href="#facility"
            data-active={activeSection === "facility"}
            style={{ "--i": 0 } as React.CSSProperties}
            onClick={(e) => handleLinkClick(e, "#facility")}
          >
            <span>
              <b>The Facility</b>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <a
            className="qf-mnav__link"
            href="#services"
            data-active={activeSection === "services"}
            style={{ "--i": 1 } as React.CSSProperties}
            onClick={(e) => handleLinkClick(e, "#services")}
          >
            <span>
              <b>What We Do</b>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <a
            className="qf-mnav__link"
            href="#tooling"
            data-active={activeSection === "tooling"}
            style={{ "--i": 2 } as React.CSSProperties}
            onClick={(e) => handleLinkClick(e, "#tooling")}
          >
            <span>
              <b>Diagnostic Bays</b>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <a
            className="qf-mnav__link"
            href="#service-record"
            data-active={activeSection === "service-record"}
            style={{ "--i": 3 } as React.CSSProperties}
            onClick={(e) => handleLinkClick(e, "#service-record")}
          >
            <span>
              <b>Live Telemetry</b>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <a
            className="qf-mnav__link"
            href="#cost-benchmark"
            data-active={activeSection === "cost-benchmark"}
            style={{ "--i": 4 } as React.CSSProperties}
            onClick={(e) => handleLinkClick(e, "#cost-benchmark")}
          >
            <span>
              <b>Cost Benchmark</b>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <a
            className="qf-mnav__link"
            href="#why-it-matters"
            data-active={activeSection === "why-it-matters"}
            style={{ "--i": 5 } as React.CSSProperties}
            onClick={(e) => handleLinkClick(e, "#why-it-matters")}
          >
            <span>
              <b>Why Us</b>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <div className="qf-mnav__more">
            <a
              href={`tel:${cleanPhone}`}
              onClick={() => setMenu(false)}
            >
              Contact
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </nav>

        {/* High-Contrast Conversion Footer */}
        <div className="qf-mnav__foot">
          <a
            className="qf-mnav__cta"
            href="#book-intake"
            onClick={(e) => handleLinkClick(e, "#book-intake")}
          >
            <span>Book Diagnostic Intake</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <a
            className="qf-mnav__phone"
            href={`tel:${cleanPhone}`}
          >
            <span>Direct Bay Hotline: {phone}</span>
          </a>

          <p className="qf-mnav__meta">
            {city.toUpperCase()} FIRST · PRECISION INTAKE 2026
          </p>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          3. QUICKFLEET MOBILE FLOATING THUMB CTA BAR (.qf-mcta)
          Slides smoothly into view when scrolling down on mobile devices.
      ────────────────────────────────────────────────────────────────────── */}
      <div className={`qf-mcta ${showMcta && !mobileMenuOpen ? "is-on" : ""}`}>
        <a
          href="#book-intake"
          onClick={(e) => handleLinkClick(e, "#book-intake")}
        >
          <span>Book Diagnostic Intake</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}

export default QuickFleetNav;
