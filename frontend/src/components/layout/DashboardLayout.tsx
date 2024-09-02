import { Layout } from 'antd';
import { Outlet } from 'react-router';
import BrandLogo from '../navigation/BrandLogo';
import TopNavMenu from '../navigation/TopNavMenu';

const { Header } = Layout;

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