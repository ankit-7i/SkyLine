import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const UpdateFlightStatusForm = () => {
  const navigate = useNavigate();
  const admin_token = sessionStorage.getItem("admin-jwtToken");
  const location = useLocation();
  const flight = location.state;
  const [allStatus, setAllStatus] = useState([]);
  const [updateFlightStatus, setUpdateFlightStatus] = useState({ flightId: flight.id, status: "" });

  const formatDate = (epoch) => new Date(Number(epoch)).toLocaleString();
  const handleUserInput = (e) => setUpdateFlightStatus({ ...updateFlightStatus, [e.target.name]: e.target.value });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/flight/status/all`, { headers: { Authorization: "Bearer " + admin_token } })
      .then(r => setAllStatus(r.data || [])).catch(() => {});
  }, []);

  const updateFlight = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/flight/update/status`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: "Bearer " + admin_token },
      body: JSON.stringify(updateFlightStatus),
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => navigate("/admin/flight/all"), 1000);
        } else {
          toast.error(res.responseMessage || "Update failed", { position: "top-center", autoClose: 1000 });
        }
      })
      .catch(() => toast.error("Server is down", { position: "top-center", autoClose: 1000 }));
  };

  const InfoRow = ({ label, value }) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", fontFamily: "'Syne', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>
      <span style={{ color: "var(--text-primary)", fontSize: "0.9rem" }}>{value}</span>
    </div>
  );

  return (
    <div className="page-wrapper" style={{ maxWidth: "800px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 className="section-heading">Update Flight Status</h1>
        <p className="section-sub">Flight {flight.flightNumber}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div className="glass-card" style={{ padding: "28px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "16px", color: "var(--accent-blue-bright)" }}>✈ Flight Info</h3>
          <InfoRow label="Airplane" value={flight.airplane?.name} />
          <InfoRow label="From" value={flight.departureAirport?.name} />
          <InfoRow label="To" value={flight.arrivalAirport?.name} />
          <InfoRow label="Departure" value={formatDate(flight.departureTime)} />
          <InfoRow label="Arrival" value={formatDate(flight.arrivalTime)} />
          <InfoRow label="Current Status" value={flight.status} />
          <InfoRow label="Economy Fare" value={`₹${flight.economySeatFare}`} />
          <InfoRow label="Business Fare" value={`₹${flight.businessSeatFare}`} />
          <InfoRow label="First Class Fare" value={`₹${flight.firstClassSeatFare}`} />
        </div>

        <div className="glass-card" style={{ padding: "28px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "20px", color: "var(--text-primary)" }}>Update Status</h3>
          <form onSubmit={updateFlight}>
            <div style={{ marginBottom: "24px" }}>
              <label className="label-custom">New Status</label>
              <select name="status" onChange={handleUserInput} required
                style={{ width: "100%", background: "var(--bg-input)", border: "1.5px solid var(--border-input)", borderRadius: "10px", color: "var(--text-input)", padding: "13px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", outline: "none" }}>
                <option value="">Select new status</option>
                {allStatus.map(s => <option key={s} value={s} style={{ background: "#0d1526", color: "#e8eef8" }}>{s}</option>)}
              </select>
            </div>
            <button type="submit" className="btn-primary-custom" style={{ width: "100%", padding: "13px" }}>
              Update Status →
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateFlightStatusForm;