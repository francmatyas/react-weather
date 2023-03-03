import "./Footer.scss";

import { GrCreativeCommons } from "react-icons/gr";

function Footer() {
  return (
    <footer id="footer">
      <div id="footer__contribution">
        <p>
          Data from{" "}
          <a href="https://www.met.no/en">
            The Norwegian Meteorological Institute
          </a>{" "}
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <GrCreativeCommons size={16} />
          </a>
        </p>
        <p>
          Powered by <a href="https://sunrisesunset.io/">SunriseSunset.io</a>
        </p>
        <p>
          Search powered by{" "}
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
        </p>
        <p>
          This is only demo application created by{" "}
          <a rel="author" href="https://www.francmatyas.com/">
            Matyáš Franc
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
