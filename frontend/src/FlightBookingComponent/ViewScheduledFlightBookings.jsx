import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const ViewScheduledFlightBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flight = location.state;
  const [scheduledFlightBookings, setScheduledFlightBookings] = useState([]);
  const [flightSeatDetail, setFlightSeatDetail] = useState({});

  const formatDate = (epoch) => new Date(Number(epoch)).toLocaleString();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/flight/book/fetch?flightId=${flight.id}`)
      .then(r => setScheduledFlightBookings(r.data.bookings || [])).catch(() => {});
    axios.get(`${API_BASE_URL}/api/flight/book/fetch/seatDetails?flightId=${flight.id}`)
      .then(r => setFlightSeatDetail(r.data || {})).catch(() => {});
  }, []);

  const SeatRow = ({ label, value }) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>{label}</span>
      <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{value}</span>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: "28px" }}>
        <h1 className="section-heading">Flight Seat Availability</h1>
        <p className="section-sub">Flight {flight.flightNumber} — {flight.departureAirport?.name} → {flight.arrivalAirport?.name}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>

        {/* Flight Info */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "16px", color: "var(--accent-blue-bright)" }}>✈ Flight Details</h3>
          <SeatRow label="Flight No." value={flight.flightNumber} />
          <SeatRow label="Airplane" value={flight.airplane?.name} />
          <SeatRow label="From" value={flight.departureAirport?.name} />
          <SeatRow label="To" value={flight.arrivalAirport?.name} />
          <SeatRow label="Departure" value={formatDate(flight.departureTime)} />
          <SeatRow label="Arrival" value={formatDate(flight.arrivalTime)} />
          <SeatRow label="Economy Fare" value={`₹${flight.economySeatFare}`} />
          <SeatRow label="Business Fare" value={`₹${flight.businessSeatFare}`} />
          <SeatRow label="First Class" value={`₹${flight.firstClassSeatFare}`} />
        </div>

        {/* Seat Availability */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "16px", color: "var(--accent-gold)" }}>💺 Seat Availability</h3>
          <SeatRow label="Total Seats" value={flight.totalSeat} />
          <SeatRow label="Economy Seats" value={flightSeatDetail.economySeats} />
          <SeatRow label="Economy Available" value={flightSeatDetail.economySeatsAvailable} />
          <SeatRow label="Business Seats" value={flightSeatDetail.businessSeats} />
          <SeatRow label="Business Available" value={flightSeatDetail.businessSeatsAvailable} />
          <SeatRow label="First Class Seats" value={flightSeatDetail.firstClassSeats} />
          <SeatRow label="First Class Available" value={flightSeatDetail.firstClassSeatsAvailable} />

          <button onClick={() => navigate("/passenger/flight/book", { state: flight })}
            className="btn-gold-custom" style={{ width: "100%", padding: "13px", marginTop: "20px", fontSize: "0.95rem" }}>
            Book Ticket →
          </button>
        </div>

        {/* Booked Seats */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "16px", color: "var(--text-primary)" }}>🎫 Booked Seats</h3>
          {scheduledFlightBookings.length === 0 ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>No seats booked yet</p>
          ) : (
            <div style={{ overflowY: "auto", maxHeight: "300px" }}>
              <table className="table-custom">
                <thead>
                  <tr>
                    <th>Seat</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledFlightBookings.map((b, i) => (
                    <tr key={i}>
                      <td>{b.airplaneSeatNo?.seatNo}</td>
                      <td><span className="badge-status badge-confirmed">{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewScheduledFlightBookings;