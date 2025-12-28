"use client";
import React from "react";
import classess from "./Header.module.css";

const HeaderInput = () => {
  return (
    <input
      type="text"
      value=""
      onChange={() => alert()}
      placeholder="Suche ..."
      className={classess.Suche}
    />
  );
};

export default HeaderInput;
