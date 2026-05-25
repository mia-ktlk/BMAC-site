/**
 * BMAC Nav — Bauhaus Kinetic Minimalism
 * Uses CSS media queries (not Tailwind classes) for reliable show/hide on mobile vs desktop.
 * Mobile: hamburger → slide-out drawer with backdrop and explicit close button.
 * Cross-page anchor navigation: navigate to / first, then scroll to anchor.
 */
import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/paths";
import { Link, useLocation } from "wouter";

// Inject media-query styles once
const NAV_STYLE_ID = "bmac-nav-styles";
if (typeof document !== "undefined" && !document.getElementById(NAV_STYLE_ID)) {
  const s = document.createElement("style");
  s.id = NAV_STYLE_ID;
  s.textContent = `
    .bmac-nav-desktop { display: flex !important; }
    .bmac-nav-hamburger { display: none !important; }
    @media (max-width: 767px) {
      .bmac-nav-desktop { display: none !important; }
      .bmac-nav-hamburger { display: flex !important; }
    }
  `;
  document.head.appendChild(s);
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const pendingAnchor = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // After navigating to home, scroll to pending anchor
  useEffect(() => {
    if (location === "/" && pendingAnchor.current) {
      const id = pendingAnchor.current;
      pendingAnchor.current = null;
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (attempts < 10) setTimeout(() => tryScroll(attempts + 1), 100);
      };
      setTimeout(() => tryScroll(), 80);
    }
  }, [location]);

  const handleAnchorClick = (e: React.MouseEvent, anchor: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = anchor.replace("#", "");
    if (location === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      pendingAnchor.current = id;
      navigate("/");
    }
  };

  const navLinks = [
    { label: "About", href: "#about", anchor: true },
    { label: "Our Pillars", href: "#goals", anchor: true },
    { label: "Services", href: "/services", anchor: false },
    { label: "Team", href: "#team", anchor: true },
  ];

  const linkStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.75)",
    textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "color 0.2s ease",
    whiteSpace: "nowrap",
    cursor: "pointer",
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          backgroundColor: scrolled ? "rgba(15,15,15,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.25rem",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src={withBase("/images/bmac-logo.png")}
              alt="BMAC"
              style={{ width: "34px", height: "34px", objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "0.12em",
                color: "#FFFFFF",
                textTransform: "uppercase",
              }}
            >
              BMAC
            </span>
          </Link>

          {/* ── Desktop Center Links — hidden on mobile via CSS ── */}
          <div
            className="bmac-nav-desktop"
            style={{
              alignItems: "center",
              gap: "2rem",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map((link) =>
              link.anchor ? (
                <a
                  key={link.label}
                  href={link.href}
                  style={linkStyle}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  style={linkStyle}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)")}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* ── Desktop Log In — hidden on mobile via CSS ── */}
          <div className="bmac-nav-desktop" style={{ alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            <Link
              href="/login"
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 600,
                fontSize: "0.82rem",
                color: "#FFFFFF",
                textDecoration: "none",
                letterSpacing: "0.04em",
                padding: "0.45rem 1.2rem",
                backgroundColor: "#E8474A",
                border: "1px solid #E8474A",
                borderRadius: "999px",
                transition: "background-color 0.2s ease, transform 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#c73538";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#E8474A";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              Log In
            </Link>
          </div>

          {/* ── Mobile Hamburger — hidden on desktop via CSS ── */}
          <button
            className="bmac-nav-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none",
              border: "none",
              padding: "0.5rem",
              cursor: "pointer",
              flexDirection: "column",
              gap: "5px",
              flexShrink: 0,
            }}
          >
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#FFFFFF", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "17px", height: "2px", backgroundColor: "#FFFFFF", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#FFFFFF", borderRadius: "2px" }} />
          </button>
        </div>
      </nav>

      {/* ── Backdrop Overlay ── */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          zIndex: 298,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.35s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* ── Slide-Out Drawer ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(320px, 85vw)",
          backgroundColor: "#0a0a0f",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          zIndex: 299,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            Menu
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50%",
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div style={{ padding: "0.5rem 0", flex: 1 }}>
          {navLinks.map((link, i) => {
            const style: React.CSSProperties = {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "'Space Grotesk'",
              fontWeight: 600,
              fontSize: "1.5rem",
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "0.9rem 1.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              letterSpacing: "-0.02em",
              cursor: "pointer",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateX(0)" : "translateX(20px)",
              transition: `opacity 0.3s ease ${i * 55 + 60}ms, transform 0.3s cubic-bezier(0.23,1,0.32,1) ${i * 55 + 60}ms`,
            };
            const arrow = (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            );
            return link.anchor ? (
              <a key={link.label} href={link.href} style={style} onClick={(e) => handleAnchorClick(e, link.href)}>
                {link.label}{arrow}
              </a>
            ) : (
              <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={style}>
                {link.label}{arrow}
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.3s ease 300ms, transform 0.3s ease 300ms",
          }}
        >
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontFamily: "'Space Grotesk'",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "0.85rem 1.5rem",
              backgroundColor: "#E8474A",
              borderRadius: "10px",
              letterSpacing: "0.03em",
            }}
          >
            Log In to Portal
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <p style={{ fontFamily: "'DM Sans'", fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: "0.85rem", lineHeight: 1.5 }}>
            BMAC is currently on hiatus.{" "}
            <Link href="/notify-me" onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}>
              Get notified →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
