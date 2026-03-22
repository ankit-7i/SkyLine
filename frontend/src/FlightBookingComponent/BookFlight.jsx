import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const BookFlight = () => {
  const passenger = JSON.parse(sessionStorage.getItem("active-passenger"));
  const passengerToken = sessionStorage.getItem("passenger-jwtToken");
  const navigate = useNavigate();
  const location = useLocation();
  const flight = location.state;
  const [allFlightClass, setAllFlightClass] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookFlight, setBookFlight] = useState({ flightId: flight.id, flightClassType: "", passengerId: "", totalPassengers: "" });

  const formatDate = (epoch) => new Date(Number(epoch)).toLocaleString();
  const handleInput = (e) => setBookFlight({ ...bookFlight, [e.target.name]: e.target.value });

  useEffect(() => {
    axios.get("http://localhost:8080/api/flight/class/all").then(r => setAllFlightClass(r.data || [])).catch(() => {});
  }, []);

  const bookSeat = (e) => {
    e.preventDefault();
    if (!passengerToken) {
      toast.warn("Please login to book a seat.", { position: "top-center", autoClose: 2000 });
      return;
    }
    setLoading(true);
    bookFlight.passengerId = passenger.id;
    fetch("http://localhost:8080/api/flight/book/add", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: "Bearer " + passengerToken },
      body: JSON.stringify(bookFlight),
    })
      .then(r => r.json())
      .then(res => {
        setLoading(false);
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => navigate("/passenger/flight/booking/all"), 1200);
        } else {
          toast.error(res.responseMessage || "Booking failed", { position: "top-center" });
        }
      })
      .catch(() => { setLoading(false); toast.error("Server error", { position: "top-center" }); });
  };

  const InfoRow = ({ label, value }) => (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <span style={{ color: "#7a8ba8", fontSize: "0.82rem", fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</span>
      <span style={{ color: "#e8eef8", fontSize: "0.9rem", fontWeight: 500 }}>{value}</span>
    </div>
  );

  return (
    <div className="page-wrapper" style={{ maxWidth: "900px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 className="section-heading">Book Your Seat</h1>
        <p className="section-sub">Flight {flight.flightNumber} — {flight.departureAirport?.name} → {flight.arrivalAirport?.name}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Flight summary */}
        <div className="glass-card" style={{ padding: "28px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "16px", color: "#4d9fff" }}>
            ✈ Flight Details
          </h3>
          <InfoRow label="Airplane" value={flight.airplane?.name} />
          <InfoRow label="Registration" value={flight.airplane?.registrationNumber} />
          <InfoRow label="From" value={flight.departureAirport?.name} />
          <InfoRow label="To" value={flight.arrivalAirport?.name} />
          <InfoRow label="Departure" value={formatDate(flight.departureTime)} />
          <InfoRow label="Arrival" value={formatDate(flight.arrivalTime)} />
          <InfoRow label="Status" value={flight.status} />
        </div>

        {/* Fare + booking */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Fare card */}
          <div className="glass-card" style={{ padding: "28px" }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "16px", color: "#f0c040" }}>
              💺 Seat Fares
            </h3>
            {[
              { label: "Economy", value: flight.economySeatFare },
              { label: "Business", value: flight.businessSeatFare },
              { label: "First Class", value: flight.firstClassSeatFare },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "#7a8ba8", fontSize: "0.85rem" }}>{f.label}</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f0c040" }}>₹{f.value}</span>
              </div>
            ))}
          </div>

          {/* Booking form */}
          <div className="glass-card" style={{ padding: "28px" }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "20px", color: "#e8eef8" }}>
              📋 Your Booking
            </h3>
            <form onSubmit={bookSeat}>
              <div style={{ marginBottom: "16px" }}>
                <label className="label-custom">Number of Passengers</label>
                <input type="number" name="totalPassengers" min="1" placeholder="e.g. 2"
                  onChange={handleInput} value={bookFlight.totalPassengers} required className="input-custom" />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label className="label-custom">Seat Class</label>
                <select name="flightClassType" onChange={handleInput} required className="input-custom">
                  <option value="">Select class</option>
                  {allFlightClass.map(fc => <option key={fc} value={fc}>{fc}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-gold-custom" disabled={loading}
                style={{ width: "100%", padding: "14px", fontSize: "1rem", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Booking..." : "Confirm Booking →"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookFlight;