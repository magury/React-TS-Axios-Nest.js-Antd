import { Avatar, Card, FloatButton, Input, Modal } from "antd";
import React, { Fragment, useState } from "react";
import { LikeOutlined, DislikeOutlined, FormOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
const App: React.FC = () => {
  //模态框
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
  //模态框
  const [badge, setBadge] = useState(0);
  const navigate = useNavigate();
  const [action, setAction] = useState({
    like: 0,
    dislike: 0,
  });
  const outlined = (item: number) => {
    switch (item) {
      case 1:
        setAction({ ...action, like: action.like + 1 });
        break;
      case 2:
        setAction({ ...action, dislike: action.dislike + 1 });
        break;

      default:
        break;
    }
  };
  const [author, setAuthor] = useState("郑飞狗");
  const [timer, setTimer] = useState("2020/12/12");
  return (
    <Fragment>
      <Modal
        title="写入你的内容"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="输入标题" />
        <br />
        <TextArea
          autoSize={true}
          showCount={true}
          className="line"
          // rows={10}
          placeholder="输入内容"
        />
      </Modal>
      <div className="popular">
        <FloatButton
          onClick={showModal}
          badge={{ count: badge == 0 ? null : badge }}
          icon={<FormOutlined />}
          type="primary"
          style={{ right: 24, top: 100 }}
        />
        <div className="flex">
          <div className="card">
            {[1, 1, 1, 1, 1, 1].map((_, index) => {
              return (
                <Card
                  onClick={() => navigate("/detail/introduce")}
                  hoverable
                  key={index}
                  style={{
                    minWidth: 300,
                    width: "fit-content",
                    margin: 20,
                  }}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <div>
                      <DislikeOutlined
                        key="setting"
                        onClick={() => outlined(1)}
                      />
                      <span>{action.like > 0 ? action.like : null}</span>
                    </div>,
                    <div>
                      <LikeOutlined key="edit" onClick={() => outlined(2)} />
                      <span>{action.dislike > 0 ? action.dislike : null}</span>
                    </div>,
                  ]}
                >
                  <Meta
                    style={{
                      maxWidth: 250,
                    }}
                    avatar={
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                    }
                    title="为啥要睡觉？归根到底是因为“吃” | 我们为什么要睡觉"
                    description="This is the description"
                  />
                  <br />
                  <span style={{ float: "left" }}>作者:{author}</span>
                  <span style={{ float: "right" }}>发布时间:{timer}</span>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default App;
