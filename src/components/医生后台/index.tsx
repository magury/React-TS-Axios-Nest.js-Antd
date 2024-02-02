import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Layout,
  Upload,
  notification,
  Flex,
  Menu,
  Breadcrumb,
  Space,
  Modal,
  Form,
  Input,
  Dropdown,
  Avatar,
  Button,
} from "antd";
import type { UploadProps } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  UserOutlined,
  FrownOutlined,
  SmileOutlined,
  UserSwitchOutlined,
  InboxOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd/es/menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStatus } from "@/features/login/loginSlice";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { postFallback } from "@/utility/http";
type MenuItem = Required<MenuProps>["items"][number];
const { Header, Sider, Content } = Layout;
const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({ key, icon, children, label } as MenuItem);
const { Dragger } = Upload;
const App: React.FC = () => {
  /*反馈信息*/
  const errors = useRef<TextAreaRef>(null);
  /*loading……*/
  const [loadings, setLoadings] = useState<boolean>(false);
  // 提示框
  const [api, contextHolder] = notification.useNotification();
  // 文件上传列表
  const [show, setShow] = useState<boolean>(false);
  // 头像点击后选择的哪一项 true:上传头像    false：反馈给管理员
  const [check, setCheck] = useState<boolean>(true);
  // 事件触发器
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.doth);
  // 上传文件
  const props: UploadProps = {
    showUploadList: show,
    maxCount: 1,
    accept: "image/*",
    name: "file",
    multiple: true,
    action: `http://localhost:3011/upload?username=${user.username}&password=${user.password}`,
    onChange(info) {
      setShow(true);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        // 上传到服务器了
        const { response } = info.file;
        if (response.statusCode == 200) {
          success("你成功的上传了头像，已经为你更新！");
          dispatch(setStatus({ avatarPath: response.result.url }));
          // 设置头像
        }
      } else if (status === "error") {
        blunder(`${info.file.name} 文件上传失败`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  // 导航
  const navigate = useNavigate();
  /*菜单前缀*/
  const [info, setInfo] = useState<{ title: ReactNode; href: string }[]>([
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
  // 下拉菜单项
  const drops: MenuProps["items"] = [
    {
      label: "上传个人信息",
      key: "0",
      icon: <UserSwitchOutlined />,
      onClick: () => {
        setCheck(true);
        setShow(false);
        setIsModalOpen(true);
      },
    },
    {
      label: "信息有误？点我反馈",
      key: "1",
      icon: <QuestionOutlined />,
      onClick: () => {
        setCheck(false);
        setShow(false);
        setIsModalOpen(true);
      },
    },
    {
      type: "divider",
    },
    {
      label: `${!user.avatarPath ? "你的头像还未上传!" : ""}`,
      key: "3",
      disabled: true,
    },
  ];
  // 菜单项
  const items: MenuItem[] = [
    getItem("患者信息", "患者信息", <MailOutlined />),
    getItem("不良患者", "不良患者", <CalendarOutlined />),
    getItem("数据管理", "数据管理", <AppstoreOutlined />, [
      getItem("添加信息", "添加信息"),
      getItem("医院管理", "医院管理", null, [
        getItem("上传报告", "上传报告"),
        getItem("查看报告", "查看报告"),
      ]),
    ]),
    getItem(<Link to={"/chat"}>去外面看看</Link>, "link", <LinkOutlined />),
  ];
  /*被选中*/
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
      case "添加信息":
        navigate(`addition/${user.hospitalName}`);
        break;
      case "上传报告":
        navigate(`list/${user.hospitalName}`);
        break;
      case "查看报告":
        navigate(`look/${user.hospitalName}`);
        break;
      default:
        break;
    }
    // navigate("/patient");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setShow(false);
    setIsModalOpen(true);
  };
  const blunder = (description: string) => {
    api.open({
      message: "faulty!",
      description,
      icon: <FrownOutlined style={{ color: "#108ee9" }} />,
      placement: "topLeft",
    });
  };
  const success = (description: string) => {
    api.open({
      message: "successful",
      description,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      placement: "topLeft",
    });
  };
  const dropClick = async () => {
    if (check == true) setIsModalOpen(false);
    else {
      //     提交反馈
      let infos = errors!.current!.resizableTextArea!.textArea!.value;
      if (infos.trim().length == 0) {
        return blunder("不能输入非法字符或者一些无效反馈");
      }
      let update = await postFallback({
        userId: user.userId,
        hospitalId: user.hospitalId,
        errors: infos,
      });
      if (update.statusCode == 200)
        success("你的反馈上传成功,我们将最快通知管理员更改");
      else blunder(update.result.error);
      setLoadings(true);
      await new Promise((resolve) =>
        setTimeout(() => {
          setLoadings(false);
          setIsModalOpen(false);
          resolve(null);
        }, 1000)
      );
    }
  };
  return (
    <Flex gap="middle" wrap="wrap" className={"absolute w-[100%] h-[100%]"}>
      <Layout className={"rounded-none h-0"}>
        <Sider
          width="25%"
          className={"text-center leading-[120px] text-{#fff} bg-white"}
        >
          <Fragment>
            {contextHolder}
            <Menu
              className={"w-[100%] mt-[50px]"}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode={"inline"}
              theme={"light"}
              items={items}
              onClick={menuSelected}
            />
          </Fragment>
        </Sider>
        <Layout>
          <Header
            className={
              "text-center text-[#fff] h-[64px] ps-[48px] pe-[48px] leading-[64px] bg-[#ffffff] relative"
            }
          >
            <Breadcrumb
              className="absolute left-[20px] mt-[15px] text-[14px]"
              separator=">"
              items={info}
            />
            {/* <Search /> */}
            <Space
              direction="vertical"
              size={16}
              className={"absolute right-[20px] mt-[15px] text-[14px]"}
            >
              {/* 上传头像 */}
              <Modal
                title={
                  <span className={"text-neutral-600 "}>
                    {check ? "上传你的头像" : "向管理员反馈错误信息"}
                  </span>
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={
                  <Button
                    type={"primary"}
                    loading={loadings}
                    onClick={dropClick}
                  >
                    {check ? "关闭" : "提交"}
                  </Button>
                }
              >
                {check ? (
                  <>
                    <Form
                      disabled={true}
                      name="wrap"
                      labelCol={{ flex: "110px" }}
                      labelAlign="left"
                      labelWrap
                      wrapperCol={{ flex: 1 }}
                      colon={false}
                      style={{ maxWidth: 600 }}
                    >
                      <Form.Item
                        initialValue={user.author}
                        label="您的名字"
                        name={"author"}
                        rules={[{ required: true }]}
                      >
                        <Input className={"w-fit"} />
                      </Form.Item>

                      <Form.Item
                        initialValue={user.hospitalName}
                        label="所在医院"
                        name={"hospitalName"}
                        rules={[{ required: true }]}
                      >
                        <Input className={"w-fit"} />
                      </Form.Item>
                      <Form.Item
                        initialValue={user.depart}
                        label="所在科室"
                        name={"depart"}
                        rules={[{ required: true }]}
                      >
                        <Input className={"w-fit"} />
                      </Form.Item>
                    </Form>
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">点击上传头像信息</p>
                      <p className="ant-upload-hint">
                        支持各种图片类型,如jpg、png等,但图片大小不宜太大,小于5M最好
                      </p>
                    </Dragger>
                  </>
                ) : (
                  <Fragment>
                    <TextArea
                      ref={errors}
                      className={
                        "break-all border-0  f-0  rounded-[1px] border-b border-b-purple-300 text-gray-400"
                      }
                      placeholder="输入你的错误信息"
                      autoSize={{ minRows: 1 }}
                    />
                  </Fragment>
                )}
              </Modal>
              <Dropdown menu={{ items: drops }}>
                <Avatar
                  className="cursor-pointer mb-10"
                  src={user.avatarPath || null}
                  shape="square"
                  size="large"
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </Space>
          </Header>
          <Content className="text-center leading-[120px] text-[#fff] bg=[#ffffff] flex-shrink-0">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default App;
