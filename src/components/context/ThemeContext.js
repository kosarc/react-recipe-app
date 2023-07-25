import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeChange = (state, action) => {
  switch (action.type) {
    case "COLOR_CHANGE":
      return { ...state, color: action.payload };

    case "MODE_CHANGE":
      return { ...state, mode: action.payload };

    case "EDIT_CHANGE":
      return { ...state, edit: action.payload };

    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeChange, {
    color: "#F2BE22",
    mode: "dark",
    edit: false,
  });

  const changeColor = (color) => {
    dispatch({ type: "COLOR_CHANGE", payload: color });
  };

  const changeMode = (mode) => {
    dispatch({ type: "MODE_CHANGE", payload: mode });
  };

  const changeEdit = (edit) => {
    dispatch({ type: "EDIT_CHANGE", payload: edit });
  };

  return (
    <ThemeContext.Provider
      value={{ ...state, changeColor, changeMode, changeEdit }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
