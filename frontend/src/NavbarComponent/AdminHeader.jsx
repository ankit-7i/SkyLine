import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-admin"));

  const adminLogout = () => {
    toast.success("Logged out successfully", { position: "top-center", autoClose: 1000 });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    setTimeout(() => { navigate("/home"); window.location.reload(true); }, 1000);
  };

  const navLinks = [
    { to: "/admin/airplane/add", label: "Add Airplane" },
    { to: "/admin/airport/add", label: "Add Airport" },
    { to: "/admin/airplane/all", label: "Airplanes" },
    { to: "/admin/airport/all", label: "Airports" },
    { to: "/admin/flight/add", label: "Add Flight" },
    { to: "/admin/flight/booking/all", label: "Bookings" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
      {navLinks.map(link => (
        <Link key={link.to} to={link.to} style={{
          color: "#7a8ba8",
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: "0.82rem",
          padding: "7px 12px",
          borderRadius: "8px",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}
          onMouseEnter={e => { e.target.style.color = "#e8eef8"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={e => { e.target.style.color = "#7a8ba8"; e.target.style.background = "transparent"; }}
        >
          {link.label}
        </Link>
      ))}

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginLeft: "8px",
        paddingLeft: "12px",
        borderLeft: "1px solid rgba(45,127,255,0.2)",
      }}>
        <div style={{
          width: "32px", height: "32px",
          background: "linear-gradient(135deg, #2d7fff, #00d4ff)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.8rem",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          color: "#fff",
        }}>
          {user?.name?.charAt(0)?.toUpperCase() || "A"}
        </div>
        <button onClick={adminLogout} style={{
          background: "rgba(255,60,60,0.1)",
          border: "1px solid rgba(255,60,60,0.2)",
          color: "#ff7070",
          borderRadius: "8px",
          padding: "7px 14px",
          fontSize: "0.82rem",
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,60,60,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,60,60,0.1)"; }}
        >
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminHeader;