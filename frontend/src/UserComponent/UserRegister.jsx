import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const S = {
  label: {
    display: "block",
    fontFamily: "'Syne', sans-serif",
    fontSize: "0.74rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    letterSpacing: "0.9px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    background: "var(--bg-input)",
    border: "1.5px solid var(--border-input)",
    borderRadius: "10px",
    color: "var(--text-input)",
    padding: "13px 16px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s",
    WebkitTextFillColor: "var(--text-input)",
    caretColor: "var(--accent-blue)",
    display: "block",
  },
};

const handleFocus = (e) => {
  e.target.style.borderColor = "var(--accent-blue)";
  e.target.style.background = "var(--bg-input-focus)";
  e.target.style.boxShadow = "0 0 0 3px rgba(45,127,255,0.14)";
};

const handleBlur = (e) => {
  e.target.style.borderColor = "var(--border-input)";
  e.target.style.background = "var(--bg-input)";
  e.target.style.boxShadow = "none";
};

const Field = ({ label, name, type = "text", placeholder, value, onChange }) => (
  <div>
    <label style={S.label}>{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={S.input}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoComplete="off"
    />
  </div>
);

const UserRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "", email: "", password: "", contact: "",
    street: "", city: "", pincode: "", roles: "", age: "", gender: "",
  });

  useEffect(() => {
    if (document.URL.indexOf("passenger") !== -1) {
      setUser(prev => ({ ...prev, roles: "PASSENGER" }));
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  }, []);

  const saveUser = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(r => r.json())
      .then(res => {
        setLoading(false);
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1200 });
          setTimeout(() => navigate("/user/login"), 1400);
        } else {
          toast.error(res.responseMessage || "Registration failed.", { position: "top-center", autoClose: 3000 });
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Cannot connect to server.", { position: "top-center" });
      });
  };

  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative" }}>

      {/* 3D background orbs */}
      <div style={{ position: "fixed", top: "20%", right: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, rgba(45,127,255,0.12) 0%, transparent 70%)", pointerEvents: "none", animation: "float 7s ease-in-out infinite" }} />
      <div style={{ position: "fixed", bottom: "10%", left: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)", pointerEvents: "none", animation: "float 9s ease-in-out infinite 2s" }} />

      <div style={{ width: "100%", maxWidth: "820px", position: "relative", zIndex: 1, animation: "fadeUp 0.6s ease forwards" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "62px", height: "62px",
            background: "var(--gradient-accent)",
            borderRadius: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 8px 32px rgba(45,127,255,0.4)",
            transform: "perspective(400px) rotateX(10deg)",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px" }}>
            Create Account
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Join SkyLine and start your journey</p>
        </div>

        {/* Form card */}
        <div className="glass-card" style={{ padding: "40px 36px" }}>
          <form onSubmit={saveUser} autoComplete="off">

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "20px" }}>
              <Field label="Full Name"      name="name"     placeholder="e.g. Ankit Rout"           value={user.name}     onChange={handleChange} />
              <Field label="Email Address"  name="email"    type="email"    placeholder="you@example.com"      value={user.email}    onChange={handleChange} />
              <Field label="Password"       name="password" type="password" placeholder="Min 8 characters"     value={user.password} onChange={handleChange} />

              {/* Gender */}
              <div>
                <label style={S.label}>Gender</label>
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ ...S.input, cursor: "pointer" }}
                >
                  <option value=""       style={{ background: "#0d1526", color: "#e8eef8" }}>Select gender</option>
                  <option value="Male"   style={{ background: "#0d1526", color: "#e8eef8" }}>Male</option>
                  <option value="Female" style={{ background: "#0d1526", color: "#e8eef8" }}>Female</option>
                  <option value="Other"  style={{ background: "#0d1526", color: "#e8eef8" }}>Other</option>
                </select>
              </div>

              <Field label="Contact Number" name="contact" type="tel"    placeholder="10-digit mobile number" value={user.contact} onChange={handleChange} />
              <Field label="Age"            name="age"     type="number" placeholder="Your age"               value={user.age}     onChange={handleChange} />
              <Field label="City"           name="city"                  placeholder="Your city"              value={user.city}    onChange={handleChange} />
              <Field label="Pincode"        name="pincode" type="number" placeholder="6-digit pincode"        value={user.pincode} onChange={handleChange} />
            </div>

            {/* Street */}
            <div style={{ marginBottom: "28px" }}>
              <label style={S.label}>Street Address</label>
              <textarea
                name="street"
                rows={2}
                placeholder="House no, street name, area..."
                onChange={handleChange}
                value={user.street}
                style={{ ...S.input, resize: "none" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <button type="submit" className="btn-primary-custom" disabled={loading}
                style={{ padding: "14px 44px", fontSize: "1rem" }}>
                {loading ? "Creating Account..." : "Create Account →"}
              </button>
              <Link to="/user/login" style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                Already have an account?{" "}
                <span style={{ color: "var(--accent-blue-bright)", fontWeight: 600 }}>Sign in</span>
              </Link>
            </div>

          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserRegister;