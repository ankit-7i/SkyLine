import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../config";

const ViewPassengerFlightBooking = () => {
  const passenger_token = sessionStorage.getItem("passenger-jwtToken");
  const passenger = JSON.parse(sessionStorage.getItem("active-passenger"));
  const [bookedFlights, setBookedFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (epoch) => new Date(Number(epoch)).toLocaleString();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/flight/book/fetch/user?userId=${passenger.id}`, {
      headers: { Authorization: "Bearer " + passenger_token },
    }).then(r => { setBookedFlights(r.data.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const cancelFlightTicket = (bookingId) => {
    fetch(`${API_BASE_URL}/api/flight/book/ticket/cancel?bookingId=${bookingId}`, {
      method: "DELETE",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: "Bearer " + passenger_token },
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => window.location.reload(true), 1500);
        } else {
          toast.error(res.responseMessage || "Cancel failed", { position: "top-center", autoClose: 1000 });
        }
      })
      .catch(() => toast.error("Server is down", { position: "top-center", autoClose: 1000 }));
  };

  const downloadTicket = (bookingId) => {
    fetch(`${API_BASE_URL}/api/flight/book/download/ticket?bookingId=${bookingId}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + passenger_token },
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
        <h1 className="section-heading">My Bookings</h1>
        <p className="section-sub">{bookedFlights.length} total bookings</p>
      </div>
      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--text-secondary)" }}>Loading bookings...</div>
          ) : bookedFlights.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--text-secondary)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎫</div>
              No bookings found. Book a flight to get started!
            </div>
          ) : (
            <table className="table-custom" style={{ minWidth: "1100px" }}>
              <thead>
                <tr>
                  {["Booking ID", "Flight No.", "Airplane", "Departure", "Arrival", "From", "To", "Class", "Fare", "Seat No", "Booking Time", "Status", "Action"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookedFlights.map((book, i) => (
                  <tr key={i}>
                    <td><span style={{ color: "var(--accent-blue-bright)", fontWeight: 700, fontSize: "0.8rem" }}>{book.bookingId}</span></td>
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
                      <div style={{ display: "flex", gap: "8px" }}>
                        {book.status !== "Cancelled" && (
                          <button onClick={() => cancelFlightTicket(book.id)} className="btn-danger-custom" style={{ padding: "6px 12px", fontSize: "0.78rem" }}>
                            Cancel
                          </button>
                        )}
                        {book.status === "Confirmed" && (
                          <button onClick={() => downloadTicket(book.bookingId)} className="btn-primary-custom" style={{ padding: "6px 14px", fontSize: "0.78rem" }}>
                            Download
                          </button>
                        )}
                      </div>
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

export default ViewPassengerFlightBooking;