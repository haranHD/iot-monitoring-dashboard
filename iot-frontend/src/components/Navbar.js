import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222" }}>
      <Link to="/" style={{ color: "white", marginRight: "15px" }}>
        Dashboard
      </Link>
      <Link to="/alerts" style={{ color: "white", marginRight: "15px" }}>
        Alerts
      </Link>
      <Link to="/raw-data" style={{ color: "white" }}>
        Raw Data
      </Link>
    </nav>
  );
}

export default Navbar;
