import React, { Fragment, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Layout,
  Flex,
  Switch,
  Divider,
  Menu,
  Breadcrumb,
  Space,
  Avatar,
} from "antd";
import {
  headerStyle,
  contentStyle,
  siderStyle,
  footerStyle,
  layoutStyle,
  tag,
  avatar,
  flex,
  menu,
} from "./css";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps, MenuTheme } from "antd/es/menu";
type MenuItem = Required<MenuProps>["items"][number];
const { Header, Footer, Sider, Content } = Layout;
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<any>([
    {
      title: (
        <Fragment>
          <UserOutlined />
          <span>首页</span>
        </Fragment>
      ),
      href: "",
    },
  ]);
  const items: MenuItem[] = [
    getItem("患者信息", "患者信息", <MailOutlined />),
    getItem("不良患者", "不良患者", <CalendarOutlined />),
    getItem("数据管理", "数据管理", <AppstoreOutlined />, [
      getItem("数据字典", "数据字典"),
      getItem("添加信息", "添加信息"),
      getItem("医院管理", "医院管理", null, [
        getItem("上传报告", "上传报告"),
        getItem("查看报告", "查看报告"),
      ]),
    ]),
    getItem("订单管理", "订单管理", <SettingOutlined />, [
      getItem("订单列表", "订单列表"),
    ]),
    getItem(
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        有问题？点我去咨询
      </a>,
      "link",
      <LinkOutlined />
    ),
  ];
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");

  const changeMode = (value: boolean) => {
    setMode(value ? "vertical" : "inline");
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };
  const menuSelected: MenuProps["onClick"] = ({
    keyPath,
  }: {
    keyPath: string[];
  }) => {
    const items = [];
    keyPath.reverse().map((title: string) => {
      items.push({ title, href: "" });
    });
    items.unshift({
      title: (
        <Fragment>
          <UserOutlined />
          <span>首页</span>
        </Fragment>
      ),
      href: "",
    });
    setInfo(items);
    switch (keyPath[keyPath.length - 1]) {
      case "患者信息":
        navigate("/patient/info");
        break;
      case "不良患者":
        navigate("bad/info");
        break;
      case "订单列表":
        navigate("order/list");
        break;
      case "数据字典":
        navigate("dictionary");
        break;
      case "添加信息":
        navigate("addition");
        break;
      case "上传报告":
        navigate("list");
        break;
      case "查看报告":
        navigate("look");
        break;
      default:
        break;
    }
    // navigate("/patient");
  };
  return (
    <Flex gap="middle" wrap="wrap" style={flex}>
      <Layout style={layoutStyle}>
        <Sider width="25%" style={siderStyle}>
          <Fragment>
            {/* 左边的标签 */}
            <Switch onChange={changeMode} />
            <span style={{ color: "black" }}>Change Mode</span>
            <Divider type="vertical" />
            <Switch onChange={changeTheme} />
            <span style={{ color: "black" }}>Change Style</span>
            <Menu
              style={menu}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode={mode}
              theme={theme}
              items={items}
              onClick={menuSelected}
            />
          </Fragment>
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <Breadcrumb style={tag} separator=">" items={info} />
            {/* <Search /> */}
            <Space direction="vertical" size={16} style={avatar}>
              <Space wrap size={16}>
                <Avatar shape="square" size="large" icon={<UserOutlined />} />
              </Space>
            </Space>
          </Header>
          <Content style={contentStyle}>
            <Outlet />
            <Footer style={footerStyle}>Footer</Footer>
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default App;
