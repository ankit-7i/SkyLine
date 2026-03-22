import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import API_BASE_URL from "../config";

const ViewAllFlight = () => {
  const navigate = useNavigate();
  var passenger = JSON.parse(sessionStorage.getItem("active-passenger"));
  var admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const [searchRequest, setSearchRequest] = useState({ startTime: "", endTime: "", fromAirportId: "", toAirportId: "" });
  const [tempSearch, setTempSearch] = useState({ startTime: "", endTime: "", fromAirportId: "", toAirportId: "" });
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTemp = (e) => setTempSearch({ ...tempSearch, [e.target.name]: e.target.value });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/airport/fetch/all")
      .then(r => setAirports(r.data.airports || []))
      .catch(() => {});
  }, []);

  const toEpoch = (d) => new Date(d).getTime();

  useEffect(() => {
    setLoading(true);
    const hasSearch = searchRequest.startTime && searchRequest.endTime && searchRequest.fromAirportId && searchRequest.toAirportId;
    const url = hasSearch
      ? `${API_BASE_URL}/api/flight/search?startTime=${toEpoch(searchRequest.startTime)}&endTime=${toEpoch(searchRequest.endTime)}&fromAirportId=${searchRequest.fromAirportId}&endAirportId=${searchRequest.toAirportId}`
      : `${API_BASE_URL}/api/flight/fetch/all";
    axios.get(url).then(r => { setFlights(r.data.flights || []); setLoading(false); }).catch(() => setLoading(false));
  }, [searchRequest]);

  const formatDate = (epoch) => new Date(Number(epoch)).toLocaleString();
  const getStatusClass = (s) => {
    const map = { Scheduled: "badge-scheduled", "On Time": "badge-on-time", Delayed: "badge-delayed", Cancelled: "badge-cancelled", Completed: "badge-completed" };
    return map[s] || "badge-scheduled";
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 className="section-heading">Scheduled Flights</h1>
        <p className="section-sub">Search and book available flights</p>
      </div>

      {/* Search bar */}
      <div className="glass-card" style={{ padding: "24px 28px", marginBottom: "24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
          <div style={{ flex: "1", minWidth: "160px" }}>
            <label className="label-custom">Departure Date</label>
            <input type="date" name="startTime" className="input-custom" onChange={handleTemp} value={tempSearch.startTime} />
          </div>
          <div style={{ flex: "1", minWidth: "160px" }}>
            <label className="label-custom">Return Date</label>
            <input type="date" name="endTime" className="input-custom" onChange={handleTemp} value={tempSearch.endTime} />
          </div>
          <div style={{ flex: "1.5", minWidth: "180px" }}>
            <label className="label-custom">From Airport</label>
            <select name="fromAirportId" className="input-custom" onChange={handleTemp}>
              <option value="">Select origin</option>
              {airports.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div style={{ flex: "1.5", minWidth: "180px" }}>
            <label className="label-custom">To Airport</label>
            <select name="toAirportId" className="input-custom" onChange={handleTemp}>
              <option value="">Select destination</option>
              {airports.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <button className="btn-primary-custom" onClick={(e) => { setSearchRequest(tempSearch); e.preventDefault(); }}
            style={{ padding: "13px 28px", whiteSpace: "nowrap" }}>
            🔍 Search
          </button>
          {(searchRequest.fromAirportId || searchRequest.startTime) && (
            <button className="btn-ghost-custom" onClick={() => { setSearchRequest({ startTime: "", endTime: "", fromAirportId: "", toAirportId: "" }); setTempSearch({ startTime: "", endTime: "", fromAirportId: "", toAirportId: "" }); }}
              style={{ padding: "13px 20px" }}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: "0", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#7a8ba8" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>✈</div>
              Loading flights...
            </div>
          ) : flights.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#7a8ba8" }}>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🔍</div>
              No flights found. Try different search criteria.
            </div>
          ) : (
            <table className="table-custom" style={{ minWidth: "1000px" }}>
              <thead>
                <tr>
                  {["Flight No.", "Airplane", "Departure", "Arrival", "From", "To", "Economy (₹)", "Business (₹)", "First Class (₹)", "Status", "Action"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {flights.map((flight, i) => (
                  <tr key={i}>
                    <td><span style={{ color: "#4d9fff", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{flight.flightNumber}</span></td>
                    <td>{flight.airplane?.name}</td>
                    <td style={{ fontSize: "0.82rem" }}>{formatDate(flight.departureTime)}</td>
                    <td style={{ fontSize: "0.82rem" }}>{formatDate(flight.arrivalTime)}</td>
                    <td>{flight.departureAirport?.name}</td>
                    <td>{flight.arrivalAirport?.name}</td>
                    <td>₹{flight.economySeatFare}</td>
                    <td>₹{flight.businessSeatFare}</td>
                    <td>₹{flight.firstClassSeatFare}</td>
                    <td><span className={`badge-status ${getStatusClass(flight.status)}`}>{flight.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {admin && (
                          <button onClick={() => navigate("/admin/flight/status/update", { state: flight })}
                            className="btn-ghost-custom" style={{ padding: "6px 12px", fontSize: "0.78rem" }}>
                            Update
                          </button>
                        )}
                        <button onClick={() => navigate("/flight/booking/status/", { state: flight })}
                          className="btn-primary-custom" style={{ padding: "6px 14px", fontSize: "0.78rem" }}>
                          {passenger ? "Book Seat" : "View"}
                        </button>
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

export default ViewAllFlight;
