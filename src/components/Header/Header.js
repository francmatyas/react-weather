import "./Header.scss";
import { Link, useLocation } from "react-router-dom";

import SearchBox from "./SearchBox/SearchBox";
import UnitSwitch from "./UnitSwitch";

import { HiOutlineCloud, HiOutlineTable } from "react-icons/hi";

function Header(props) {
  const path = useLocation().pathname;

  return (
    <div id="header">
      <div className="header__container">
        <SearchBox onSearchSelect={props.onSearchSelect} onLoading={props.onLoading}/>
        <UnitSwitch unit={props.unit} onUnitChange={props.onUnitChange} />
      </div>

      <nav id="header__navbar">
        <Link
          className={
            path === "/"
              ? "header__link header__navbar__selected"
              : "header__link"
          }
          to="/"
        >
          <HiOutlineCloud size={24} /> Forecast
        </Link>
        <Link
          className={
            path === "/table"
              ? "header__link header__navbar__selected"
              : "header__link"
          }
          to="/table"
        >
          <HiOutlineTable size={24} /> Table
        </Link>
      </nav>
    </div>
  );
}

export default Header;
