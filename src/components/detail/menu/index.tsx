import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { MenuProps, ConfigProvider } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("医院信息", "sub1", <MailOutlined />),
  getItem("公众科普", "sub2", <MailOutlined />),
  getItem("科室介绍", "sub3", <MailOutlined />),
  getItem("就医指导", "sub4", <MailOutlined />, [
    getItem("交通指南", "sub45"),
    getItem("门诊指南", "sub46"),
    getItem("住院指南", "sub47"),
    getItem("医保指南", "sub48"),
  ]),
  getItem("经验交流", "sub5", <MailOutlined />),
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = ({
    keyPath,
  }: {
    keyPath: string[];
  }) => {
    console.log(keyPath[0]);
    const title = keyPath[0];
    switch (title) {
      case "sub1":
        navigate("introduce");
        break;
      case "sub3":
        navigate("depart");
        break;
      case "sub45":
      case "sub46":
      case "sub47":
      case "sub48":
        navigate("/detail");
      case "sub2":
        navigate("popular");
        break;
      case "sub5":
        navigate("experience");
        break;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHeight: 80,
          },
        },
      }}
    >
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </ConfigProvider>
  );
};

export default App;
