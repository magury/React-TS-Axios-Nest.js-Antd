import React, { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Layout, Flex, Switch, Divider, Menu, Breadcrumb, Space, Avatar, Modal, Upload, message, Form, Input } from "antd";
import type { UploadProps } from 'antd';
import { headerStyle, contentStyle, siderStyle, footerStyle, layoutStyle, tag, avatar, flex, menu, } from "./css";
import { AppstoreOutlined, CalendarOutlined, LinkOutlined, MailOutlined, SettingOutlined, UserOutlined, InboxOutlined } from "@ant-design/icons";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAvatar } from "@/features/login/loginSlice";
type MenuItem = Required<MenuProps>["items"][number];
const { Header, Footer, Sider, Content } = Layout;
const getItem = (label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[]): MenuItem =>
  ({ key, icon, children, label, } as MenuItem)
const { Dragger } = Upload;
const App: React.FC = () => {
  console.log(useParams());
  const [show, setShow] = useState(false)
  // 事件触发器
  const dispatch = useAppDispatch()
  const picturePath = useAppSelector(state => state.login.status.avatarPath)
  const user = { ...useAppSelector(state => state.login) }
  // 上传文件
  const props: UploadProps = {
    showUploadList: show,
    maxCount: 1,
    accept: 'image/*',
    name: 'file',
    multiple: true,
    action: `http://localhost:3011/upload?username=${user.username}&password=${user.password}`,
    onChange(info) {
      setShow(true)
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // 上传到服务器了
        const { response } = info.file
        console.log(response);

        if (response.status == 200) {
          message.success(`${info.file.name} file uploaded successfully.`);
          dispatch(setAvatar(response.result.url))
          // 设置头像
        }


      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  // 导航
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
  // 菜单项
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
  const menuSelected: MenuProps["onClick"] = ({ keyPath, }: { keyPath: string[]; }) => {
    const items = [];
    keyPath.reverse().map((title: string) => { items.push({ title, href: "" }); });
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setShow(false)

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Flex gap="middle" wrap="wrap" style={flex}>
      <Layout style={layoutStyle}>
        <Sider width="25%" style={siderStyle}>
          <Fragment>
            <Switch onChange={changeMode} />
            <span style={{ color: "black", marginLeft: 20 }}>Change Mode</span>
            <Divider type="vertical" />
            <Switch onChange={changeTheme} />
            <span style={{ color: "black", marginLeft: 20 }}>Change Style</span>
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
                {/* 上传头像 */}
                <Modal title="上传你的头像" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <Form
                    disabled={true}
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                  >
                    <Form.Item label="您的名字" name="username" rules={[{ required: true }]}>
                      <Input style={{ width: 100 }} />
                    </Form.Item>

                    <Form.Item label="所在医院" name="password" rules={[{ required: true }]}>
                      <Input style={{ width: 150 }} />
                    </Form.Item>
                    <Form.Item label="所在科室" name="password" rules={[{ required: true }]}>
                      <Input style={{ width: 100 }} />
                    </Form.Item>
                  </Form>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                      banned files.
                    </p>
                  </Dragger>
                </Modal>
                <Avatar
                  onClick={showModal}
                  style={{ cursor: 'pointer' }}
                  src={picturePath}
                  shape="square"
                  size="large"
                  icon={<UserOutlined />}
                />
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
