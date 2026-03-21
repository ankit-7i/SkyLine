import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Link to="/user/passenger/register" style={{ textDecoration: "none" }}>
        <button className="btn-ghost-custom" style={{ padding: "9px 20px", fontSize: "0.85rem" }}>
          Register
        </button>
      </Link>
      <Link to="/user/login" style={{ textDecoration: "none" }}>
        <button className="btn-primary-custom" style={{ padding: "9px 20px", fontSize: "0.85rem" }}>
          Login
        </button>
      </Link>
    </div>
  );
};

export default NormalHeader;