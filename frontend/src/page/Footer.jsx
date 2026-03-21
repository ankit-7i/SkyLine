import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{
      background: "var(--footer-bg)",
      borderTop: "1px solid var(--border-subtle)",
      padding: "64px 24px 32px",
      marginTop: "40px",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div style={{
                width: "40px", height: "40px",
                background: "var(--gradient-accent)",
                borderRadius: "11px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
                boxShadow: "0 4px 16px rgba(45,127,255,0.3)",
              }}>✈</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#e8eef8" }}>
                Sky<span style={{ color: "#4d9fff" }}>Line</span>
              </span>
            </div>
            <p style={{ color: "#7a8ba8", fontSize: "0.875rem", lineHeight: "1.8", maxWidth: "270px", marginBottom: "20px" }}>
              Next-generation flight reservation. Seamless booking, real-time availability, and the best fares — all in one place.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: "36px", height: "36px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "9px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#7a8ba8", textDecoration: "none", fontSize: "0.85rem", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(45,127,255,0.18)"; e.currentTarget.style.color = "#4d9fff"; e.currentTarget.style.borderColor = "rgba(45,127,255,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#7a8ba8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {[
            { title: "Company", links: [{ to: "/about", label: "About Us" }, { to: "/contact", label: "Contact" }] },
            { title: "Travel", links: [{ to: "/view/flight/all", label: "Browse Flights" }, { to: "/user/passenger/register", label: "Register" }, { to: "/user/login", label: "Sign In" }] },
            { title: "Support", links: [{ to: "#", label: "Help Center" }, { to: "#", label: "FAQs" }, { to: "#", label: "Privacy Policy" }] },
          ].map(section => (
            <div key={section.title}>
              <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#e8eef8", marginBottom: "18px", letterSpacing: "1px", textTransform: "uppercase" }}>
                {section.title}
              </h4>
              {section.links.map(link => (
                <Link key={link.label} to={link.to} style={{ display: "block", color: "#7a8ba8", textDecoration: "none", fontSize: "0.875rem", marginBottom: "12px", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#e8eef8"}
                  onMouseLeave={e => e.target.style.color = "#7a8ba8"}
                >{link.label}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
        }}>
          <p style={{ color: "#3d4f6a", fontSize: "0.82rem" }}>© 2026 SkyLine. All rights reserved.</p>
          <p style={{ color: "#3d4f6a", fontSize: "0.82rem" }}>Built with ❤️ for travelers worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;