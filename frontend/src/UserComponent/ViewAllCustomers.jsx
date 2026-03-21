import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const ViewAllCustomers = () => {
  const [allCustomer, setAllCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const admin_token = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/user/fetch/role?role=PASSENGER`, {
      headers: { Authorization: "Bearer " + admin_token },
    }).then(r => { setAllCustomer(r.data.users || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: "28px" }}>
        <h1 className="section-heading">All Passengers</h1>
        <p className="section-sub">{allCustomer.length} registered passengers</p>
      </div>
      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--text-secondary)" }}>Loading passengers...</div>
          ) : allCustomer.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--text-secondary)" }}>No passengers found</div>
          ) : (
            <table className="table-custom" style={{ minWidth: "900px" }}>
              <thead>
                <tr>
                  {["Name", "Email", "Gender", "Contact", "City", "Pincode", "Status"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allCustomer.map((customer, i) => (
                  <tr key={i}>
                    <td><b style={{ color: "var(--text-primary)" }}>{customer.name}</b></td>
                    <td style={{ color: "var(--text-secondary)" }}>{customer.email}</td>
                    <td>{customer.gender}</td>
                    <td>{customer.contact}</td>
                    <td>{customer.city}</td>
                    <td>{customer.pincode}</td>
                    <td>
                      <span className={`badge-status ${customer.status === "Active" ? "badge-active" : "badge-cancelled"}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllCustomers;