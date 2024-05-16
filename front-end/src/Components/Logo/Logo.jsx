import React from "react";
import { Link } from "react-router-dom";

function Logo({ color }) {
  return (
    <Link
      to={"/"}
      className="container-fluid fs-4 d-block text-decoration-none  "
    >
      <div className="Logo p-3 d-flex align-items-center ">
        <i className="fa-solid fa-book fs-2 me-3 text-danger"></i>
        <p className={`fw-bold m-0 logoFs   ${color}`}>
          WA<span className="text-danger  ">RAQ</span>
        </p>
      </div>
    </Link>
  );
}

export default Logo;
