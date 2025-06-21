import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../features/themeSlice";

function Header() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.themeMode);

  function themeChangeHandler() {
    if (themeMode === "dark") dispatch(lightTheme());
    else dispatch(darkTheme());
  }
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <>
      Header
      <button type="submit" onClick={themeChangeHandler}>
        Switch to {themeMode == "dark" ? "light" : "dark"} theme
      </button>
    </>
  );
}

export default Header;
