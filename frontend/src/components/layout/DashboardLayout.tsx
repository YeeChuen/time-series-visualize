import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';
import BrandLogo from '../navigation/BrandLogo';
import SideNavMenu from '../navigation/SideNavMenu';
import TopNavMenu from '../navigation/TopNavMenu';

const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
      return (
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }} data-test="layout-header">
            <BrandLogo />
            <TopNavMenu />
          </Header>
          <Outlet />
        </Layout>
      );
}

export default DashboardLayout