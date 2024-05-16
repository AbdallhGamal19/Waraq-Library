import React from "react";
import loader from "./loader.module.css";
function Loader() {
  return (
    <div className="w-100 vh-100 bg-black position-fixed z-1 d-flex justify-content-center align-items-center ">
      <span className={loader.loader}></span>
    </div>
  );
}

export default Loader;
