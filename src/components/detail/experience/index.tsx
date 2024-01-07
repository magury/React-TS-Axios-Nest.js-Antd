import React, { Fragment, useState } from "react";
import {
  LikeOutlined,
  DislikeOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FormOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { Badge, Avatar, Input, Empty, Button, FloatButton, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <div className="experience">
        <Modal
          title="欢迎"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <TextArea
            autoSize={true}
            showCount={true}
            className="line"
            // rows={10}
            placeholder="输入你的问题"
          />
        </Modal>
        <FloatButton
          onClick={showModal}
          shape="square"
          type="primary"
          style={{ right: 24, top: 80, height: 10 }}
          icon={<CustomerServiceOutlined />}
        />
        <div className="item">
          <div className="flex">
            <span className="title">嵌入式芯片入门/进阶教程！</span>
            <div className="text">
              <div>
                叩持电子:
                你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好
                你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好
                你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好
              </div>
            </div>
            <br />
            <div style={{ color: "black" }}>
              <i style={{ marginRight: 20 }}></i>
              <LikeOutlined />
              <i style={{ marginRight: 40 }}></i>
              <DislikeOutlined />
              <i style={{ marginRight: 40 }}></i>
              <MenuUnfoldOutlined />
              <i style={{ marginRight: 5 }}></i>
              <span>查看评论</span>
              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}
                >
                  <Badge dot>
                    <Avatar shape="square" icon={<UserOutlined />} />
                  </Badge>
                  <TextArea
                    style={{ marginLeft: 30 }}
                    autoSize={true}
                    showCount={true}
                    className="line"
                    // rows={10}
                    placeholder="输入评论"
                  />
                </div>
                <div
                  style={{
                    margin: "0 auto",
                    width: " 100%",
                    border: " 1px solid rgba(153, 151, 151, 0.5)",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <Avatar
                      shape="square"
                      size="small"
                      icon={<UserOutlined />}
                    />
                    <span style={{ fontSize: 12 }}>半夜起床去杀猪</span>
                    <br />
                    <div
                      style={{
                        marginLeft: 22,
                        fontSize: 12,
                        position: "relative",
                      }}
                    >
                      你好
                      <span style={{ position: "absolute", right: 10 }}>
                        <FormOutlined />
                        <span>评论</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default App;
