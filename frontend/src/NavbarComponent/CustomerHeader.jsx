import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CustomerHeader = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-passenger"));

  const userLogout = () => {
    toast.success("Logged out successfully", { position: "top-center", autoClose: 1000 });
    sessionStorage.removeItem("active-passenger");
    sessionStorage.removeItem("passenger-jwtToken");
    setTimeout(() => { navigate("/home"); window.location.reload(true); }, 1000);
  };

  const navLinks = [
    { to: "/view/flight/all", label: "Book Flights" },
    { to: "/passenger/wallet", label: "My Wallet" },
    { to: "/passenger/flight/booking/all", label: "My Bookings" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {navLinks.map(link => (
        <Link key={link.to} to={link.to} style={{
          color: "#7a8ba8",
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: "0.85rem",
          padding: "7px 14px",
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
        display: "flex", alignItems: "center", gap: "10px",
        marginLeft: "8px", paddingLeft: "12px",
        borderLeft: "1px solid rgba(45,127,255,0.2)",
      }}>
        <div style={{
          width: "32px", height: "32px",
          background: "linear-gradient(135deg, #f0c040, #c9971f)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.8rem", fontWeight: 700, color: "#0a0f1a",
        }}>
          {user?.name?.charAt(0)?.toUpperCase() || "P"}
        </div>
        <button onClick={userLogout} style={{
          background: "rgba(255,60,60,0.1)",
          border: "1px solid rgba(255,60,60,0.2)",
          color: "#ff7070",
          borderRadius: "8px",
          padding: "7px 14px",
          fontSize: "0.82rem",
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "'DM Sans', sans-serif",
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

export default CustomerHeader;