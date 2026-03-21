import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../config";

const S = {
  label: { display: "block", fontFamily: "'Syne', sans-serif", fontSize: "0.74rem", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.9px", textTransform: "uppercase", marginBottom: "8px" },
  input: { width: "100%", background: "var(--bg-input)", border: "1.5px solid var(--border-input)", borderRadius: "10px", color: "var(--text-input)", padding: "13px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", outline: "none", transition: "all 0.25s", WebkitTextFillColor: "var(--text-input)", caretColor: "var(--accent-blue)", display: "block" },
};

const handleFocus = (e) => { e.target.style.borderColor = "var(--accent-blue)"; e.target.style.background = "var(--bg-input-focus)"; e.target.style.boxShadow = "0 0 0 3px rgba(45,127,255,0.14)"; };
const handleBlur  = (e) => { e.target.style.borderColor = "var(--border-input)"; e.target.style.background = "var(--bg-input)"; e.target.style.boxShadow = "none"; };

const AdminRegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const loginAction = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${API_BASE_URL}/api/user/admin/register`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(r => r.json())
      .then(res => {
        setLoading(false);
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => navigate("/user/login"), 1200);
        } else {
          toast.error(res.responseMessage || "Registration failed", { position: "top-center", autoClose: 2000 });
        }
      })
      .catch(() => { setLoading(false); toast.error("Server is down", { position: "top-center" }); });
  };

  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: "440px", animation: "fadeUp 0.6s ease forwards" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>Register Admin</h1>
          <p style={{ color: "var(--text-secondary)" }}>Create a new admin account</p>
        </div>
        <div className="glass-card" style={{ padding: "36px" }}>
          <form onSubmit={loginAction} autoComplete="off">
            <div style={{ marginBottom: "20px" }}>
              <label style={S.label}>Email Address</label>
              <input type="email" name="email" placeholder="admin@example.com" value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required style={S.input} />
            </div>
            <div style={{ marginBottom: "28px" }}>
              <label style={S.label}>Password</label>
              <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required style={S.input} />
            </div>
            <button type="submit" className="btn-primary-custom" disabled={loading} style={{ width: "100%", padding: "14px", fontSize: "1rem" }}>
              {loading ? "Registering..." : "Register Admin →"}
            </button>
          </form>
          <hr className="divider-glow" />
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            <Link to="/user/login" style={{ color: "var(--accent-blue-bright)", fontWeight: 600 }}>Back to Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminRegisterForm;