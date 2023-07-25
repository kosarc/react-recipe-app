import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const value = useContext(ThemeContext);

  if (value === undefined) {
    throw new Error("useTheme() must be used in ThemeProvider scope");
  }

  return value;
};
