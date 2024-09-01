import { Menu, MenuProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const items1: MenuProps["items"] = [
  {
    key: "client-fermentation",
    label: <Link to={"/client-fermentation"}>Client Fermentation</Link>,
  },
];

const TopNavMenu = () => {
  return (
    <Menu
      data-test="topnav-menu"
      mode="horizontal"
      defaultSelectedKeys={["client-fermentation"]}
      items={items1}
      style={{ flex: 1, minWidth: 0, margin: "0 10px" }}
    />
  );
};

export default TopNavMenu;
