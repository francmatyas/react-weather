import "./AppDesign.scss";

import lineImg from "../../assets/svgs/line.svg";

function AppDesign(props) {
  return (
    <div id="app-design">
      <img id="app-design__line" src={lineImg} alt="line"/>
      <img id="app-design__img" src={props.image} alt="descripes weather"/>
    </div>
  );
}

export default AppDesign;
