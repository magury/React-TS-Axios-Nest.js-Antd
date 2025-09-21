import {
  Avatar,
  Card,
  FloatButton,
  Input,
  InputRef,
  Modal,
  notification,
} from "antd";
import React, {
  ChangeEvent,
  Fragment,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { LikeOutlined, DislikeOutlined, FormOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { putPublicJson, putTopicContent } from "@/utility/http";
import { useAppSelector } from "@/store/hooks";
import { isChinese } from "@/utility/constant";
import { popular } from "@/utility/new.type";

const App: React.FC = () => {
  const [likeNumber, setLikeNumber] = useState<[number, number]>([0, 0]);
  const [api, contextHolder] = notification.useNotification();
  /*用于判断是否可以编辑*/
  const { userId } = useAppSelector((state) => state.login.doth);
  /*路由跳转*/
  const navigate = useNavigate();
  /*获取路由参数*/
  //需要上传的路由参数
  const only = useRef<any>("");
  const title = useRef<any>();
  const describe = useRef<any>();
  const paragraph = useRef<any>();
  /* loading or not*/
  const [loading, setLoading] = useState(false);
  //显示的json
  const [json, setJson] = useState<popular.json[]>(
    useLoaderData() as popular.json[]
  );
  //模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  /*显示模态框*/
  const showModal = () => {
    setIsModalOpen(true);
    // console.log('模态框被打开')
  };
  useEffect(() => {
    console.log(json);
  }, []);
  /** 点击确定 */
  const handleOk = async () => {
    const {
      current: {
        input: { value: topic },
      },
    } = title;
    const {
      current: {
        resizableTextArea: {
          textArea: { value: description },
        },
      },
    } = describe;
    const {
      current: {
        resizableTextArea: {
          textArea: { value: content },
        },
      },
    } = paragraph;
    if (topic == "" || content == "") {
      api.open({ message: "标题或内容不能为空！！！" });
    } else if (isPut(topic) && isPut(content) && isPut(description)) {
      setLoading(true);
      const res = await putTopicContent({
        userId,
        topic,
        description,
        content,
      });
      if (res.statusCode == 200) {
        const result = await fetch(res.result.path).then((response) =>
          response.json()
        );
        setJson(result);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            setLoading(false);
            setIsModalOpen(false);
          }, 1000);
        });
      }
    } else {
      api.error({ message: "你现在在乱输内容！！！" });
    }
  };
  /*判断是不是属于能发布的内容*/
  function isPut(values: string): boolean {
    let chCount = 0;
    for (let value of values)
      chCount = isChinese(value) ? chCount + 1 : chCount;
    return chCount >= values.length / 2;
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  /*模态框*/
  const [badge, setBadge] = useState(0);
  /*  点赞 */
  const outlined = (onlyKey: String, index: number) => {
    only.current = onlyKey;
    let result: popular.json[] = [];
    switch (index) {
      case 1:
        result = json.map((item) => {
          if (item.onlyKey == onlyKey && likeNumber[0] < 10) {
            item.like++;
            likeNumber[0]++;
            setLikeNumber([...likeNumber]);
          }
          return item;
        });
        break;
      case 2:
        result = json.map((item) => {
          if (item.onlyKey == onlyKey && likeNumber[1] < 10) {
            item.dislike++;
            likeNumber[1]++;
            setLikeNumber([...likeNumber]);
          }
          return item;
        });
        break;
    }

    setJson(result);
  };
  useEffect(() => {
    putPublicJson(only.current, json).then((res) => res.result);
  }, [json]);
  /* 记录输入框变换*/
  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // console.log(e.target.value)
  };
  return (
    <Fragment>
      {contextHolder}
      <Modal
        afterClose={() => {
          setLoading(false);
        }}
        className=""
        confirmLoading={loading}
        cancelText={"取消"}
        okText={"确认输入"}
        okType={"danger"}
        title={<span className="text-zinc-600">写入你的内容</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          className="border-0   f-0 rounded-none border-b border-b-purple-300 "
          ref={title}
          onChange={change}
          placeholder="输入标题"
        />
        <br />
        <TextArea
          ref={describe}
          onChange={change}
          autoSize={true}
          showCount={true}
          className="border-0 line f-0 rounded-none border-b border-b-purple-300 text-gray-400"
          placeholder="输入描述信息"
        />
        <TextArea
          ref={paragraph}
          onChange={change}
          autoSize={{ minRows: 5 }}
          showCount={true}
          className="border-0 line f-0 rounded-none border-b border-b-purple-300 text-gray-400"
          placeholder="输入内容"
        />
      </Modal>
      <div>
        {userId && (
          <FloatButton
            onClick={showModal}
            badge={{ count: badge == 0 ? null : badge }}
            icon={<FormOutlined />}
            type="primary"
            className="top-[100px] right-[24px]"
          />
        )}
        <div className="flex flex-row">
          <div className="pt-[10px] flex flex-row flex-wrap  noSelect justify-start">
            {json!.map((item: any, index) => (
              <Card
                hoverable
                key={index}
                className="min-w-[250px] w-[300px] m-[10px]"
                cover={
                  <img
                    onClick={() => {
                      navigate("/detail/introduce", {
                        state: {
                          item,
                        },
                      });
                    }}
                    alt="example"
                    src={item.descriptionPath}
                  />
                }
                actions={[
                  <div className={"select-none"}>
                    <DislikeOutlined
                      key="setting"
                      onClick={() => outlined(item.onlyKey, 2)}
                    />
                    <span className={"text-yellow-800 size-12"}>
                      {item.dislike > 0 ? item.dislike : null}
                    </span>
                  </div>,
                  <div>
                    <LikeOutlined
                      key="edit"
                      onClick={() => outlined(item.onlyKey, 1)}
                    />
                    <span className={"text-yellow-800 size-12"}>
                      {item.like > 0 ? item.like : null}
                    </span>
                  </div>,
                ]}
              >
                <div
                  onClick={() => {
                    navigate("/detail/introduce", {
                      state: {
                        item,
                      },
                    });
                  }}
                >
                  <Meta
                    className={"max-w-[250px]"}
                    avatar={<Avatar src={item.avatarPath} />}
                    title={item.title}
                    description={item.description}
                  />
                  <br />
                  <span
                    className={"float-left"}
                    children={"作者:" + item.author}
                  />
                  <span
                    className={"float-right"}
                    children={"发布时间:" + item.publicDate}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default App;
