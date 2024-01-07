import React, { Fragment } from "react";
import { Layout, Flex, Input, Card, Image } from "antd";
import {
  SearchOutlined,
  BgColorsOutlined,
  SlackSquareOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Pop from "./pop";
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  // backgroundColor: "#4096ff",
  backgroundColor: "white",
};

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  color: "black",
  // backgroundColor: "#0958d9",
  backgroundColor: "white",
  position: "relative",
};

const siderStyle: React.CSSProperties = {
  textAlign: "left",
  // lineHeight: "120px",
  color: "#000000",
  backgroundColor: "#ffffff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
};
const App: React.FC = () => {
  const navigate = useNavigate();
  const change = () => {
    navigate("/detail");
  };
  const level = (e: any) => {
    let node: HTMLElement = e.target;
    let parent: ParentNode | null = node.parentNode;
    let children: NodeListOf<ChildNode> = parent!.childNodes;
    children.forEach((item: any, index: number) => {
      item.style.setProperty("color", "black");
    });
    node.style.setProperty("color", "#1677ff");
  };
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Input
            style={{ width: "500px", marginRight: "50px" }}
            size="large"
            placeholder="搜索医院名称"
            prefix={<SearchOutlined />}
          />
          <span
            style={{ color: "#4096ff", fontSize: "20px", cursor: "pointer" }}
          >
            搜索
          </span>
          <br />
          <br />
        </Header>
        <Layout>
          <Content style={contentStyle}>
            <div className="content">
              <span>医院</span>
              <br />
              <div className="category">
                <div className="title">
                  <span>等级：</span>
                  <span>地区：</span>
                </div>
                <div className="other">
                  <div className="level">
                    {[
                      "全部",
                      "三级甲等",
                      "三级乙等",
                      "二级甲等",
                      "二级乙等",
                      "一级",
                    ].map((item, index) => (
                      <span key={index} onClick={level}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="position">
                    {[
                      "全部",
                      "三级甲等",
                      "三级乙等",
                      "二级甲等",
                      "二级乙等",
                      "一级",
                    ].map((item, index) => (
                      <span key={index} onClick={level}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <br />
              <div className="pop">
                <div className="card">
                  {[
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                  ].map((item: string, index) => {
                    const bg = (item: string) => (
                      <Fragment>
                        <BgColorsOutlined /> {item}
                      </Fragment>
                    );
                    return (
                      <Card
                        onClick={change}
                        headStyle={{ color: "#a45555" }}
                        key={index}
                        title={bg(item)}
                        hoverable={true}
                      >
                        <SlackSquareOutlined />
                        &nbsp; &nbsp; 三级甲等
                      </Card>
                    );
                  })}
                </div>
              </div>
              <br />
              <div className="pop">
                <Pop title={{ item1: "科普时间", item2: "热门专栏 ......" }} />
                <div className="card">
                  {[
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                  ].map((item: string, index) => {
                    return (
                      <Card
                        key={index}
                        hoverable={true}
                        cover={
                          <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          />
                        }
                      >
                        <Meta title="图文专栏" description={item} />
                      </Card>
                    );
                  })}
                </div>
              </div>
              <br />
              <div className="pop">
                <Pop title={{ item1: "失眠？", item2: "音乐来治疗 ......" }} />
                <div className="card" id="card">
                  {[
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                  ].map((item: string, index) => {
                    return (
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                          <img
                            alt="example"
                            src={require("../../assets/music.png")}
                          />
                        }
                      >
                        <Meta
                          title="Europe Street beat"
                          description="www.instagram.com"
                        />
                      </Card>
                    );
                  })}
                </div>
              </div>
              <br />
              <div className="pop">
                <Pop title={{ item1: "好物？", item2: "热卖商品 ......" }} />
                <div className="card">
                  {[
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                  ].map((item: string, index) => {
                    return (
                      <div className="goods">
                        <Image.PreviewGroup
                          items={[
                            "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
                          ]}
                        >
                          <Image
                            width={200}
                            src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                          />
                        </Image.PreviewGroup>
                        <span>
                          <i>金属中性笔</i>
                          <i>￥50</i>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Content>
          <Sider width="25%" style={siderStyle}>
            <br />
            <br />
            <span
              style={{
                marginLeft: "20px",
              }}
            >
              常见科室
            </span>
            {[1, 2, 3, 4].map((item, index) => {
              return (
                <div className="ks" key={item}>
                  <span
                    style={{
                      marginLeft: "30px",
                      marginRight: "50px",
                    }}
                  >
                    神经内科
                  </span>
                  <span>消化内科</span>
                </div>
              );
            })}
            <div
              style={{
                marginLeft: "25px",
                marginTop: "30px",
                fontSize: "16px",
              }}
            >
              <span style={{ color: "#072" }}>热门话题......</span>
              <ol className="topic">
                {[
                  "感冒的危害有哪些？",
                  "早晨起床吃什么最好？",
                  "你不知道的十个健身小知识",
                  "感冒的危害有哪些？",
                  "早晨起床吃什么最好？",
                  "你不知道的十个健身小知识",
                ].map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ol>
            </div>
          </Sider>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Flex>
  );
};
export default App;
