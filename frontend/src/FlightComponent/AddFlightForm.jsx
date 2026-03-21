import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const AddFlightForm = () => {
  const navigate = useNavigate();
  const admin_token = sessionStorage.getItem("admin-jwtToken");

  const [flight, setFlight] = useState({
    departureTime: "", arrivalTime: "", departureAirportId: "",
    arrivalAirportId: "", airplaneId: "", status: "",
    economySeatFare: "", businessSeatFare: "", firstClassSeatFare: "",
  });
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [allAirplanes, setAllAirplanes] = useState([]);
  const [allAirports, setAllAirports] = useState([]);
  const [allStatus, setAllStatus] = useState([]);

  const handleUserInput = (e) => setFlight({ ...flight, [e.target.name]: e.target.value });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/airplane/fetch/all`, { headers: { Authorization: "Bearer " + admin_token } })
      .then(r => setAllAirplanes(r.data.airplanes || [])).catch(() => {});
    axios.get(`${API_BASE_URL}/api/airport/fetch/all`)
      .then(r => setAllAirports(r.data.airports || [])).catch(() => {});
    axios.get(`${API_BASE_URL}/api/flight/status/all`, { headers: { Authorization: "Bearer " + admin_token } })
      .then(r => setAllStatus(r.data || [])).catch(() => {});
  }, []);

  const saveFlight = (e) => {
    e.preventDefault();
    flight.departureTime = new Date(departureTime).getTime();
    flight.arrivalTime = new Date(arrivalTime).getTime();
    fetch(`${API_BASE_URL}/api/flight/add`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: "Bearer " + admin_token },
      body: JSON.stringify(flight),
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => navigate("/admin/flight/all"), 1000);
        } else {
          toast.error(res.responseMessage || "Server error", { position: "top-center", autoClose: 1000 });
        }
      })
      .catch(() => toast.error("Server is down", { position: "top-center", autoClose: 1000 }));
  };

  const selectStyle = { ...{ width: "100%", background: "var(--bg-input)", border: "1.5px solid var(--border-input)", borderRadius: "10px", color: "var(--text-input)", padding: "13px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", outline: "none" } };

  return (
    <div className="page-wrapper" style={{ maxWidth: "800px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 className="section-heading">Add Flight</h1>
        <p className="section-sub">Schedule a new flight</p>
      </div>
      <div className="glass-card" style={{ padding: "36px" }}>
        <form onSubmit={saveFlight}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "20px" }}>

            <div>
              <label className="label-custom">Airplane</label>
              <select name="airplaneId" onChange={handleUserInput} style={selectStyle} required>
                <option value="">Select Airplane</option>
                {allAirplanes.map(a => <option key={a.id} value={a.id} style={{ background: "#0d1526", color: "#e8eef8" }}>{a.name}</option>)}
              </select>
            </div>

            <div>
              <label className="label-custom">Departure Airport</label>
              <select name="departureAirportId" onChange={handleUserInput} style={selectStyle} required>
                <option value="">Select Departure Airport</option>
                {allAirports.map(a => <option key={a.id} value={a.id} style={{ background: "#0d1526", color: "#e8eef8" }}>{a.name}</option>)}
              </select>
            </div>

            <div>
              <label className="label-custom">Arrival Airport</label>
              <select name="arrivalAirportId" onChange={handleUserInput} style={selectStyle} required>
                <option value="">Select Arrival Airport</option>
                {allAirports.map(a => <option key={a.id} value={a.id} style={{ background: "#0d1526", color: "#e8eef8" }}>{a.name}</option>)}
              </select>
            </div>

            <div>
              <label className="label-custom">Flight Status</label>
              <select name="status" onChange={handleUserInput} style={selectStyle} required>
                <option value="">Select Status</option>
                {allStatus.map(s => <option key={s} value={s} style={{ background: "#0d1526", color: "#e8eef8" }}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="label-custom">Departure Time</label>
              <input type="datetime-local" className="input-custom" value={departureTime} onChange={e => setDepartureTime(e.target.value)} required />
            </div>

            <div>
              <label className="label-custom">Arrival Time</label>
              <input type="datetime-local" className="input-custom" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} required />
            </div>

            <div>
              <label className="label-custom">Economy Fare (₹)</label>
              <input type="number" name="economySeatFare" className="input-custom" onChange={handleUserInput} value={flight.economySeatFare} required />
            </div>

            <div>
              <label className="label-custom">Business Fare (₹)</label>
              <input type="number" name="businessSeatFare" className="input-custom" onChange={handleUserInput} value={flight.businessSeatFare} required />
            </div>

            <div>
              <label className="label-custom">First Class Fare (₹)</label>
              <input type="number" name="firstClassSeatFare" className="input-custom" onChange={handleUserInput} value={flight.firstClassSeatFare} required />
            </div>
          </div>

          <button type="submit" className="btn-primary-custom" style={{ padding: "13px 40px" }}>
            Add Flight →
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddFlightForm;