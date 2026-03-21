import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const ViewAllAirport = () => {
  const [allAirports, setAllAirports] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/airport/fetch/all`)
      .then(r => setAllAirports(r.data.airports || []))
      .catch(() => {});
  }, []);

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: "28px" }}>
        <h1 className="section-heading">All Airports</h1>
        <p className="section-sub">Registered airports</p>
      </div>
      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="table-custom">
            <thead>
              <tr>
                {["Airport Name", "Location", "Code", "Address"].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {allAirports.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>No airports found</td></tr>
              ) : allAirports.map((a, i) => (
                <tr key={i}>
                  <td><b style={{ color: "var(--accent-blue-bright)" }}>{a.name}</b></td>
                  <td>{a.location}</td>
                  <td><span className="badge-status badge-scheduled">{a.code}</span></td>
                  <td>{a.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAllAirport;