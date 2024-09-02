import { Layout, theme } from "antd";
import React from "react";
import SideNavMenu from "../navigation/SideNavMenu";

const {  Content, Sider } = Layout;
const ClientFermentationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider width={200} style={{ background: colorBgContainer }}>
        <SideNavMenu />
      </Sider>
      <Layout style={{ padding: "24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: "calc(var(--vh) * 80)", // <-- fixed height on 80 view port height
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClientFermentationLayout;
