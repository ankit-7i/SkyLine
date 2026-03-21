import { Link } from "react-router-dom";
import Footer from "./Footer";

const StatCard = ({ number, label, delay }) => (
  <div className={`glass-card animate-fade-up-delay-${delay}`} style={{ padding: "28px 32px", textAlign: "center", flex: "1", minWidth: "140px" }}>
    <div style={{
      fontFamily: "'Syne', sans-serif", fontSize: "2.2rem", fontWeight: 800,
      background: "var(--gradient-accent)", WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "6px",
    }}>{number}</div>
    <div style={{ color: "var(--text-secondary)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase" }}>{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, desc, delay }) => (
  <div className={`glass-card animate-fade-up-delay-${delay}`} style={{ padding: "32px 28px" }}>
    <div className="feature-icon">{icon}</div>
    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "10px", color: "var(--text-primary)" }}>{title}</h3>
    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.7" }}>{desc}</p>
  </div>
);

const HomePage = () => {
  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: "92vh", display: "flex", alignItems: "center",
        padding: "80px 24px", maxWidth: "1400px", margin: "0 auto", position: "relative",
      }}>

        {/* 3D Orb */}
        <div style={{
          position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)",
          width: "520px", height: "520px", borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(45,127,255,0.18) 0%, rgba(0,212,255,0.1) 40%, transparent 70%)",
          border: "1px solid rgba(45,127,255,0.12)",
          backdropFilter: "blur(2px)",
          animation: "float 7s ease-in-out infinite",
          pointerEvents: "none",
          boxShadow: "0 0 80px rgba(45,127,255,0.1), inset 0 0 80px rgba(45,127,255,0.05)",
        }} />

        {/* Inner orb ring */}
        <div style={{
          position: "absolute", right: "calc(5% + 80px)", top: "50%", transform: "translateY(-50%)",
          width: "360px", height: "360px", borderRadius: "50%",
          border: "1px solid rgba(45,127,255,0.08)",
          animation: "float 5s ease-in-out infinite 1s",
          pointerEvents: "none",
        }} />

        {/* Big airplane icon */}
        <div style={{
          position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)",
          fontSize: "200px", opacity: "0.06",
          animation: "floatRotate 8s ease-in-out infinite",
          userSelect: "none", pointerEvents: "none",
          filter: "blur(1px)",
        }}>✈</div>

        {/* Decorative dots */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            right: `${15 + i * 8}%`,
            top: `${20 + i * 12}%`,
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            borderRadius: "50%",
            background: "var(--accent-blue)",
            opacity: 0.15 + i * 0.05,
            animation: `float ${3 + i}s ease-in-out infinite ${i * 0.5}s`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Hero text */}
        <div style={{ maxWidth: "680px", position: "relative", zIndex: 1 }}>
          <div className="animate-fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(45,127,255,0.1)", border: "1px solid rgba(45,127,255,0.25)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "32px",
            fontSize: "0.75rem", color: "var(--accent-blue-bright)", fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-blue)", animation: "pulse-glow 2s infinite" }} />
            Next-Gen Flight Reservation
          </div>

          <h1 className="animate-fade-up-delay-1" style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 800, lineHeight: "1.08", letterSpacing: "-1.5px",
            marginBottom: "24px", color: "var(--text-primary)",
          }}>
            Travel Beyond<br />
            <span style={{
              background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 50%, var(--accent-gold) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>The Horizon</span>
          </h1>

          <p className="animate-fade-up-delay-2" style={{
            color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "40px", maxWidth: "560px",
          }}>
            Book flights instantly with real-time availability, transparent pricing, and seamless confirmation. Your journey starts here.
          </p>

          <div className="animate-fade-up-delay-3" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/user/login" style={{ textDecoration: "none" }}>
              <button className="btn-primary-custom" style={{ fontSize: "1rem", padding: "15px 38px" }}>
                Get Started →
              </button>
            </Link>
            <Link to="/view/flight/all" style={{ textDecoration: "none" }}>
              <button className="btn-ghost-custom" style={{ fontSize: "1rem", padding: "15px 38px" }}>
                View Flights
              </button>
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="animate-fade-up-delay-4" style={{ marginTop: "56px", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--accent-blue), transparent)" }} />
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase" }}>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <StatCard number="500+" label="Destinations" delay={1} />
          <StatCard number="98%" label="On-Time Rate" delay={2} />
          <StatCard number="2M+" label="Happy Travelers" delay={3} />
          <StatCard number="24/7" label="Support" delay={4} />
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "60px 24px 80px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 className="section-heading" style={{ fontSize: "2.2rem" }}>Why Choose SkyLine</h2>
          <p className="section-sub">Built for the modern traveler — fast, secure, and beautifully simple.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          <FeatureCard delay={1} icon="⚡" title="Instant Booking" desc="Reserve your seat in seconds with our streamlined checkout. No waiting, no uncertainty." />
          <FeatureCard delay={2} icon="🛡️" title="Secure Payments" desc="Bank-grade encryption protects your wallet and payment details at every step." />
          <FeatureCard delay={3} icon="📡" title="Live Flight Status" desc="Track your flight in real time — departures, delays, arrivals — all in one dashboard." />
          <FeatureCard delay={4} icon="🎫" title="Digital Tickets" desc="Download your boarding pass instantly. Your phone is your ticket — no printing needed." />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 24px 100px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(45,127,255,0.1) 0%, rgba(0,212,255,0.07) 100%)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "28px", padding: "60px 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "32px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: "-10px", top: "-10px", fontSize: "180px", opacity: "0.04", userSelect: "none", pointerEvents: "none", animation: "floatRotate 10s ease-in-out infinite" }}>🌏</div>
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.9rem", fontWeight: 700, marginBottom: "10px", color: "var(--text-primary)" }}>
              Ready to take off?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>Create your account free and start exploring flights today.</p>
          </div>
          <Link to="/user/passenger/register" style={{ textDecoration: "none", flexShrink: 0 }}>
            <button className="btn-gold-custom" style={{ fontSize: "1rem", padding: "15px 44px" }}>
              Register Free →
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;