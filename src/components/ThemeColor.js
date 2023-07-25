import React from "react";
import { useTheme } from "./hooks/useTheme";

//style
import "./ThemeColor.css";

//assets
import ModelIcon from "./assets/mode-icon.svg";

const colors = ["#F2BE22", "#9681EB", "#FF90BB"];

export default function ThemeColor() {
  const { changeColor, changeMode, mode } = useTheme();

  const handleTogle = () => {
    changeMode(mode === "dark" ? "light" : "dark");
    console.log(mode);
  };

  return (
    <div className="theme-color">
      <div
        className="togle-mode"
        onClick={handleTogle}
        style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
      >
        <img src={ModelIcon} alt="dark/light mode" />
      </div>
      <div className="color">
        {colors.map((color) => (
          <div
            key={color}
            style={{ background: color }}
            onClick={() => changeColor(color)}
          />
        ))}
      </div>
    </div>
  );
}
