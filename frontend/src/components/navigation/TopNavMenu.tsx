import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";

const items1: MenuProps["items"] = [
  {
    key: "projects",
    label: <Link to={"/projects"}>Projects</Link>,
  },
];

const TopNavMenu = () => {
  return (
    <Menu
      data-test="topnav-menu"
      mode="horizontal"
      defaultSelectedKeys={["projects"]}
      items={items1}
      style={{ flex: 1, minWidth: 0, margin: "0 10px" }}
    />
  );
};

export default TopNavMenu;
