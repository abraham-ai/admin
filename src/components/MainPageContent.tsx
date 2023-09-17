import React, { useState, useContext, useEffect } from 'react';
import { ToolOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';

import Admin from "components/Admin";
import Dashboard from "components/Dashboard";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MainPageContent = () => {

  const items: MenuItem[] = [
    getItem('Admin', 'sub1', <UserOutlined />, [
      getItem('Manna', '2'),
      getItem('Dashboard', '3'),
    ]),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {token: { colorBgContainer }} = theme.useToken();

  const handleMenuClick = (e: any) => {
    setActiveItem(e.key);
  }

  useEffect(() => {
    setActiveItem('2');
  }, [setActiveItem]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <a href="https://eden.art">
          <center>
            <img src="logo192.png" style={{width: "66.6%"}}/>
          </center>
        </a>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ 
          padding: 16, 
          background: colorBgContainer, 
          marginLeft: "auto", 
          marginRight: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          Hello
        </Header>
        <Content style={{ margin: '0 16px', padding: "16px", background: colorBgContainer }}>    
          {activeItem === '2' && <Admin />}
          {activeItem === '3' && <Dashboard />}
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default MainPageContent;
