import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../config";

const S = {
  label: { display: "block", fontFamily: "'Syne', sans-serif", fontSize: "0.74rem", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.9px", textTransform: "uppercase", marginBottom: "8px" },
  input: { width: "100%", background: "var(--bg-input)", border: "1.5px solid var(--border-input)", borderRadius: "10px", color: "var(--text-input)", padding: "13px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", outline: "none", transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s", WebkitTextFillColor: "var(--text-input)", caretColor: "var(--accent-blue)", display: "block" },
};

const handleFocus = (e) => { e.target.style.borderColor = "var(--accent-blue)"; e.target.style.background = "var(--bg-input-focus)"; e.target.style.boxShadow = "0 0 0 3px rgba(45,127,255,0.14)"; };
const handleBlur  = (e) => { e.target.style.borderColor = "var(--border-input)"; e.target.style.background = "var(--bg-input)"; e.target.style.boxShadow = "none"; };

const UserLoginForm = () => {
  const [form, setForm] = useState({ role: "", emailId: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const loginAction = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${API_BASE_URL}/api/user/login`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(r => r.json())
      .then(res => {
        setLoading(false);
        if (res.success && res.jwtToken) {
          if (res.user.roles === "ADMIN") {
            sessionStorage.setItem("active-admin", JSON.stringify(res.user));
            sessionStorage.setItem("admin-jwtToken", res.jwtToken);
          } else {
            sessionStorage.setItem("active-passenger", JSON.stringify(res.user));
            sessionStorage.setItem("passenger-jwtToken", res.jwtToken);
          }
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => { window.location.href = "/home"; }, 1100);
        } else {
          toast.error(res.responseMessage || "Invalid credentials.", { position: "top-center", autoClose: 3000 });
        }
      })
      .catch(() => { setLoading(false); toast.error("Server is down. Please try again.", { position: "top-center" }); });
  };

  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative" }}>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(45,127,255,0.06) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "20%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0, animation: "float 6s ease-in-out infinite" }} />

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1, animation: "fadeUp 0.6s ease forwards" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "66px", height: "66px", background: "var(--gradient-accent)", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: "0 10px 40px rgba(45,127,255,0.45)", transform: "perspective(400px) rotateX(10deg)", transition: "transform 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "perspective(400px) rotateX(0deg) scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "perspective(400px) rotateX(10deg)"}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"/></svg>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>Welcome Back</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Sign in to your SkyLine account</p>
        </div>

        <div className="glass-card" style={{ padding: "36px" }}>
          <form onSubmit={loginAction} autoComplete="off">
            <div style={{ marginBottom: "20px" }}>
              <label style={S.label}>User Role</label>
              <select name="role" value={form.role} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required style={{ ...S.input, cursor: "pointer" }}>
                <option value="" style={{ background: "#0d1526", color: "#e8eef8" }}>Select your role</option>
                <option value="ADMIN" style={{ background: "#0d1526", color: "#e8eef8" }}>Admin</option>
                <option value="PASSENGER" style={{ background: "#0d1526", color: "#e8eef8" }}>Passenger</option>
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={S.label}>Email Address</label>
              <input type="email" name="emailId" placeholder="you@example.com" value={form.emailId} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required autoComplete="email" style={S.input} />
            </div>
            <div style={{ marginBottom: "28px" }}>
              <label style={S.label}>Password</label>
              <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required autoComplete="current-password" style={S.input} />
            </div>
            <button type="submit" className="btn-primary-custom" disabled={loading} style={{ width: "100%", padding: "14px", fontSize: "1rem" }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
          <hr className="divider-glow" />
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Don't have an account?{" "}
            <Link to="/user/passenger/register" style={{ color: "var(--accent-blue-bright)", fontWeight: 600 }}>Register here</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLoginForm;