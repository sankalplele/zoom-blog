import React from "react";

function Button(
  { children },
  type = "button",
  bgColor = "bg-indigo-700",
  className = "",
  textColor = "text-white",
  ...props // if we have props passed by the user additionally
) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
