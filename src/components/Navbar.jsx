import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();
  return <header className="nav"><Link className="brand" to="/"><span className="brand-ball">●</span><span>PPL <b>S9</b></span></Link><nav><Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link><Link className={location.pathname === "/auction" ? "active" : ""} to="/auction">Auction</Link></nav><Link className="nav-cta" to="/auction">Enter Auction <span>↗</span></Link></header>;
}
