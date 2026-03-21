import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import API_BASE_URL from "../config";

const ViewAllFlightBooking = () => {
  const admin_token = sessionStorage.getItem("admin-jwtToken");
  const [bookedFlights, setBookedFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (epoch) => new Date(Number(epoch)).toLocaleString();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/flight/book/fetch/all`, {
      headers: { Authorization: "Bearer " + admin_token },
    }).then(r => { setBookedFlights(r.data.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const downloadTicket = (bookingId) => {
    fetch(`${API_BASE_URL}/api/flight/book/download/ticket?bookingId=${bookingId}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + admin_token },
    })
      .then(r => r.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url; link.download = "ticket.pdf";
        document.body.appendChild(link); link.click();
        URL.revokeObjectURL(url); document.body.removeChild(link);
      })
      .catch(e => console.error("Download error:", e));
  };

  const getStatusClass = (s) => {
    const map = { Confirmed: "badge-confirmed", Pending: "badge-pending", Cancelled: "badge-cancelled", Waiting: "badge-waiting" };
    return map[s] || "badge-scheduled";
  };

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: "28px" }}>
        <h1 className="section-heading">All Flight Bookings</h1>
        <p className="section-sub">{bookedFlights.length} total bookings</p>
      </div>
      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--text-secondary)" }}>Loading bookings...</div>
          ) : bookedFlights.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--text-secondary)" }}>No bookings found</div>
          ) : (
            <table className="table-custom" style={{ minWidth: "1200px" }}>
              <thead>
                <tr>
                  {["Booking ID", "Passenger", "Contact", "Flight No.", "Airplane", "Departure", "Arrival", "From", "To", "Class", "Fare", "Seat", "Booking Time", "Status", "Action"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookedFlights.map((book, i) => (
                  <tr key={i}>
                    <td><span style={{ color: "var(--accent-blue-bright)", fontWeight: 700, fontSize: "0.8rem" }}>{book.bookingId}</span></td>
                    <td>{book.passenger?.name}</td>
                    <td>{book.passenger?.contact}</td>
                    <td>{book.flight?.flightNumber}</td>
                    <td>{book.flight?.airplane?.name}</td>
                    <td style={{ fontSize: "0.8rem" }}>{formatDate(book.flight?.departureTime)}</td>
                    <td style={{ fontSize: "0.8rem" }}>{formatDate(book.flight?.arrivalTime)}</td>
                    <td>{book.flight?.departureAirport?.name}</td>
                    <td>{book.flight?.arrivalAirport?.name}</td>
                    <td>{book.flightClass}</td>
                    <td>₹{book.flightClass === "Economy" ? book.flight?.economySeatFare : book.flightClass === "Business" ? book.flight?.businessSeatFare : book.flight?.firstClassSeatFare}</td>
                    <td>{book.airplaneSeatNo?.seatNo}</td>
                    <td style={{ fontSize: "0.8rem" }}>{formatDate(book.bookingTime)}</td>
                    <td><span className={`badge-status ${getStatusClass(book.status)}`}>{book.status}</span></td>
                    <td>
                      {book.status === "Confirmed" && (
                        <button onClick={() => downloadTicket(book.bookingId)} className="btn-primary-custom" style={{ padding: "6px 14px", fontSize: "0.78rem" }}>
                          Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewAllFlightBooking;