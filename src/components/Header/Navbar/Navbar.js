import "./Navbar.scss";
import { HiOutlineCloud, HiOutlineTable } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const path = useLocation().pathname;

  return (
    <nav id="navbar">
      <Link
        className={
          path === "/"
            ? "navbar__link navbar__selected"
            : "navbar__link"
        }
        to="/"
      >
        <HiOutlineCloud size={24} /> Forecast
      </Link>
      <Link
        className={
          path === "/table"
            ? "navbar__link navbar__selected"
            : "navbar__link"
        }
        to="/table"
      >
        <HiOutlineTable size={24} /> Table
      </Link>
    </nav>
  );
}

export default Navbar;
