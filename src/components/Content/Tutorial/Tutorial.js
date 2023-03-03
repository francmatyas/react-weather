import "./Tutorial.scss";

import { Stack } from "@mui/material";
import { HiOutlineCursorClick } from "react-icons/hi";
import { WiDayCloudy, WiRain, WiSnow } from "react-icons/wi";

function Tutorial() {
  return (
    <section id="tutorial">
      <Stack>
        <h1 id="tutorial__title">SkySight</h1>
        <h2 id="tutorial__subtitle">
          <p>Never Get Caught in the Rain Again</p>
        </h2>
      </Stack>
      <ol id="tutorial__list">
        <li>
          <div className="tutorial__item">
            <p>Enter your location:</p>
            <div id="tutorial__search">
              <p>Find place</p> <HiOutlineCursorClick size={16} />
            </div>
          </div>
        </li>
        <li>
          <div className="tutorial__item">
            <p>Get the forecast:</p>
            <div id="tutorial__forecast">
              <WiDayCloudy size={32} />
              <WiRain size={32} />
              <WiSnow size={32} />
            </div>
          </div>
        </li>
      </ol>
    </section>
  );
}

export default Tutorial;
