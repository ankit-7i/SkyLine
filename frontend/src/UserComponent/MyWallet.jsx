import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import API_BASE_URL from "../config";

const MyWallet = () => {
  const passengerToken = sessionStorage.getItem("passenger-jwtToken");
  const user = JSON.parse(sessionStorage.getItem("active-passenger"));
  const [walletAmount, setWalletAmount] = useState(user?.walletAmount || 0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/user/passenger/wallet/fetch?userId=${user.id}`, {
      headers: { Authorization: "Bearer " + passengerToken },
    }).then(r => setWalletAmount(r.data)).catch(() => {});
  }, []);

  const addMoney = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount", { position: "top-center" });
      return;
    }
    setLoading(true);
    fetch(`${API_BASE_URL}/api/user/add/wallet/money", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: "Bearer " + passengerToken },
      body: JSON.stringify({ userId: user.id, walletAmount: amount }),
    })
      .then(r => r.json())
      .then(res => {
        setLoading(false);
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => window.location.reload(true), 1200);
        } else {
          toast.error(res.responseMessage || "Failed to add money", { position: "top-center" });
        }
      })
      .catch(() => { setLoading(false); toast.error("Server error", { position: "top-center" }); });
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="page-wrapper" style={{ maxWidth: "600px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 className="section-heading">My Wallet</h1>
        <p className="section-sub">Manage your travel funds</p>
      </div>

      {/* Balance card */}
      <div style={{
        background: "linear-gradient(135deg, rgba(45,127,255,0.15) 0%, rgba(0,212,255,0.1) 100%)",
        border: "1px solid rgba(45,127,255,0.3)",
        borderRadius: "20px",
        padding: "40px",
        textAlign: "center",
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden",
        animation: "pulse-glow 4s infinite",
      }}>
        <div style={{ position: "absolute", top: "-30px", right: "-30px", fontSize: "120px", opacity: 0.05, userSelect: "none" }}>💳</div>
        <p style={{ color: "#7a8ba8", fontSize: "0.8rem", fontFamily: "'Syne', sans-serif", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>
          Available Balance
        </p>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "3.5rem",
          fontWeight: 800,
          background: "linear-gradient(135deg, #4d9fff, #00d4ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          marginBottom: "8px",
        }}>
          ₹{Number(walletAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </div>
        <p style={{ color: "#7a8ba8", fontSize: "0.85rem" }}>Hello, {user?.name} ✈</p>
      </div>

      {/* Add money */}
      <div className="glass-card" style={{ padding: "32px" }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "20px" }}>Add Money</h3>

        {/* Quick amounts */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          {quickAmounts.map(qa => (
            <button key={qa} onClick={() => setAmount(String(qa))}
              className="btn-ghost-custom"
              style={{
                padding: "8px 18px",
                fontSize: "0.85rem",
                background: amount === String(qa) ? "rgba(45,127,255,0.15)" : "transparent",
                borderColor: amount === String(qa) ? "#2d7fff" : undefined,
                color: amount === String(qa) ? "#4d9fff" : undefined,
              }}>
              ₹{qa}
            </button>
          ))}
        </div>

        <form onSubmit={addMoney}>
          <div style={{ marginBottom: "20px" }}>
            <label className="label-custom">Custom Amount (₹)</label>
            <input type="number" min="1" placeholder="Enter amount"
              onChange={e => setAmount(e.target.value)}
              value={amount} required className="input-custom"
            />
          </div>
          <button type="submit" className="btn-primary-custom" disabled={loading}
            style={{ width: "100%", padding: "14px", fontSize: "1rem", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Processing..." : "Add to Wallet →"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyWallet;
