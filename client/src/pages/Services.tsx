/**
 * BMAC Services Page
 * Design: Bauhaus Kinetic Minimalism
 * Dynamic, animated, conversion-focused — makes visitors want to join
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { withBase } from "@/lib/paths";

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

// ─── Counter Animation ────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.round(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function ServicesHero() {
  const [loaded, setLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  const gx = Math.round(mouse.x * 100);
  const gy = Math.round(mouse.y * 100);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse 70% 55% at ${gx}% ${gy}%, rgba(232,71,74,0.35) 0%, transparent 60%),
          radial-gradient(ellipse 55% 45% at ${100 - gx}% ${100 - gy}%, rgba(100,30,160,0.22) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 50% 30%, rgba(220,90,20,0.18) 0%, transparent 50%),
          #0a0a0f
        `,
        transition: "background 0.5s ease",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        zIndex: 1,
      }} />
      {/* Decorative circle */}
      <div className="absolute pointer-events-none" style={{
        right: "-5vw", top: "50%",
        transform: `translateY(-50%) translateX(${(mouse.x - 0.5) * -15}px)`,
        width: "45vw", height: "45vw", borderRadius: "50%",
        border: "1px solid rgba(232,71,74,0.18)",
        transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
        zIndex: 1,
      }} />

      <div className="container relative pb-20 pt-40" style={{ zIndex: 2 }}>
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          marginBottom: "1.25rem",
        }}>
          <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.22em", color: "#E8474A", textTransform: "uppercase" }}>
            What We Offer
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(3rem, 8vw, 7.5rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          color: "#FFFFFF",
          margin: 0,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(32px)",
          transition: "opacity 0.9s cubic-bezier(0.23,1,0.32,1) 0.15s, transform 0.9s cubic-bezier(0.23,1,0.32,1) 0.15s",
        }}>
          Built for<br />
          <span style={{ color: "#E8474A" }}>creators.</span><br />
          By creators.
        </h1>
        <p style={{
          fontFamily: "'DM Sans'",
          fontWeight: 300,
          fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
          color: "rgba(255,255,255,0.6)",
          maxWidth: "520px",
          lineHeight: 1.65,
          marginTop: "2rem",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.55s",
        }}>
          BMAC is a free platform designed to give Boston-area media artists everything they need to grow, connect, and create — in one place.
        </p>
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: 20, suffix: "+", label: "Creative disciplines" },
    { value: 100, suffix: "%", label: "Free to join" },
  ];

  return (
    <div style={{ backgroundColor: "#E8474A", padding: "0" }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 clamp(1rem, 4vw, 4rem)",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "clamp(1.5rem, 3vw, 2.5rem) 0",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
              paddingLeft: i > 0 ? "clamp(1rem, 2vw, 2rem)" : "0",
            }}
          >
            <div style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#FFFFFF",
              lineHeight: 1,
              marginBottom: "0.35rem",
            }}>
              <AnimatedNumber target={s.value} suffix={s.suffix} />
            </div>
            <div style={{
              fontFamily: "'DM Sans'",
              fontWeight: 300,
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.04em",
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Service Cards ────────────────────────────────────────────────────────────
const services = [
  {
    number: "01",
    title: "Personalized Newsletter",
    tagline: "Your creative world, curated for you.",
    description: "No two artists are the same, so why should your newsletter be? BMAC's custom newsletter learns what you care about: your discipline, your career stage, your interests. Every edition lands in your inbox packed with opportunities, calls for submissions, job postings, and events that are actually relevant to you.",
    features: ["Tailored to your creative discipline", "Weekly job & opportunity roundups", "Curated events and open calls", "Industry news you won't find elsewhere"],
    accent: "#E8474A",
    dark: true,
  },
  {
    number: "02",
    title: "Online Resource Hub",
    tagline: "Everything a Boston creative needs, in one place.",
    description: "From grant databases and equipment rental lists to workshop recordings and career guides, BMAC's resource library is built and maintained by the community, for the community. Stop searching across a dozen sites. Find what you need here.",
    features: ["Grants & funding opportunities", "Equipment and studio resources", "Career development guides", "Workshop recordings & tutorials"],
    accent: "#0F0F0F",
    dark: false,
  },
  {
    number: "03",
    title: "Community Portal",
    tagline: "Find your people. Build something together.",
    description: "BMAC's member portal is a living network of Boston creatives. Browse profiles by discipline, reach out for collaborations, find a co-director, a composer, a photographer. The platform is designed to spark real connections that lead to real projects.",
    features: ["Searchable member directory", "Collaboration matchmaking", "Direct messaging", "Portfolio showcasing"],
    accent: "#E8474A",
    dark: true,
  },
  {
    number: "04",
    title: "Events & Experiences",
    tagline: "Community built in person, not just online.",
    description: "BMAC hosts screenings, workshops, portfolio reviews, and social events throughout the year. These events are genuine experiences designed to bring Boston's creative community together in ways that feel meaningful, not transactional.",
    features: ["Film screenings & premieres", "Skill-building workshops", "Portfolio review sessions", "Social mixers & meetups"],
    accent: "#0F0F0F",
    dark: false,
  },
  {
    number: "05",
    title: "Opportunity Board",
    tagline: "The right opportunity at the right time.",
    description: "BMAC aggregates and vets opportunities from across Boston and beyond: internships, freelance gigs, full-time roles, residencies, and grants. Every listing is relevant to media artists. No noise, no irrelevant postings. Just real opportunities from people who understand creative work.",
    features: ["Vetted job & freelance listings", "Residency & fellowship alerts", "Grant & funding notices", "Submission calls for festivals & publications"],
    accent: "#E8474A",
    dark: true,
  },
  {
    number: "06",
    title: "New Experiences",
    tagline: "Go beyond networking. Find your next chapter.",
    description: "BMAC is designed to help you discover things you didn't know you were looking for — a collaborator who becomes a close friend, a project that changes your career, an event that opens a door you didn't know existed. This is a community built for the full creative life.",
    features: ["Mentorship connections", "Cross-discipline collaborations", "Community-led initiatives", "A space that grows with you"],
    accent: "#0F0F0F",
    dark: false,
  },
];

// ─── Community Portal Mock Preview ───────────────────────────────────────────
const mockProfiles = [
  { name: "Maya R.", role: "Filmmaker", tags: ["Documentary"], avatar: "MR", color: "#E8474A" },
  { name: "Jordan K.", role: "Photographer", tags: ["Editorial"], avatar: "JK", color: "#7B3FBE" },
  { name: "Sam T.", role: "Music Producer", tags: ["Electronic", "Score"], avatar: "ST", color: "#1A7A4A" },
  { name: "Priya N.", role: "Motion Designer", tags: ["2D", "Brand"], avatar: "PN", color: "#C47A1E" },
  { name: "Alex W.", role: "Illustrator", tags: ["Editorial", "Concept"], avatar: "AW", color: "#1E5FAA" },
  { name: "Cleo M.", role: "Podcast Producer", tags: ["Interview", "Narrative"], avatar: "CM", color: "#A83260" },
];

function CommunityPortalPreview({ dark }: { dark: boolean }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % mockProfiles.length), 2200);
    return () => clearInterval(t);
  }, []);

  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const bg = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const textPrimary = dark ? "#FFFFFF" : "#0F0F0F";
  const textMuted = dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";

  return (
    <div style={{
      borderRadius: "16px",
      border: `1px solid ${border}`,
      overflow: "hidden",
      background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    }}>
      {/* Header bar */}
      <div style={{
        padding: "0.85rem 1.25rem",
        borderBottom: `1px solid ${border}`,
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8474A", opacity: 0.8 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" }} />
        <span style={{ marginLeft: "auto", fontFamily: "'DM Sans'", fontSize: "0.72rem", color: textMuted, letterSpacing: "0.06em" }}>BMAC MEMBER DIRECTORY</span>
      </div>
      {/* Search bar */}
      <div style={{ padding: "0.85rem 1.25rem", borderBottom: `1px solid ${border}` }}>
        <div style={{
          background: bg,
          border: `1px solid ${border}`,
          borderRadius: "8px",
          padding: "0.5rem 0.85rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontFamily: "'DM Sans'", fontSize: "0.78rem", color: textMuted }}>Search by discipline, name, or skill…</span>
        </div>
      </div>
      {/* Profile list */}
      <div style={{ padding: "0.5rem 0" }}>
        {mockProfiles.map((p, i) => (
          <div
            key={p.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              padding: "0.7rem 1.25rem",
              background: active === i ? (dark ? "rgba(232,71,74,0.08)" : "rgba(232,71,74,0.05)") : "transparent",
              borderLeft: active === i ? "2px solid #E8474A" : "2px solid transparent",
              transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: p.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "0.65rem",
              color: "#FFFFFF",
              flexShrink: 0,
              opacity: active === i ? 1 : 0.55,
              transition: "opacity 0.4s ease",
            }}>
              {p.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.82rem", color: active === i ? textPrimary : textMuted, transition: "color 0.4s ease", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {p.name}
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: "0.72rem", color: textMuted, marginTop: "1px" }}>{p.role}</div>
            </div>
            <div style={{ display: "flex", gap: "0.35rem", flexShrink: 0 }}>
              {p.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "0.65rem",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "999px",
                  background: active === i ? "rgba(232,71,74,0.15)" : bg,
                  color: active === i ? "#E8474A" : textMuted,
                  border: `1px solid ${active === i ? "rgba(232,71,74,0.3)" : border}`,
                  transition: "all 0.4s ease",
                  whiteSpace: "nowrap",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Opportunity Board Mock Preview ──────────────────────────────────────────
const mockOpps = [
  { type: "Job", title: "Cinematographer", org: "GBH Boston", pay: "$65k–$80k", tag: "Full-time", tagColor: "#1A7A4A", fresh: true },
  { type: "Grant", title: "New England Film Grant", org: "NEF Foundation", pay: "Up to $10k", tag: "Deadline: Jun 30", tagColor: "#C47A1E", fresh: false },
  { type: "Freelance", title: "Brand Photographer", org: "Local Startup", pay: "$800/day", tag: "Short-term", tagColor: "#1E5FAA", fresh: true },
  { type: "Residency", title: "Artist Residency", org: "MASS MoCA", pay: "Stipend + housing", tag: "Summer 2026", tagColor: "#7B3FBE", fresh: false },
  { type: "Open Call", title: "Short Film Festival", org: "Boston IFF", pay: "Prizes + screening", tag: "Submissions open", tagColor: "#E8474A", fresh: true },
];

function OpportunityBoardPreview({ dark }: { dark: boolean }) {
  const [highlighted, setHighlighted] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHighlighted(p => (p + 1) % mockOpps.length), 2400);
    return () => clearInterval(t);
  }, []);

  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const bg = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const textPrimary = dark ? "#FFFFFF" : "#0F0F0F";
  const textMuted = dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";

  return (
    <div style={{
      borderRadius: "16px",
      border: `1px solid ${border}`,
      overflow: "hidden",
      background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    }}>
      {/* Header */}
      <div style={{
        padding: "0.85rem 1.25rem",
        borderBottom: `1px solid ${border}`,
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8474A", opacity: 0.8 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" }} />
        <span style={{ marginLeft: "auto", fontFamily: "'DM Sans'", fontSize: "0.72rem", color: textMuted, letterSpacing: "0.06em" }}>BMAC OPPORTUNITY BOARD</span>
      </div>
      {/* Filter chips */}
      <div style={{ padding: "0.75rem 1.25rem", borderBottom: `1px solid ${border}`, display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        {["All", "Jobs", "Grants", "Freelance", "Residencies"].map((f, i) => (
          <span key={f} style={{
            fontFamily: "'DM Sans'",
            fontSize: "0.68rem",
            padding: "0.25rem 0.65rem",
            borderRadius: "999px",
            background: i === 0 ? "#E8474A" : bg,
            color: i === 0 ? "#FFFFFF" : textMuted,
            border: `1px solid ${i === 0 ? "#E8474A" : border}`,
          }}>{f}</span>
        ))}
      </div>
      {/* Listings */}
      <div style={{ padding: "0.5rem 0" }}>
        {mockOpps.map((opp, i) => (
          <div
            key={opp.title}
            style={{
              padding: "0.85rem 1.25rem",
              borderBottom: i < mockOpps.length - 1 ? `1px solid ${border}` : "none",
              background: highlighted === i ? (dark ? "rgba(232,71,74,0.07)" : "rgba(232,71,74,0.04)") : "transparent",
              borderLeft: highlighted === i ? "2px solid #E8474A" : "2px solid transparent",
              transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "0.65rem",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "4px",
                    background: opp.tagColor + "22",
                    color: opp.tagColor,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}>{opp.type}</span>
                  {opp.fresh && (
                    <span style={{ fontFamily: "'DM Sans'", fontSize: "0.62rem", color: "#1A7A4A", fontWeight: 600 }}>● New</span>
                  )}
                </div>
                <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.82rem", color: highlighted === i ? textPrimary : (dark ? "rgba(255,255,255,0.75)" : "#1A1A1A"), transition: "color 0.4s ease", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {opp.title}
                </div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: "0.72rem", color: textMuted, marginTop: "2px" }}>{opp.org}</div>
              </div>
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.78rem", color: highlighted === i ? "#E8474A" : textMuted, transition: "color 0.4s ease" }}>{opp.pay}</div>
                <div style={{
                  marginTop: "0.3rem",
                  fontFamily: "'DM Sans'",
                  fontSize: "0.65rem",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "999px",
                  background: opp.tagColor + "18",
                  color: opp.tagColor,
                  whiteSpace: "nowrap",
                }}>{opp.tag}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Service Block ────────────────────────────────────────────────────────────
function ServiceBlock({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useReveal(index % 2 === 0 ? 0 : 80);
  const [hovered, setHovered] = useState(false);

  const isEven = index % 2 === 0;
  const hasMockPreview = service.number === "03" || service.number === "05";

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        backgroundColor: service.dark ? "#0F0F0F" : "#FFFFFF",
        padding: "clamp(3rem, 6vw, 5rem) 0",
        borderBottom: "1px solid",
        borderColor: service.dark ? "rgba(255,255,255,0.06)" : "#E8E8E8",
      }}
    >
      <div className="container">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${isEven ? "" : "lg:[direction:rtl]"}`}
        >
          {/* Left: Number + Title + Description */}
          <div style={{ direction: "ltr" }}>
            <div
              className="pillar-num-gradient service-num"
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: "clamp(5rem, 10vw, 8rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                userSelect: "none",
              }}
            >
              {service.number}
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: service.dark ? "#FFFFFF" : "#0F0F0F",
              marginBottom: "0.5rem",
            }}>
              {service.title}
            </h2>
            <p style={{
              fontFamily: "'DM Sans'",
              fontWeight: 400,
              fontSize: "1rem",
              color: "#E8474A",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "1.75rem",
            }}>
              {service.tagline}
            </p>
            <p style={{
              fontFamily: "'DM Sans'",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: service.dark ? "rgba(255,255,255,0.65)" : "#3A3A3A",
              lineHeight: 1.75,
              maxWidth: "480px",
            }}>
              {service.description}
            </p>
          </div>

          {/* Right: Mock preview (for 03 & 05) OR feature list */}
          <div style={{ direction: "ltr" }}>
            {hasMockPreview ? (
              <>
                {service.number === "03" && <CommunityPortalPreview dark={service.dark} />}
                {service.number === "05" && <OpportunityBoardPreview dark={service.dark} />}
                {/* Feature list below preview */}
                <div style={{
                  borderLeft: `3px solid #E8474A`,
                  paddingLeft: "2rem",
                  marginTop: "2rem",
                }}>
                  {service.features.map((feature, fi) => (
                    <div
                      key={fi}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.85rem 0",
                        borderBottom: "1px solid",
                        borderColor: service.dark ? "rgba(255,255,255,0.06)" : "#EFEFEF",
                      }}
                    >
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#E8474A", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans'", fontWeight: 400, fontSize: "0.95rem", color: service.dark ? "rgba(255,255,255,0.8)" : "#1A1A1A" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <Link
                    href={withBase("/notify-me")}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      backgroundColor: hovered ? "#d63a3d" : "#E8474A",
                      color: "#FFFFFF",
                      fontFamily: "'Space Grotesk'",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      letterSpacing: "0.06em",
                      padding: "0.75rem 1.75rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      transition: "background-color 0.2s ease, transform 0.15s ease",
                      transform: hovered ? "translateY(-2px)" : "translateY(0)",
                    }}
                  >
                    Notify Me
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div style={{
                  borderLeft: `3px solid #E8474A`,
                  paddingLeft: "2rem",
                  marginTop: "1rem",
                }}>
                  {service.features.map((feature, fi) => (
                    <div
                      key={fi}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1.1rem 0",
                        borderBottom: "1px solid",
                        borderColor: service.dark ? "rgba(255,255,255,0.06)" : "#EFEFEF",
                      }}
                    >
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#E8474A", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans'", fontWeight: 400, fontSize: "1rem", color: service.dark ? "rgba(255,255,255,0.8)" : "#1A1A1A", lineHeight: 1.5 }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "2.5rem" }}>
                  <Link
                    href={withBase("/notify-me")}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      backgroundColor: hovered ? "#d63a3d" : "#E8474A",
                      color: "#FFFFFF",
                      fontFamily: "'Space Grotesk'",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      letterSpacing: "0.06em",
                      padding: "0.75rem 1.75rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      transition: "background-color 0.2s ease, transform 0.15s ease",
                      transform: hovered ? "translateY(-2px)" : "translateY(0)",
                    }}
                  >
                    Notify Me
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{
      backgroundColor: "#E8474A",
      padding: "clamp(4rem, 8vw, 8rem) 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative large circle */}
      <div style={{
        position: "absolute",
        right: "-15vw",
        top: "50%",
        transform: "translateY(-50%)",
        width: "55vw",
        height: "55vw",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.15)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        right: "-22vw",
        top: "50%",
        transform: "translateY(-50%)",
        width: "70vw",
        height: "70vw",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.08)",
        pointerEvents: "none",
      }} />

      <div className="container relative z-10">
        <div ref={ref} className="reveal">
          <p style={{
            fontFamily: "'Space Grotesk'",
            fontWeight: 700,
            fontSize: "0.78rem",
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.65)",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>
            Stay Connected
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk'",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            marginBottom: "2rem",
            maxWidth: "800px",
          }}>
            Your community is waiting for you.
          </h2>
          <p style={{
            fontFamily: "'DM Sans'",
            fontWeight: 300,
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.65,
            maxWidth: "520px",
            marginBottom: "3rem",
          }}>
            We're on a brief hiatus but BMAC will be back. Leave your email and be the first to know when membership reopens.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={withBase("/notify-me")}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                backgroundColor: "#FFFFFF",
                color: "#E8474A",
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "0.04em",
                padding: "1rem 2.5rem",
                borderRadius: "999px",
                textDecoration: "none",
                transition: "transform 0.15s ease, box-shadow 0.2s ease",
                transform: hovered ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.2)" : "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              Notify Me When We're Back
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href={withBase("/login")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'Space Grotesk'",
                fontWeight: 500,
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                padding: "1rem 2rem",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "999px",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
              }}
            >
              Already a member? Log in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main>
        <ServicesHero />
        <StatsBar />
        {services.map((service, i) => (
          <ServiceBlock key={service.number} service={service} index={i} />
        ))}
        <FinalCTA />
      </main>
      <Footer />
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.23,1,0.32,1), transform 0.75s cubic-bezier(0.23,1,0.32,1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
