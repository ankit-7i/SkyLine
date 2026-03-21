import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const AddAirportForm = () => {
  const navigate = useNavigate();
  const admin_token = sessionStorage.getItem("admin-jwtToken");
  const [airport, setAirport] = useState({ name: "", location: "", code: "", address: "" });
  const handleUserInput = (e) => setAirport({ ...airport, [e.target.name]: e.target.value });

  const saveAirport = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/airport/add`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: "Bearer " + admin_token },
      body: JSON.stringify(airport),
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => navigate("/admin/airport/all"), 1000);
        } else {
          toast.error(res.responseMessage || "Server error", { position: "top-center", autoClose: 1000 });
        }
      })
      .catch(() => toast.error("Server is down", { position: "top-center", autoClose: 1000 }));
  };

  return (
    <div className="page-wrapper" style={{ maxWidth: "700px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 className="section-heading">Add Airport</h1>
        <p className="section-sub">Register a new airport</p>
      </div>
      <div className="glass-card" style={{ padding: "36px" }}>
        <form onSubmit={saveAirport}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label className="label-custom">Airport Name</label>
              <input type="text" name="name" className="input-custom" onChange={handleUserInput} value={airport.name} required />
            </div>
            <div>
              <label className="label-custom">Location</label>
              <input type="text" name="location" className="input-custom" onChange={handleUserInput} value={airport.location} required />
            </div>
            <div>
              <label className="label-custom">Airport Code</label>
              <input type="text" name="code" className="input-custom" placeholder="e.g. HYD" onChange={handleUserInput} value={airport.code} required />
            </div>
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label className="label-custom">Address</label>
            <textarea name="address" rows={3} className="input-custom" style={{ resize: "none" }}
              placeholder="Full airport address..."
              onChange={handleUserInput} value={airport.address} />
          </div>
          <button type="submit" className="btn-primary-custom" style={{ padding: "13px 40px" }}>
            Add Airport →
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddAirportForm;