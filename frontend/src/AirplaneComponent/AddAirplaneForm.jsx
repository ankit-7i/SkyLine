import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const AddAirplaneForm = () => {
  const navigate = useNavigate();
  const admin_token = sessionStorage.getItem("admin-jwtToken");

  const [airplane, setAirplane] = useState({
    name: "", registrationNumber: "", totalSeat: "",
    description: "", economySeats: "", businessSeats: "", firstClassSeats: "",
  });

  const handleUserInput = (e) => setAirplane({ ...airplane, [e.target.name]: e.target.value });

  const saveAirplane = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/airplane/add`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: "Bearer " + admin_token },
      body: JSON.stringify(airplane),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => navigate("/admin/airplane/all"), 1000);
        } else {
          toast.error(res.responseMessage || "Server error", { position: "top-center", autoClose: 1000 });
        }
      })
      .catch(() => toast.error("Server is down", { position: "top-center", autoClose: 1000 }));
  };

  return (
    <div className="page-wrapper" style={{ maxWidth: "700px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 className="section-heading">Add Airplane</h1>
        <p className="section-sub">Register a new airplane to the fleet</p>
      </div>
      <div className="glass-card" style={{ padding: "36px" }}>
        <form onSubmit={saveAirplane}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "20px" }}>
            {[
              { label: "Airplane Name", name: "name", type: "text" },
              { label: "Registration No.", name: "registrationNumber", type: "text" },
              { label: "Total Seats", name: "totalSeat", type: "number" },
              { label: "Economy Seats", name: "economySeats", type: "number" },
              { label: "Business Seats", name: "businessSeats", type: "number" },
              { label: "First Class Seats", name: "firstClassSeats", type: "number" },
            ].map(f => (
              <div key={f.name}>
                <label className="label-custom">{f.label}</label>
                <input type={f.type} name={f.name} className="input-custom"
                  onChange={handleUserInput} value={airplane[f.name]} required />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label className="label-custom">Description</label>
            <textarea name="description" rows={3} className="input-custom" style={{ resize: "none" }}
              placeholder="Enter airplane description..."
              onChange={handleUserInput} value={airplane.description} />
          </div>
          <button type="submit" className="btn-primary-custom" style={{ padding: "13px 40px" }}>
            Add Airplane →
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddAirplaneForm;