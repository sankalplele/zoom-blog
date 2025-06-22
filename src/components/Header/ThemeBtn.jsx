import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../features/themeSlice";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function ThemeBtn() {
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
    <button
      className="rounded-xl ml-2 border-slate-300 bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-900 hover:bg-white duration-600 flex justify-center items-center w-10"
      type="submit"
      onClick={themeChangeHandler}
    >
      {themeMode == "dark" ? (
        <MdLightMode size={20} />
      ) : (
        <MdDarkMode size={20} />
      )}
    </button>
  );
}

export default ThemeBtn;
