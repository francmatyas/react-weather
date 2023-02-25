import "./Footer.scss";

import { GrCreativeCommons } from "react-icons/gr";

function Footer() {
  return (
    <footer id="footer">
      <div id="footer__contribution">
        <span>
          Data from{" "}
          <a rel="author" href="https://www.met.no/en">
            The Norwegian Meteorological Institute
          </a>{" "}
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <GrCreativeCommons size={16} />
          </a>
        </span>
        <span>
          Powered by{" "}
          <a rel="author" href="https://sunrisesunset.io/">
            SunriseSunset.io
          </a>
        </span>
        <span>
          Search powered by{" "}
          <a rel="author" href="https://www.openstreetmap.org/copyright">
            OpenStreetMap
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
