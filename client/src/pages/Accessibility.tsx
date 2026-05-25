/**
 * BMAC Accessibility Statement Page
 */
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { withBase } from "@/lib/paths";

export default function Accessibility() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav />
      <main style={{ flex: 1, paddingTop: "8rem", paddingBottom: "8rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.22em",
                color: "#E8474A",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Legal
            </span>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#0F0F0F",
                margin: 0,
              }}
            >
              Accessibility Statement
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "#888",
                marginTop: "1rem",
              }}
            >
              Effective Date: January 1, {year}
            </p>
          </div>

          <div style={{ borderTop: "1px solid #E8E8E8", paddingTop: "2.5rem" }}>
            <LegalSection title="Our Commitment">
              <p>
                At the Boston Media Artists Collective (BMAC), we believe that creativity belongs to everyone. We are committed to making our website and digital services as accessible and inclusive as possible for people of all abilities, backgrounds, and circumstances.
              </p>
              <p>
                We aim to ensure our website is designed and developed in alignment with best practices and standards defined by the <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong>, Level AA, wherever feasible.
              </p>
            </LegalSection>

            <LegalSection title="What We're Doing">
              <p>Our accessibility efforts include:</p>
              <ul>
                <li>Using clear, legible fonts with sufficient size and weight for readability</li>
                <li>Maintaining adequate color contrast between text and background elements</li>
                <li>Ensuring our site is navigable by keyboard-only users</li>
                <li>Providing descriptive alternative text for images and meaningful link labels</li>
                <li>Designing with screen reader compatibility in mind</li>
                <li>Avoiding flashing or rapidly blinking content that may affect users with photosensitivity</li>
                <li>Structuring content with semantic HTML for logical reading order</li>
              </ul>
            </LegalSection>

            <LegalSection title="Ongoing Improvements">
              <p>
                We recognize that accessibility is an ongoing journey, not a one-time checklist. We regularly review our website and content to identify areas for improvement and implement changes that make our digital space more usable and welcoming for everyone.
              </p>
              <p>
                As our community grows and our platform evolves, we are committed to keeping accessibility a core part of how we build and maintain our online presence.
              </p>
            </LegalSection>

            <LegalSection title="Known Limitations">
              <p>
                While we strive to meet WCAG 2.1 Level AA standards, some areas of our site may not yet fully conform. We are actively working to address these gaps. If you encounter a specific barrier, please let us know — your feedback directly informs our improvements.
              </p>
            </LegalSection>

            <LegalSection title="Need Help or Have Feedback?">
              <p>
                If you experience any difficulty accessing content on our website, or if you have suggestions for how we can improve accessibility, we genuinely want to hear from you. We value your input and will make reasonable efforts to resolve any accessibility issues promptly.
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:bostonmediaartistscollective@gmail.com" style={{ color: "#E8474A", textDecoration: "none" }}>
                  bostonmediaartistscollective@gmail.com
                </a>
              </p>
              <p>
                We want all visitors to feel welcome and at home in the BMAC community.
              </p>
            </LegalSection>

            <LegalSection title="Third-Party Content">
              <p>
                Some content on our site may be provided by or linked to third-party platforms (such as Instagram, LinkedIn, or our member portal). While we encourage these platforms to maintain accessible experiences, we cannot guarantee their compliance with accessibility standards. Please contact those services directly for accessibility-related concerns.
              </p>
            </LegalSection>
          </div>

          {/* Back link */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #E8E8E8" }}>
            <a
              href={withBase("/")}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                color: "#E8474A",
                textDecoration: "none",
                letterSpacing: "0.04em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1.2rem",
          color: "#0F0F0F",
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "1rem",
          color: "#3A3A3A",
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </div>
  );
}
