import "./Navbar.scss";
import { HiOutlineCloud, HiOutlineTable } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const path = useLocation().pathname;

  return (
    <nav id="navbar">
      <Link
        className={
          path === "/react-weather"
            ? "navbar__link navbar__selected"
            : "navbar__link"
        }
        to="/react-weather"
      >
        <HiOutlineCloud size={24} /> Forecast
      </Link>
      <Link
        className={
          path === "/react-weather/table"
            ? "navbar__link navbar__selected"
            : "navbar__link"
        }
        to="/react-weather/table"
      >
        <HiOutlineTable size={24} /> Table
      </Link>
    </nav>
  );
}

export default Navbar;
