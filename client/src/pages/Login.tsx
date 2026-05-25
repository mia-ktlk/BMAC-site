/**
 * BMAC Login Page
 * Design: Bauhaus Kinetic Minimalism
 * Split layout: left = login form, right = animated feature carousel
 * - Email format validation on blur
 * - On submit: always shows "unrecognized" state with inline Formspree waitlist
 * - Fully mobile-responsive
 */
import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import { withBase } from "@/lib/paths";

// ─── Portal Feature Carousel Data ────────────────────────────────────────────
const FEATURES = [
  {
    number: "01",
    title: "Personalized Newsletter",
    description:
      "Your creative world, curated for you. Every edition lands in your inbox packed with opportunities, events, and industry news tailored to your discipline.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    stat: "Weekly",
    statLabel: "curated editions",
  },
  {
    number: "02",
    title: "Resource Hub",
    description:
      "Grants, equipment lists, career guides, and workshop recordings — all in one place. Built by the community, for the community.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    stat: "100+",
    statLabel: "resources & guides",
  },
  {
    number: "03",
    title: "Community Portal",
    description:
      "Find your people. Browse profiles by discipline, reach out for collaborations, and build real connections that lead to real projects.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    stat: "20+",
    statLabel: "creative disciplines",
  },
  {
    number: "04",
    title: "Opportunity Board",
    description:
      "Vetted jobs, freelance gigs, grants, residencies, and open calls — all relevant to media artists. No noise, just real opportunities.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    stat: "New",
    statLabel: "listings every week",
  },
  {
    number: "05",
    title: "Events & Experiences",
    description:
      "Screenings, workshops, portfolio reviews, and social mixers throughout the year. Genuine experiences designed to bring Boston creatives together.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    stat: "IRL",
    statLabel: "events year-round",
  },
];

// ─── Email validator ──────────────────────────────────────────────────────────
function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

// ─── Inline Waitlist Form (shown after failed login) ─────────────────────────
function WaitlistForm({ prefillEmail }: { prefillEmail: string }) {
  const [state, handleSubmit] = useForm("xnjrbzwy");
  const [notifyEmail, setNotifyEmail] = useState(prefillEmail);

  if (state.succeeded) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1.1rem 1.5rem",
        borderRadius: "12px",
        background: "rgba(232,71,74,0.1)",
        border: "1px solid rgba(232,71,74,0.3)",
        marginTop: "0.5rem",
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: "#E8474A",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l3.5 3.5L12 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.9rem", color: "#FFFFFF", margin: 0 }}>
            You're on the list!
          </p>
          <p style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", margin: "0.15rem 0 0" }}>
            We'll notify you the moment BMAC reopens membership.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}
      style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.5rem" }}
    >
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <input
          type="email"
          name="email"
          value={notifyEmail}
          onChange={(e) => setNotifyEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            flex: 1,
            minWidth: "180px",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "#FFFFFF",
            fontFamily: "'DM Sans'",
            fontSize: "0.88rem",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#E8474A")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
        />
        <input type="hidden" name="_subject" value="BMAC Notify Me — Login Page Subscriber" />
        <input type="hidden" name="form_type" value="notify_me_login" />
        <button
          type="submit"
          disabled={state.submitting}
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: "8px",
            background: state.submitting ? "rgba(232,71,74,0.5)" : "#E8474A",
            color: "#FFFFFF",
            fontFamily: "'Space Grotesk'",
            fontWeight: 600,
            fontSize: "0.82rem",
            letterSpacing: "0.04em",
            border: "none",
            cursor: state.submitting ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => { if (!state.submitting) e.currentTarget.style.background = "#d63a3d"; }}
          onMouseLeave={(e) => { if (!state.submitting) e.currentTarget.style.background = "#E8474A"; }}
        >
          {state.submitting ? "Sending…" : "Notify Me"}
        </button>
      </div>
      <ValidationError field="email" prefix="Email" errors={state.errors} style={{ color: "#E8474A", fontSize: "0.78rem", fontFamily: "'DM Sans'" }} />
    </form>
  );
}

