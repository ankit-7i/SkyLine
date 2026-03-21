import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const ViewAllAirplane = () => {
  const [allAirplanes, setAllAirplanes] = useState([]);
  const admin_token = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/airplane/fetch/all`, {
      headers: { Authorization: "Bearer " + admin_token },
    }).then(r => setAllAirplanes(r.data.airplanes || [])).catch(() => {});
  }, []);

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: "28px" }}>
        <h1 className="section-heading">All Airplanes</h1>
        <p className="section-sub">Registered fleet</p>
      </div>
      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="table-custom" style={{ minWidth: "800px" }}>
            <thead>
              <tr>
                {["Airplane", "Registration No.", "Description", "Total Seats", "Economy", "Business", "First Class"].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allAirplanes.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>No airplanes found</td></tr>
              ) : allAirplanes.map((a, i) => (
                <tr key={i}>
                  <td><b style={{ color: "var(--accent-blue-bright)" }}>{a.name}</b></td>
                  <td>{a.registrationNumber}</td>
                  <td>{a.description}</td>
                  <td>{a.totalSeat}</td>
                  <td>{a.economySeats}</td>
                  <td>{a.businessSeats}</td>
                  <td>{a.firstClassSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAllAirplane;