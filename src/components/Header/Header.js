import "./Header.scss";
import Navbar from "./Navbar/Navbar";

import SearchBox from "./SearchBox/SearchBox";
import UnitSwitch from "./UnitSwitch";

function Header(props) {
  return (
    <header id="header">
      <div id="header__container">
        <SearchBox
          onSearchSelect={props.onSearchSelect}
          onLoading={props.onLoading}
        />
        <UnitSwitch unit={props.unit} onUnitChange={props.onUnitChange} />
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
