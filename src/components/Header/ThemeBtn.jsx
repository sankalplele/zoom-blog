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
      className="rounded-2xl ml-2 border-slate-500  duration-500 flex justify-center dark:hover:bg-slate-600 hover:bg-slate-200 items-center w-10"
      type="submit"
      onClick={themeChangeHandler}
    >
      {themeMode == "dark" ? (
        <MdDarkMode size={21} />
      ) : (
        <MdLightMode size={22} />
      )}
    </button>
  );
}

export default ThemeBtn;
