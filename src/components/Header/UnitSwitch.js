import { TbTemperatureFahrenheit, TbTemperatureCelsius } from "react-icons/tb";

import { styled } from "@mui/material/styles";
import { Stack, Switch } from "@mui/material";

function UnitSwitch(props) {
  const unit = props.unit;

  function changeUnitHandler() {
    if (unit === "celsius") {
      props.onUnitChange("fahrenheit");
    } else {
      props.onUnitChange("celsius");
    }
  }

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#017AF2",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: "#017AF2",
      boxSizing: "border-box",
    },
  }));

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      id="header__unit__switch"
    >
      <TbTemperatureCelsius
        size={24}
        className={unit === "celsius" && "header__unit__selected"}
      />
      <AntSwitch
        onChange={changeUnitHandler}
        checked={unit === "fahrenheit"}
        inputProps={{ "aria-label": "ant design" }}
      />
      <TbTemperatureFahrenheit
        size={24}
        className={unit === "fahrenheit" && "header__unit__selected"}
      />
    </Stack>
  );
}

export default UnitSwitch;