// ─── Animated Feature Carousel ────────────────────────────────────────────────
function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 280);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % FEATURES.length);
        setAnimating(false);
      }, 280);
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const f = FEATURES[active];

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "2.5rem",
          minHeight: "280px",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: "'Space Grotesk'",
            fontWeight: 700,
            fontSize: "3.5rem",
            lineHeight: 1,
            color: "rgba(232,71,74,0.2)",
            letterSpacing: "-0.04em",
          }}>
            {f.number}
          </span>
          <div style={{
            width: 56, height: 56,
            borderRadius: "12px",
            background: "rgba(232,71,74,0.12)",
            border: "1px solid rgba(232,71,74,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#E8474A",
          }}>
            {f.icon}
          </div>
        </div>

        <h3 style={{
          fontFamily: "'Space Grotesk'",
          fontWeight: 700,
          fontSize: "1.4rem",
          letterSpacing: "-0.02em",
          color: "#FFFFFF",
          margin: 0,
        }}>
          {f.title}
        </h3>

        <p style={{
          fontFamily: "'DM Sans'",
          fontWeight: 300,
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
        }}>
          {f.description}
        </p>

        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(232,71,74,0.1)",
          border: "1px solid rgba(232,71,74,0.2)",
          borderRadius: "999px",
          padding: "0.35rem 1rem",
          alignSelf: "flex-start",
        }}>
          <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.85rem", color: "#E8474A" }}>
            {f.stat}
          </span>
          <span style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
            {f.statLabel}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
        {FEATURES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? "28px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background: i === active ? "#E8474A" : "rgba(255,255,255,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.35s cubic-bezier(0.23,1,0.32,1), background 0.25s ease",
            }}
            aria-label={`Go to feature ${i + 1}`}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
        {FEATURES.map((feat, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              fontFamily: "'DM Sans'",
              fontWeight: i === active ? 600 : 400,
              fontSize: "0.75rem",
              color: i === active ? "#FFFFFF" : "rgba(255,255,255,0.35)",
              background: i === active ? "rgba(255,255,255,0.08)" : "transparent",
              border: "1px solid",
              borderColor: i === active ? "rgba(255,255,255,0.15)" : "transparent",
              borderRadius: "999px",
              padding: "0.3rem 0.85rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {feat.title}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Login Page ──────────────────────────────────────────────────────────
export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const bgRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = bgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  const gx = Math.round(mouse.x * 100);
  const gy = Math.round(mouse.y * 100);

  // Validate email on blur
  const handleEmailBlur = () => {
    if (email && !isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Validate password on blur
  const handlePasswordBlur = () => {
    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Run validations
    let valid = true;
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }
    if (!valid) return;

    // Always show "not recognized" state (portal is on hiatus)
    setLoginFailed(true);
    // Scroll to error message
    setTimeout(() => {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.9rem 1.25rem",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "#FFFFFF",
    fontFamily: "'DM Sans'",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s ease, background 0.2s ease",
    boxSizing: "border-box",
  };

  const inputErrorStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: "rgba(232,71,74,0.6)",
  };

  return (
    <div
      ref={bgRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(ellipse 60% 50% at ${gx}% ${gy}%, rgba(232,71,74,0.28) 0%, transparent 55%),
          radial-gradient(ellipse 45% 40% at ${100 - gx}% ${100 - gy}%, rgba(90,20,140,0.18) 0%, transparent 50%),
          radial-gradient(ellipse 50% 45% at 50% 20%, rgba(200,80,20,0.12) 0%, transparent 45%),
          #0a0a0f
        `,
        transition: "background 0.5s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Nav />

      {/* Noise texture overlay */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Decorative circle */}
      <div style={{
        position: "fixed",
        right: "-15vw",
        bottom: "-10vw",
        width: "55vw",
        height: "55vw",
        borderRadius: "50%",
        border: "1px solid rgba(232,71,74,0.1)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Main content */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Left: Login Form ── */}
        <div
          style={{
            flex: "0 0 auto",
            width: "100%",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(5rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem) clamp(2.5rem, 4vw, 4rem)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
          className="login-left"
        >
          {/* Heading */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              color: "#E8474A",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              Member Portal
            </p>
            <h1 style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: 0,
            }}>
              Login to our<br />
              <span style={{ color: "#E8474A" }}>member portal.</span>
            </h1>
          </div>

          {/* ── Login Form ── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }} noValidate>

            {/* Email field */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); if (loginFailed) setLoginFailed(false); }}
                onBlur={handleEmailBlur}
                placeholder="your@email.com"
                required
                style={emailError ? inputErrorStyle : inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = emailError ? "rgba(232,71,74,0.8)" : "#E8474A";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onBlurCapture={(e) => {
                  if (!emailError) e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
              {emailError && (
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.78rem", color: "#E8474A", margin: 0 }}>
                  {emailError}
                </p>
              )}
            </div>

            {/* Password field */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{
                  fontFamily: "'Space Grotesk'",
                  fontWeight: 600,
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                }}>
                  Password
                </label>
                <a
                  href="mailto:bostonmediaartistscollective@gmail.com"
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#E8474A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(""); if (loginFailed) setLoginFailed(false); }}
                  onBlur={handlePasswordBlur}
                  placeholder="••••••••"
                  required
                  style={{ ...(passwordError ? inputErrorStyle : inputStyle), paddingRight: "3rem" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = passwordError ? "rgba(232,71,74,0.8)" : "#E8474A";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onBlurCapture={(e) => {
                    if (!passwordError) e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.35)",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.78rem", color: "#E8474A", margin: 0 }}>
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "10px",
                background: "#E8474A",
                color: "#FFFFFF",
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s ease, transform 0.15s ease",
                marginTop: "0.25rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d63a3d";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E8474A";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Log In to Portal
            </button>
          </form>

          {/* ── Failed Login State ── */}
          {loginFailed && (
            <div
              ref={errorRef}
              style={{
                marginTop: "1.5rem",
                padding: "1.5rem",
                borderRadius: "14px",
                background: "rgba(232,71,74,0.07)",
                border: "1px solid rgba(232,71,74,0.25)",
                opacity: loginFailed ? 1 : 0,
                transform: loginFailed ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {/* Icon + heading */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", marginBottom: "0.85rem" }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "rgba(232,71,74,0.15)",
                  border: "1px solid rgba(232,71,74,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: "2px",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E8474A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Space Grotesk'",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#FFFFFF",
                    margin: "0 0 0.3rem",
                  }}>
                    We don't recognize that email or password.
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans'",
                    fontWeight: 300,
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.55)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}>
                    BMAC is currently on a brief hiatus and not accepting new members. If our mission resonates with you and you'd like to be notified when we reopen, enter your email below.
                  </p>
                </div>
              </div>

              {/* Inline waitlist form */}
              <WaitlistForm prefillEmail={email} />
            </div>
          )}

          {/* Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "1.75rem 0",
          }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontFamily: "'DM Sans'", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
              not a member yet?
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          </div>

          <Link
            href={withBase("/notify-me")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.9rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Space Grotesk'",
              fontWeight: 500,
              fontSize: "0.85rem",
              textDecoration: "none",
              transition: "border-color 0.2s ease, color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
              (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Get notified when we reopen
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <p style={{
            fontFamily: "'DM Sans'",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.25)",
            textAlign: "center",
            marginTop: "2rem",
            lineHeight: 1.6,
          }}>
            By logging in you agree to our{" "}
            <Link href="/privacy-policy" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}>
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* ── Right: Feature Carousel ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(4rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem) clamp(2.5rem, 4vw, 4rem)",
            minWidth: 0,
          }}
          className="login-right hidden md:flex"
        >
          <div style={{ maxWidth: "480px", margin: "0 auto", width: "100%" }}>
            <p style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              Inside the portal
            </p>
            <h2 style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "2.5rem",
            }}>
              Everything you need<br />
              <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>to grow as a creator.</span>
            </h2>

            <FeatureCarousel />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left {
            max-width: 100% !important;
            border-right: none !important;
            padding: 5.5rem 1.5rem 2rem !important;
          }
          .login-right {
            display: none !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .login-left {
            max-width: 380px !important;
            padding: 5.5rem 2rem 3rem !important;
          }
          .login-right {
            padding: 5.5rem 2rem 3rem !important;
          }
        }
      `}</style>
    </div>
  );
}
