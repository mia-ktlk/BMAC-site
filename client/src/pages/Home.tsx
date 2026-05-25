/**
 * BMAC — Boston Media Artists Collective
 * Design: Bauhaus Kinetic Minimalism
 * Colors: #0F0F0F (dark) | #FFFFFF (white) | #E8474A (red) | #F5F4F0 (off-white)
 * Fonts: Space Grotesk (display) | DM Sans (body)
 */
import { useEffect, useRef, useState, useCallback } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { withBase } from "@/lib/paths";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const words = ["Boston", "Media", "Artists", "Collective"];

  // Gradient shifts with mouse: red, orange, purple blend
  const gx = Math.round(mouse.x * 100);
  const gy = Math.round(mouse.y * 100);
  const gradientBg = `
    radial-gradient(ellipse 80% 60% at ${gx}% ${gy}%, rgba(232,71,74,0.38) 0%, transparent 65%),
    radial-gradient(ellipse 60% 50% at ${100 - gx}% ${100 - gy}%, rgba(120,40,180,0.28) 0%, transparent 60%),
    radial-gradient(ellipse 70% 55% at ${50 + (mouse.x - 0.5) * 30}% ${30 + (mouse.y - 0.5) * 20}%, rgba(230,100,30,0.22) 0%, transparent 55%),
    #0a0a0f
  `;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: gradientBg, transition: "background 0.6s ease" }}
      onMouseMove={handleMouseMove}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`,
          zIndex: 1,
        }}
      />

      {/* Decorative circles (Bauhaus motif) */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-8vw",
          top: "50%",
          transform: `translateY(-50%) translateX(${(mouse.x - 0.5) * -18}px)`,
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          border: "1px solid rgba(232,71,74,0.2)",
          transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-14vw",
          top: "50%",
          transform: `translateY(-50%) translateX(${(mouse.x - 0.5) * -10}px)`,
          width: "68vw",
          height: "68vw",
          borderRadius: "50%",
          border: "1px solid rgba(120,40,180,0.12)",
          transition: "transform 0.9s cubic-bezier(0.23,1,0.32,1)",
          zIndex: 1,
        }}
      />
      {/* Small accent circle top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "8vw",
          top: "18%",
          transform: `translateX(${(mouse.x - 0.5) * 12}px) translateY(${(mouse.y - 0.5) * 8}px)`,
          width: "18vw",
          height: "18vw",
          borderRadius: "50%",
          border: "1px solid rgba(230,100,30,0.14)",
          transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="container relative pb-20 pt-40" style={{ zIndex: 2 }}>
        {/* BMAC acronym — slow breathing pulse */}
        <div
          className="mb-6"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s cubic-bezier(0.23,1,0.32,1), transform 0.6s cubic-bezier(0.23,1,0.32,1)",
            transitionDelay: "0ms",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
              letterSpacing: "0.25em",
              color: "#E8474A",
              textTransform: "uppercase",
              animation: loaded ? "subtlePulse 5s ease-in-out infinite" : "none",
            }}
          >
            BMAC
          </span>
        </div>

        {/* Main headline — staggered word reveal with slow float */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.8rem, 7.2vw, 7.2rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          {words.map((word, i) => (
            <span
              key={word}
              style={{
                display: "block",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 1.0s cubic-bezier(0.23,1,0.32,1) ${120 + i * 130}ms, transform 1.0s cubic-bezier(0.23,1,0.32,1) ${120 + i * 130}ms`,
                animation: loaded ? `heroFloat ${3.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` : "none",
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Tagline + CTA row */}
        <div
          className="flex flex-col md:flex-row md:items-end gap-8 mt-12"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.23,1,0.32,1) 700ms, transform 0.8s cubic-bezier(0.23,1,0.32,1) 700ms",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "480px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Uniting media artists in the Greater Boston area for creative projects, community, and networking.
          </p>
          <div className="flex gap-4 flex-shrink-0">
            <a
              href="#about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
                padding: "0.85rem 2rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.25)",
                textDecoration: "none",
                transition: "border-color 0.2s ease, transform 0.15s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
      `}</style>
    </section>
  );
}

// ─── Marquee Ticker ────────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    "Film", "Photography", "Music", "Design", "Animation", "Illustration",
    "Video", "Podcasting", "Motion Graphics", "Storytelling",
  ];
  const repeated = [...items, ...items, ...items];
  return (
    <div
      style={{
        backgroundColor: "#E8474A",
        padding: "0.9rem 0",
        overflow: "hidden",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "3rem",
          animation: "marquee 28s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              display: "inline-flex",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            {item}
            <span style={{ opacity: 0.5, fontSize: "0.5rem" }}>●</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutText() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal">
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
          color: "#3A3A3A",
          lineHeight: 1.75,
          marginBottom: "1.5rem",
        }}
      >
        Vidisha and AJ met at the student-led Northeastern University film festival. Chatting with other students, they commiserated about the challenges of creating media with limited resources and collaborators.
      </p>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
          color: "#3A3A3A",
          lineHeight: 1.75,
          marginBottom: "2rem",
        }}
      >
        They wished there was a central platform where creatives could connect for passion projects and learn about job opportunities. Thus, the Boston Media Artists Collective was created.
      </p>
      <blockquote
        style={{
          borderLeft: "3px solid #E8474A",
          paddingLeft: "1.5rem",
          margin: 0,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 500,
          fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
          color: "#0F0F0F",
          fontStyle: "italic",
          lineHeight: 1.6,
        }}
      >
        "To unite media artists in the Greater Boston area for creative projects, community, and networking."
      </blockquote>
    </div>
  );
}

function About() {
  const labelRef = useReveal();
  const headingRef = useReveal();

  return (
    <section id="about" style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)" }}>
      <div className="container">
        {/* Section label */}
        <div ref={labelRef} className="reveal flex items-center gap-4 section-label-row">
          <span style={{ color: "#E8474A", fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            01 — About
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E8E8" }} />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Heading */}
          <div ref={headingRef} className="reveal">
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
fontSize: "clamp(1.6rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0F0F0F",
              margin: 0,
              }}
            >
              Where Boston
              <br />
              creatives
              <br />
              <span style={{ color: "#E8474A" }}>connect.</span>
            </h2>
          </div>

          {/* Right: Text */}
          <AboutText />
        </div>
      </div>
    </section>
  );
}

// ─── Goals / Six Pillars Section ──────────────────────────────────────────────
const goals = [
  {
    num: "01",
    title: "Network",
    desc: "Establish a network for local media arts creators to find collaborators, mentors, and peers.",
    icon: "◎",
  },
  {
    num: "02",
    title: "Accessible Space",
    desc: "Create a free and accessible online space for the Boston-based media arts community.",
    icon: "◈",
  },
  {
    num: "03",
    title: "Foster Community",
    desc: "Build genuine relationships between media artists across disciplines and backgrounds.",
    icon: "◉",
  },
  {
    num: "04",
    title: "Online Resource",
    desc: "Serve as a central hub for tools, tutorials, opportunities, and creative resources.",
    icon: "◐",
  },
  {
    num: "05",
    title: "Events",
    desc: "Organize screenings, workshops, and meetups that bring the community together in person.",
    icon: "◑",
  },
  {
    num: "06",
    title: "New Opportunities",
    desc: "Go beyond typical networking to help members find new friends, environments, and experiences.",
    icon: "◒",
  },
];

function GoalCard({ goal, index }: { goal: typeof goals[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 90);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: "opacity 0.65s cubic-bezier(0.23,1,0.32,1), transform 0.65s cubic-bezier(0.23,1,0.32,1)",
        padding: "2rem 1.75rem",
        backgroundColor: hovered ? "#FFFFFF" : "transparent",
        borderTop: "1px solid #D8D7D3",
        borderRight: "1px solid #D8D7D3",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated background fill on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#E8474A",
          transform: hovered ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          className={hovered ? "pillar-num-hover" : "pillar-num-gradient"}
          style={{
            fontFamily: "'Space Grotesk'",
            fontWeight: 700,
            fontSize: "3rem",
            lineHeight: 1,
            marginBottom: "1.25rem",
            transition: "color 0.3s ease, -webkit-text-fill-color 0.3s ease",
          }}
        >
          {goal.num}
        </div>
        <h3
          style={{
            fontFamily: "'Space Grotesk'",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: hovered ? "#FFFFFF" : "#0F0F0F",
            marginBottom: "0.6rem",
            letterSpacing: "-0.02em",
            transition: "color 0.3s ease",
          }}
        >
          {goal.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans'",
            fontWeight: 300,
            fontSize: "0.92rem",
            color: hovered ? "rgba(255,255,255,0.85)" : "#5A5A5A",
            lineHeight: 1.65,
            margin: 0,
            transition: "color 0.3s ease",
          }}
        >
          {goal.desc}
        </p>
      </div>
    </div>
  );
}

function Goals() {
  const labelRef = useReveal();
  const headingRef = useReveal();

  return (
    <section id="goals" style={{ backgroundColor: "#F5F4F0", paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)" }}>
      <div className="container">
        {/* Section label */}
        <div ref={labelRef} className="reveal flex items-center gap-4 section-label-row">
          <span style={{ color: "#E8474A", fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            02 — Our Pillars
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#D8D7D3" }} />
        </div>

        {/* Heading */}
        <div ref={headingRef} className="reveal mb-2">
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0F0F0F",
              maxWidth: "700px",
            }}
          >
            Six pillars of a
            <br />
            thriving creative
            <br />
            <span style={{ color: "#E8474A" }}>ecosystem.</span>
          </h2>
        </div>

        {/* Goals grid — 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16"
          style={{ borderLeft: "1px solid #D8D7D3", borderBottom: "1px solid #D8D7D3" }}
        >
          {goals.map((goal, i) => (
            <GoalCard key={goal.num} goal={goal} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────
const team = [
  {
    name: "Vidisha Agarwalla",
    role: "Founder & Co-President",
    photo: "/images/team-vidisha.webp",
    bio: "Vidisha Agarwalla (she/her) is a Communications and Marketing Expert, Actor, and Creative from Singapore. She is currently the Communications and Operations Specialist at the Associates of the Boston Public Library. Originally from Singapore, Vidisha strives to diversify the theatre and performing arts communities. She is looking forward to continuing to work in the arts in Boston. To connect over theatre (or the best Bubble Tea places in Boston).",
  },
  {
    name: "Anna Julia (AJ)",
    role: "Founder & Co-President",
    photo: "/images/team-aj.webp",
    bio: "Anna Julia (she/her), also known as AJ, is a media creator and brand consultant from Boston, MA. She has experience working in brand direction, social media management, influencer marketing, and design. She also runs her own studio, Anna Julia Studios, specializing in commercial production for local brands. AJ graduated from Northeastern University in 2023, and she continues to live and work in the Boston area.",
  },
  {
    name: "Katelyn Paddock",
    role: "Development Manager",
    photo: "/images/team-katelyn.webp",
    bio: "Katelyn Paddock is a Boston-based theatre artist and arts administrator. Katelyn loves projects of all shapes and sizes, but particularly enjoys new work development, accessibility at all levels of the artistic experience, and challenging the idea of what good art is, who it is for, or what it should be. She is the Operations Supervisor for the Huntington Theatre and has collaborated with arts organizations throughout New England, including Foul Contending Rebels Theatre Collective, Playhouse on Park, Fresh Ink Theatre, Saint Michael's Playhouse, Vermont Stage Company, and Hovey Players.",
  },
];

function TeamCard({ member, delay, isOpen, onToggle }: {
  member: typeof team[0];
  delay: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.65s cubic-bezier(0.23,1,0.32,1), transform 0.65s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        aria-expanded={isOpen}
      >
        {/* Photo with circle mask */}
        <div
          style={{
            width: "100%",
            maxWidth: "min(75vw, 300px)",
            aspectRatio: "1",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "1.25rem",
            outline: isOpen ? "3px solid #E8474A" : "3px solid transparent",
            outlineOffset: "4px",
            transition: "outline-color 0.3s ease, transform 0.35s cubic-bezier(0.23,1,0.32,1)",
            transform: isOpen ? "scale(1.03)" : "scale(1)",
            flexShrink: 0,
          }}
        >
          <img
            src={withBase(member.photo)}
            alt={member.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              filter: isOpen ? "none" : "grayscale(15%)",
              transition: "filter 0.35s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "0.5rem" }}>
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#0F0F0F",
                letterSpacing: "-0.02em",
                marginBottom: "0.25rem",
                lineHeight: 1.3,
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontWeight: 400,
                fontSize: "0.78rem",
                color: "#E8474A",
                margin: 0,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {member.role}
            </p>
          </div>
          {/* Toggle icon */}
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1px solid",
              borderColor: isOpen ? "#E8474A" : "#D8D7D3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "border-color 0.2s ease, background-color 0.2s ease",
              backgroundColor: isOpen ? "#E8474A" : "transparent",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{
                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              <path d="M5 1v8M1 5h8" stroke={isOpen ? "#fff" : "#0F0F0F"} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

// Bio content shared between inline (mobile) and full-width row (desktop)
function BioPanelContent({ member }: { member: typeof team[0] }) {
  return (
    <div
      className="team-bio-panel"
      style={{
        backgroundColor: "#0F0F0F",
        padding: "clamp(1.25rem, 3vw, 2rem) clamp(1rem, 3vw, 2.5rem)",
        margin: "0.5rem 0 1.5rem",
        borderLeft: "3px solid #E8474A",
      }}
    >
      <div className="team-bio-photo">
        <img
          src={withBase(member.photo)}
          alt={member.name}
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />
      </div>
      <div className="team-bio-identity">
        <p style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: "0.95rem", color: "#FFFFFF", marginBottom: "0.25rem" }}>
          {member.name}
        </p>
        <p style={{ fontFamily: "'DM Sans'", fontWeight: 400, fontSize: "0.75rem", color: "#E8474A", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
          {member.role}
        </p>
      </div>
      <div className="team-bio-text">
        <p
          className="team-bio-body"
          style={{
            fontFamily: "'DM Sans'",
            fontWeight: 300,
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  );
}

// Animated height wrapper — uses ResizeObserver to always get the true content height
function AnimatedBio({ member, isOpen }: { member: typeof team[0]; isOpen: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure real height whenever content renders or resizes
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContentHeight(el.scrollHeight);
    });
    ro.observe(el);
    // Initial measure
    setContentHeight(el.scrollHeight);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
        height: isOpen ? `${contentHeight}px` : "0px",
        transition: "height 0.45s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <div ref={contentRef}>
        <BioPanelContent member={member} />
      </div>
    </div>
  );
}

// Desktop-only: full-width bio row spanning all 3 columns
function TeamBioRow({ member, isOpen }: { member: typeof team[0]; isOpen: boolean }) {
  return (
    <div style={{ gridColumn: "1 / -1" }}>
      <AnimatedBio member={member} isOpen={isOpen} />
    </div>
  );
}

function Team() {
  const labelRef = useReveal();
  const headingRef = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex(prev => (prev === i ? null : i));
  };

  return (
    <section id="team" style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)" }}>
      <div className="container">
        {/* Section label */}
        <div ref={labelRef} className="reveal flex items-center gap-4 section-label-row">
          <span style={{ color: "#E8474A", fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            03 — Team
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E8E8" }} />
        </div>

        {/* Heading */}
        <div ref={headingRef} className="reveal mb-16 section-heading-after-label">
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0F0F0F",
            }}
          >
            The people
            <br />
            behind the
            <br />
            <span style={{ color: "#E8474A" }}>collective.</span>
          </h2>
        </div>

        {/* Team grid — 3 members, single row */}
        {/* Mobile: single column, bio appears inline under each card */}
        {/* Desktop (sm+): 3-column grid, bio spans full width below the row */}

        {/* Mobile layout: stack each card + its bio */}
        <div className="sm:hidden flex flex-col gap-10">
          {team.map((member, index) => (
            <div key={member.name}>
              <TeamCard
                member={member}
                delay={index * 100}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
              <AnimatedBio member={member} isOpen={openIndex === index} />
            </div>
          ))}
        </div>

        {/* Desktop layout: 3-column grid with full-width bio row */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-3 gap-10 lg:gap-16">
            {team.map((member, index) => (
              <TeamCard
                key={member.name}
                member={member}
                delay={index * 100}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
            {openIndex !== null && (
              <TeamBioRow
                member={team[openIndex]}
                isOpen={true}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Join CTA Section ─────────────────────────────────────────────────────────
function JoinCTA() {
  const ref = useReveal();

  return (
    <section
      style={{
        backgroundColor: "#0F0F0F",
        paddingTop: "clamp(4rem, 8vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: "absolute",
        left: "-10vw",
        top: "50%",
        transform: "translateY(-50%)",
        width: "50vw",
        height: "50vw",
        borderRadius: "50%",
        border: "1px solid rgba(232,71,74,0.12)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        left: "-18vw",
        top: "50%",
        transform: "translateY(-50%)",
        width: "65vw",
        height: "65vw",
        borderRadius: "50%",
        border: "1px solid rgba(120,40,180,0.08)",
        pointerEvents: "none",
      }} />

      <div className="container relative z-10">
        <div ref={ref} className="reveal">
          <div className="flex items-center gap-4 section-label-row section-label-row--join">
            <span style={{ color: "#E8474A", fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              04 — Join
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end gap-12">
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                Ready to
                <br />
                create
                <br />
                <span style={{ color: "#E8474A" }}>together?</span>
              </h2>
            </div>
            <div style={{ maxWidth: "480px" }}>
              <p style={{
                fontFamily: "'DM Sans'",
                fontWeight: 300,
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
              }}>
                BMAC is a free platform for Boston-area media artists. Whether you're a filmmaker, photographer, musician, or designer — there's a place for you here.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={withBase("/login")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "transparent",
                    color: "rgba(255,255,255,0.75)",
                    fontFamily: "'Space Grotesk'",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    letterSpacing: "0.04em",
                    padding: "0.9rem 2.2rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    textDecoration: "none",
                    transition: "border-color 0.2s ease, color 0.2s ease, transform 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Log In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  // Handle cross-page anchor navigation (from footer or other pages)
  useEffect(() => {
    const anchor = sessionStorage.getItem("scrollTo");
    if (anchor) {
      sessionStorage.removeItem("scrollTo");
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < 12) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      setTimeout(() => tryScroll(), 120);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Goals />
        <Team />
        <JoinCTA />
      </main>
      <Footer />
    </div>
  );
}
