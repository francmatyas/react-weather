import "./Header.scss";
import Navbar from "./Navbar/Navbar";

import { useMediaQuery } from "react-responsive";

import SearchBox from "./SearchBox/SearchBox";
import UnitSwitch from "./UnitSwitch";

function Header(props) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <div id="header">
      <div id="header__container">
        <SearchBox
          onSearchSelect={props.onSearchSelect}
          onLoading={props.onLoading}
        />
        <UnitSwitch unit={props.unit} onUnitChange={props.onUnitChange} />
      </div>

      {isDesktop && <Navbar />}
    </div>
  );
}

export default Header;
