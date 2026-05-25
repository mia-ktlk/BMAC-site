/**
 * BMAC Privacy Policy Page
 */
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { withBase } from "@/lib/paths";

export default function PrivacyPolicy() {
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
              Privacy Policy
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
            <LegalSection title="Introduction">
              <p>
                At the Boston Media Artists Collective (BMAC), your privacy and trust matter to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services. By accessing our platform, you agree to the practices described in this policy.
              </p>
            </LegalSection>

            <LegalSection title="1. What We Collect">
              <p>We may collect the following types of information:</p>
              <ul>
                <li>Name, email address, and other contact information you provide when signing up or reaching out</li>
                <li>Profile information such as your creative discipline, bio, and portfolio links</li>
                <li>Technical data including IP address, browser type, and usage patterns (via analytics tools)</li>
                <li>Communications you send to us directly</li>
              </ul>
            </LegalSection>

            <LegalSection title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve the BMAC platform and community experience</li>
                <li>Send important updates, community announcements, and event information</li>
                <li>Connect members with collaborators, opportunities, and resources</li>
                <li>Understand how our platform is used so we can make it better</li>
              </ul>
              <p>We do <strong>not</strong> sell or rent your personal data to third parties.</p>
            </LegalSection>

            <LegalSection title="3. Third-Party Services">
              <p>BMAC uses third-party tools to operate our platform, including:</p>
              <ul>
                <li><strong>Softr</strong> — for member sign-up, login, and profile management</li>
                <li><strong>Google Analytics</strong> — for anonymous website usage analytics</li>
                <li><strong>Instagram / LinkedIn</strong> — for social media presence (governed by their own privacy policies)</li>
              </ul>
              <p>We encourage you to review the privacy policies of these services when interacting with them.</p>
            </LegalSection>

            <LegalSection title="4. Cookies & Tracking">
              <p>
                Our website may use cookies and similar tracking technologies to understand how visitors interact with our site. You can adjust your browser settings to block or delete cookies at any time. Note that some features may not function properly without cookies enabled.
              </p>
            </LegalSection>

            <LegalSection title="5. Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li>Request access to the personal data we hold about you</li>
                <li>Ask us to correct or update inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt out of promotional emails at any time by using the unsubscribe link or contacting us directly</li>
              </ul>
            </LegalSection>

            <LegalSection title="6. Data Security">
              <p>
                We take reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the internet is completely secure. We encourage you to use strong passwords and to contact us immediately if you suspect any unauthorized access to your account.
              </p>
            </LegalSection>

            <LegalSection title="7. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the effective date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </LegalSection>

            <LegalSection title="8. Contact Us">
              <p>
                If you have questions, concerns, or requests related to this Privacy Policy, please reach out to us:
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:bostonmediaartistscollective@gmail.com" style={{ color: "#E8474A", textDecoration: "none" }}>
                  bostonmediaartistscollective@gmail.com
                </a>
              </p>
              <p>
                <strong>Boston Media Artists Collective</strong><br />
                Greater Boston Area, Massachusetts
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
      <style>{`
        .legal-content p { margin-bottom: 1rem; }
        .legal-content ul { padding-left: 1.5rem; margin-bottom: 1rem; }
        .legal-content li { margin-bottom: 0.4rem; }
      `}</style>
    </div>
  );
}
