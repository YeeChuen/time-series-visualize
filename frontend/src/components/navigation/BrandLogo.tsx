import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import "./styles.css"

import bostonBioprocessLogo from "../../assets/boston_bioprocess_logo.png";

const BrandLogo = () => {
  return (
    <>
    <Link className="brand--btn" to={"/"}>
      <Avatar
        src={<img src={bostonBioprocessLogo} alt="boston bioprocess logo in header" />}
        shape="square"
      />
      Boston Bioprocess
    </Link>
    </>
  );
};

export default BrandLogo;
