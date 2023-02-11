import "./Tutorial.scss";

import { Stack } from "@mui/material";
import { HiOutlineCursorClick } from "react-icons/hi";
import { WiDayCloudy, WiRain, WiSnow } from "react-icons/wi";

function Tutorial() {
  return (
    <div className="content">
      <div className="tutorial">
        <Stack>
          <h1 className="tutorial__title">SkySight</h1>
          <h2 className="tutorial__subtitle">
            <span>Never Get Caught in the Rain Again</span>
          </h2>
        </Stack>
        <ol className="tutorial__list">
          <li>
            <div className="tutorial__item">
              <span>Enter your location:</span>
              <div className="tutorial__search">
                <span>Find place</span> <HiOutlineCursorClick size={16} />
              </div>
            </div>
          </li>
          <li>
            <div className="tutorial__item">
              <span>Get the forecast:</span>
              <div className="tutorial__forecast">
                <WiDayCloudy size={32} />
                <WiRain size={32} />
                <WiSnow size={32} />
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Tutorial;
