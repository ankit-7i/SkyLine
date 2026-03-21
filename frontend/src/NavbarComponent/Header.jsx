import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";
import { useTheme } from "../ThemeContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      background: scrolled ? "var(--navbar-bg)" : "transparent",
      backdropFilter: scrolled ? "blur(28px) saturate(1.5)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(28px) saturate(1.5)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.2)" : "none",
    }}>
      <nav style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 24px",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <div style={{
            width: "44px", height: "44px",
            background: "linear-gradient(135deg, #2d7fff 0%, #00d4ff 100%)",
            borderRadius: "13px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(45,127,255,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
            transition: "transform 0.3s, box-shadow 0.3s",
            flexShrink: 0,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "rotate(-8deg) scale(1.1)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(45,127,255,0.6), inset 0 1px 0 rgba(255,255,255,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(45,127,255,0.45), inset 0 1px 0 rgba(255,255,255,0.2)";
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"/>
            </svg>
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.22rem",
            color: "var(--text-primary)",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}>
            Sky<span style={{ color: "#2d7fff" }}>Line</span>
          </span>
        </Link>

        {/* Center nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {[
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/view/flight/all", label: "Flights" },
          ].map(link => (
            <Link key={link.to} to={link.to} style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.9rem",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => {
                e.target.style.color = "var(--text-primary)";
                e.target.style.background = "var(--bg-glass)";
              }}
              onMouseLeave={e => {
                e.target.style.color = "var(--text-secondary)";
                e.target.style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: role nav + theme toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <RoleNav />
          <button
            onClick={toggle}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
              width: "44px", height: "44px",
              borderRadius: "12px",
              background: "var(--toggle-bg)",
              border: "1px solid var(--border-subtle)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem",
              transition: "all 0.25s",
              flexShrink: 0,
              color: "var(--text-secondary)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(45,127,255,0.12)";
              e.currentTarget.style.borderColor = "var(--accent-blue)";
              e.currentTarget.style.transform = "rotate(20deg) scale(1.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--toggle-bg)";
              e.currentTarget.style.borderColor = "var(--border-subtle)";
              e.currentTarget.style.transform = "none";
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;