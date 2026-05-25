/**
 * BMAC Footer — Bauhaus Kinetic Minimalism
 * Dark background, minimal layout, social links, legal links.
 * Cross-page anchor navigation: navigates to / then scrolls to section.
 * Mobile-responsive padding.
 */
import { withBase } from "@/lib/paths";
import { scrollToSection, setPendingSectionScroll } from "@/lib/scrollNavigation";
import { Link, useLocation } from "wouter";

// Helper: render either a wouter Link or a plain anchor
function FooterLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  const style = {
    display: "block",
    fontFamily: "'DM Sans'",
    fontWeight: 300,
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.55)",
    textDecoration: "none",
    marginBottom: "0.75rem",
    transition: "color 0.2s ease",
  };
  if (href.startsWith("/")) {
    return (
      <Link href={href} style={style}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E8474A")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      style={style}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#E8474A")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
      {children}
    </a>
  );
}

// Cross-page anchor link: if on home, smooth-scroll; otherwise navigate home then scroll
function FooterAnchorLink({ anchor, label }: { anchor: string; label: string }) {
  const [location, navigate] = useLocation();

  const style = {
    display: "block",
    fontFamily: "'DM Sans'",
    fontWeight: 300,
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.55)",
    textDecoration: "none",
    marginBottom: "0.75rem",
    transition: "color 0.2s ease",
    cursor: "pointer",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location === "/") {
      scrollToSection(anchor);
    } else {
      setPendingSectionScroll(anchor);
      navigate("/");
    }
  };

  return (
    <a
      href={`#${anchor}`}
      style={style}
      onClick={handleClick}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#E8474A")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0F0F0F", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 4rem) clamp(1.5rem, 3vw, 3rem)",
        }}
      >
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={withBase("/images/bmac-logo.png")}
                alt="BMAC"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.12em",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                }}
              >
                BMAC
              </span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                maxWidth: "300px",
                margin: 0,
              }}
            >
              Boston Media Artists Collective — uniting creatives across film, photography, music, and design.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-16">
            <div>
              <p style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Navigate
              </p>
              <FooterAnchorLink anchor="about" label="About" />
              <FooterAnchorLink anchor="goals" label="Our Pillars" />
              <FooterAnchorLink anchor="team" label="Team" />
              <FooterLink href="/services">Services</FooterLink>
            </div>

            <div>
              <p style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Connect
              </p>
              <FooterLink href="mailto:bostonmediaartistscollective@gmail.com">Email Us</FooterLink>
              <FooterLink href="https://www.linkedin.com/company/boston-media-artists-collective/" external>LinkedIn</FooterLink>
              <FooterLink href="/login">Log In</FooterLink>
            </div>

            <div>
              <p style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Legal
              </p>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/accessibility">Accessibility</FooterLink>
            </div>
          </div>
        </div>

        {/* Nonprofit disclaimer */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            paddingBottom: "1.25rem",
          }}
        >
          <p style={{
            fontFamily: "'DM Sans'",
            fontWeight: 300,
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.3)",
            margin: 0,
            lineHeight: 1.6,
            maxWidth: "640px",
            fontStyle: "italic",
          }}>
            BMAC is an emerging Massachusetts-based nonprofit initiative pursuing federal 501(c)(3) tax-exempt status and seeking fiscal sponsorship.
          </p>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
              © {year} Boston Media Artists Collective. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontWeight: 700,
                fontSize: "0.8rem",
                color: "#E8474A",
                margin: "0.5rem 0 0",
              }}
            >
              🎨 Website made by{" "}
              <a
                href="https://helloitsmia.tech"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#E8474A",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                @helloitsmia.tech
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/company/boston-media-artists-collective/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s ease", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E8474A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
