/**
 * BMAC Notify Me / Hiatus Page
 * Design: Bauhaus Kinetic Minimalism
 * Dark hero with mouse-reactive gradient, email subscribe + Formspree contact form
 */
import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

// ─── Email Subscribe (separate Formspree form) ────────────────────────────────
function EmailSubscribe() {
  const [state, handleSubmit] = useForm("xnjrbzwy");
  const [email, setEmail] = useState("");
  const ref = useReveal(100);

  if (state.succeeded) {
    return (
      <div
        ref={ref}
        className="reveal"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1.25rem 1.75rem",
          borderRadius: "12px",
          background: "rgba(232,71,74,0.12)",
          border: "1px solid rgba(232,71,74,0.3)",
          maxWidth: "520px",
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "#E8474A",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l3.5 3.5L12 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.95rem", color: "#FFFFFF", margin: 0 }}>
            You're on the list.
          </p>
          <p style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", margin: "0.2rem 0 0" }}>
            We'll reach out as soon as BMAC reopens membership.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="reveal">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "520px" }}
      >
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <input
            id="notify-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              minWidth: "220px",
              padding: "0.9rem 1.25rem",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "#FFFFFF",
              fontFamily: "'DM Sans'",
              fontSize: "0.95rem",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#E8474A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
          />
          {/* Hidden field to identify this as a notify-me submission */}
          <input type="hidden" name="_subject" value="BMAC Notify Me — New Subscriber" />
          <input type="hidden" name="form_type" value="notify_me" />
          <button
            type="submit"
            disabled={state.submitting}
            style={{
              padding: "0.9rem 1.75rem",
              borderRadius: "8px",
              background: state.submitting ? "rgba(232,71,74,0.5)" : "#E8474A",
              color: "#FFFFFF",
              fontFamily: "'Space Grotesk'",
              fontWeight: 600,
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              border: "none",
              cursor: state.submitting ? "not-allowed" : "pointer",
              transition: "background 0.2s ease, transform 0.15s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { if (!state.submitting) e.currentTarget.style.background = "#d63a3d"; }}
            onMouseLeave={(e) => { if (!state.submitting) e.currentTarget.style.background = "#E8474A"; }}
          >
            {state.submitting ? "Sending…" : "Notify Me"}
          </button>
        </div>
        <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400 text-sm" />
        <p style={{ fontFamily: "'DM Sans'", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
          No spam, ever. We'll only contact you when membership reopens.
        </p>
      </form>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [state, handleSubmit] = useForm("xnjrbzwy");
  const ref = useReveal(80);

  const inputStyle = (dark = true): React.CSSProperties => ({
    width: "100%",
    padding: "0.9rem 1.25rem",
    borderRadius: "8px",
    border: "1px solid",
    borderColor: dark ? "rgba(255,255,255,0.12)" : "#E0E0E0",
    background: dark ? "rgba(255,255,255,0.05)" : "#FAFAFA",
    color: dark ? "#FFFFFF" : "#0F0F0F",
    fontFamily: "'DM Sans'",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  });

  if (state.succeeded) {
    return (
      <div
        ref={ref}
        className="reveal"
        style={{
          padding: "3rem",
          borderRadius: "16px",
          background: "rgba(232,71,74,0.08)",
          border: "1px solid rgba(232,71,74,0.25)",
          textAlign: "center",
        }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "#E8474A",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.25rem",
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 11l5.5 5.5L19 5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "1.4rem", color: "#FFFFFF", marginBottom: "0.5rem" }}>
          Message received.
        </h3>
        <p style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: "360px", margin: "0 auto" }}>
          Thank you for reaching out. A member of the BMAC team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className="reveal">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
      >
        {/* Hidden identifier */}
        <input type="hidden" name="_subject" value="BMAC Contact Form Submission" />
        <input type="hidden" name="form_type" value="contact" />

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              required
              placeholder="Jane"
              style={inputStyle()}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#E8474A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              required
              placeholder="Smith"
              style={inputStyle()}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#E8474A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="jane@example.com"
            style={inputStyle()}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#E8474A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
          />
          <ValidationError field="email" prefix="Email" errors={state.errors} style={{ color: "#E8474A", fontSize: "0.8rem", fontFamily: "'DM Sans'" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
            Subject
          </label>
          <select
            name="subject"
            style={{
              ...inputStyle(),
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='rgba(255,255,255,0.4)' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              paddingRight: "2.5rem",
              cursor: "pointer",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#E8474A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
          >
            <option value="" style={{ background: "#1A1A1A" }}>Select a topic…</option>
            <option value="Partnership / Sponsorship" style={{ background: "#1A1A1A" }}>Partnership / Sponsorship</option>
            <option value="Press / Media Inquiry" style={{ background: "#1A1A1A" }}>Press / Media Inquiry</option>
            <option value="Fiscal Sponsorship" style={{ background: "#1A1A1A" }}>Fiscal Sponsorship</option>
            <option value="General Question" style={{ background: "#1A1A1A" }}>General Question</option>
            <option value="Other" style={{ background: "#1A1A1A" }}>Other</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
            Message *
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us what's on your mind…"
            style={{
              ...inputStyle(),
              resize: "vertical",
              lineHeight: 1.6,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#E8474A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
          />
          <ValidationError field="message" prefix="Message" errors={state.errors} style={{ color: "#E8474A", fontSize: "0.8rem", fontFamily: "'DM Sans'" }} />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          style={{
            alignSelf: "flex-start",
            padding: "1rem 2.5rem",
            borderRadius: "8px",
            background: state.submitting ? "rgba(232,71,74,0.5)" : "#E8474A",
            color: "#FFFFFF",
            fontFamily: "'Space Grotesk'",
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "0.05em",
            border: "none",
            cursor: state.submitting ? "not-allowed" : "pointer",
            transition: "background 0.2s ease, transform 0.15s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
          onMouseEnter={(e) => { if (!state.submitting) { e.currentTarget.style.background = "#d63a3d"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
          onMouseLeave={(e) => { if (!state.submitting) { e.currentTarget.style.background = "#E8474A"; e.currentTarget.style.transform = "translateY(0)"; } }}
        >
          {state.submitting ? "Sending…" : "Send Message"}
          {!state.submitting && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NotifyMe() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useReveal(120);
  const subscribeRef = useReveal(200);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  const gx = Math.round(mouse.x * 100);
  const gy = Math.round(mouse.y * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F" }}>
      <Nav />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          overflow: "hidden",
          background: `
            radial-gradient(ellipse 65% 55% at ${gx}% ${gy}%, rgba(232,71,74,0.32) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at ${100 - gx}% ${100 - gy}%, rgba(100,30,160,0.2) 0%, transparent 55%),
            radial-gradient(ellipse 55% 50% at 50% 25%, rgba(220,90,20,0.15) 0%, transparent 50%),
            #0a0a0f
          `,
          transition: "background 0.5s ease",
        }}
      >
        {/* Noise texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          zIndex: 1,
        }} />
        {/* Decorative circles */}
        <div className="absolute pointer-events-none" style={{
          right: "-8vw", top: "50%",
          transform: `translateY(-50%) translateX(${(mouse.x - 0.5) * -20}px)`,
          width: "50vw", height: "50vw", borderRadius: "50%",
          border: "1px solid rgba(232,71,74,0.14)",
          transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
          zIndex: 1,
        }} />
        <div className="absolute pointer-events-none" style={{
          right: "-4vw", top: "50%",
          transform: `translateY(-50%) translateX(${(mouse.x - 0.5) * -10}px)`,
          width: "35vw", height: "35vw", borderRadius: "50%",
          border: "1px solid rgba(232,71,74,0.08)",
          transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
          zIndex: 1,
        }} />

        <div className="container relative pb-20 pt-40" style={{ zIndex: 2 }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            marginBottom: "1.5rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8474A" }} />
            <span style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              color: "#E8474A",
              textTransform: "uppercase",
            }}>
              Membership Status
            </span>
          </div>

          <div ref={heroTextRef} className="reveal">
            <h1 style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
              maxWidth: "800px",
            }}>
              We'll be back<br />
              <span style={{ color: "#E8474A" }}>stronger.</span>
            </h1>
            <p style={{
              fontFamily: "'DM Sans'",
              fontWeight: 300,
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              maxWidth: "560px",
              marginBottom: "2.5rem",
            }}>
              BMAC is currently on a hiatus. We are not accepting new members to our portal at this time. If our mission resonates with you, leave your email below — you'll be the first to know when we reopen.
            </p>
          </div>

          {/* Email subscribe inline in hero */}
          <EmailSubscribe />
        </div>
      </section>

      {/* ── Divider strip ── */}
      <div style={{
        background: "#E8474A",
        padding: "1.25rem 0",
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex",
          gap: "3rem",
          animation: "marquee 18s linear infinite",
          whiteSpace: "nowrap",
          width: "max-content",
        }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i} style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.85)",
              textTransform: "uppercase",
            }}>
              Photography&nbsp;·&nbsp;Film&nbsp;·&nbsp;Music&nbsp;·&nbsp;Design&nbsp;·&nbsp;Animation&nbsp;·&nbsp;Illustration&nbsp;·&nbsp;Podcasting&nbsp;·&nbsp;Video
            </span>
          ))}
        </div>
      </div>

      {/* ── Contact Section ── */}
      <section style={{ background: "#0F0F0F", padding: "clamp(3.5rem, 6vw, 7rem) 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

            {/* Left: Context */}
            <div>
              <div style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                color: "#E8474A",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}>
                Get in Touch
              </div>
              <h2 style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                marginBottom: "1.5rem",
              }}>
                Still want to<br />connect with us?
              </h2>
              <p style={{
                fontFamily: "'DM Sans'",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                maxWidth: "400px",
              }}>
                While we're on hiatus, our team is still here. Reach out if you're interested in partnership opportunities, press inquiries, fiscal sponsorship, or simply want to say hello.
              </p>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    ),
                    label: "Email",
                    value: "bostonmediaartistscollective@gmail.com",
                    href: "mailto:bostonmediaartistscollective@gmail.com",
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                      </svg>
                    ),
                    label: "Instagram",
                    value: "@bmac.boston",
                    href: "https://www.instagram.com/bmac.boston/",
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    ),
                    label: "LinkedIn",
                    value: "Boston Media Artists Collective",
                    href: "https://www.linkedin.com/company/boston-media-artists-collective/",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      textDecoration: "none",
                      color: "rgba(255,255,255,0.55)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      background: "rgba(255,255,255,0.04)",
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "2px" }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem" }}>
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Contact form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
