import "./AppDesign.scss";

import lineImg from "../../assets/svgs/line.svg";

function AppDesign(props) {
  return (
    <div id="app-design">
      <h3 id="app-design__demo">DEMO Weather App</h3>
      <img id="app-design__line" src={lineImg} />
      <img id="app-design__img" src={props.image} />
    </div>
  );
}

export default AppDesign;
