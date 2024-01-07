import React from "react";
import { Layout, Flex } from "antd";
import { Outlet } from "react-router-dom";
import Menu from "./menu";
const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#ffffff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 520,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#ffffff",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#ffffff",
  width: "30%",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#ffffff",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  //   maxWidth: "calc(50% - 8px)",
};

const App: React.FC = () => (
  <Flex gap="middle" wrap="wrap">
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>
          <Menu />
        </Sider>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  </Flex>
);

export default App;
