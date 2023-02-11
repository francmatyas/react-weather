import "./Footer.scss";

import { GrCreativeCommons } from "react-icons/gr";

function Footer() {
  return (
    <footer id="footer">
      <span>
        Data from The Norwegian Meteorological Institute{" "}
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
    </footer>
  );
}

export default Footer;
