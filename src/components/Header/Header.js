import "./Header.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

import SearchBox from "./SearchBox/SearchBox";
import UnitSwitch from "./UnitSwitch";

import { HiOutlineCloud, HiOutlineTable } from "react-icons/hi";

function Header(props) {
  const tab = props.tab;

  return (
    <div id="header">
      <div className="header__container">
        <SearchBox onSearchSelect={props.onSearchSelect} />
        <UnitSwitch unit={props.unit} onUnitChange={props.onUnitChange} />
      </div>

      <nav id="header__navbar">
        {/* <Link to="/"> <HiOutlineCloud size={24} /> Forecast </Link>
        <Link to="/table"> <HiOutlineTable size={24} /> Table </Link> */}

        <button
          onClick={() => props.onTabChange("forecast")}
          className={tab === "forecast" && "header__navbar__selected"}
        >
          <HiOutlineCloud size={24} /> Forecast
        </button>
        <button
          onClick={() => props.onTabChange("table")}
          className={tab === "table" && "header__navbar__selected"}
        >
          <HiOutlineTable size={24} />
          Table
        </button>
      </nav>
    </div>
  );
}

export default Header;
