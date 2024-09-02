import { FileAddTwoTone, FundTwoTone, ProfileTwoTone } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";

const items2: MenuProps["items"] = [
  {
    key: "data-upload",
    icon: <FileAddTwoTone />,
    label: <Link data-test="sider-btn" to="data-upload">Data Upload</Link>,
  },
  {
    key: "data-table",
    icon: <ProfileTwoTone />,
    label: <Link data-test="sider-btn" to="data-table">Data Table</Link>,
  },
  {
    key: "data-graph",
    icon: <FundTwoTone />,
    label: <Link data-test="sider-btn" to="data-graph">Data Graph</Link>,
  },
];

const SideNavMenu = () => {
  const location = useLocation();
  return (
    <Menu
      data-test="sider-menu"
      mode="inline"
      selectedKeys={[location.pathname.split("/").slice(-1)[0]]}
      style={{ height: "100%", borderRight: 0 }}
      items={items2}
    />
  );
};

export default SideNavMenu;
