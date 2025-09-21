import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Layout,
  Flex,
  Input,
  Card,
  Image,
  InputRef,
  Button,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import {
  SearchOutlined,
  BgColorsOutlined,
  SlackSquareOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { getHospitalList } from "@/utility/http";
import { useAppDispatch } from "@/store/hooks";
import { setHospitalInfo } from "@/features/hospital/hospitalSlice";
import {chat} from "@/utility/new.type";

const { Header, Footer, Content } = Layout;
const { Meta } = Card;
const App: React.FC = () => {
  let loader = useLoaderData() as chat.loader;
  let dispatch = useAppDispatch();
  const select = useRef(["全部", "全部"]);
  const original = useRef(loader.hospital);
  const hospitalName = useRef<InputRef>(null);
  const [hospitalList, setList] = useState<chat.data[]>(loader.hospital);
  const provinces = useRef(loader.province);
  const navigate = useNavigate();
  // 搜索框
  const search = () => {
    getHospitalList(hospitalName.current?.input?.value || "医院").then(
      (res) => {
        original.current = res.result;
        setList(res.result);
      }
    );
  };
  const change = (state: { hospitalId: String; hospitalName: String }) => {
    dispatch(setHospitalInfo(state));
    navigate("/detail");
  };
  const colorChange = (e: { target: HTMLElement }) => {
    let node: HTMLElement = e.target;
    let parent: ParentNode | null = node.parentNode;
    let children: NodeListOf<ChildNode> = parent!.childNodes;
    children.forEach((item:any, index: number) => {
      item.style.setProperty("color", "black");
    });
    node.style.setProperty("color", "#1677ff");
  };
  /**
   * @description: 筛选省份和level
   * @param {any} e
   * @return {*}
   */
  const level = (e: any): void => {
    const target = e.target.getAttribute("id");
    colorChange(e);
    const key = e.target.innerText;
    if (target == "level") select.current[0] = key;
    if (target == "position") select.current[2] = key;
    //   更新数据
    let arr = original.current;
    if (select.current[0] != "全部") {
      arr = arr.filter((item) => item.hospitalLevel == select.current[0]);
    }
    if (select.current[1] != "全部") {
      arr = arr.filter((item) => item.province == select.current[1]);
    }
    setList(arr);
  };
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout className={"rounded-[8px] overflow-hidden  w-[100%] bg-black"}>
        <Header
          className={
            "text-center text-[#fff] h-[64px] ps-[48px] pe-[48px] leading-[64px] bg-white fixed z-10 w-[100%]"
          }
        >
          <Input
            className="border-0 rounded-none hover:border-b-purple-300 border-b border-b-purple-300 f-0"
            ref={hospitalName}
            style={{ width: "500px", marginRight: "0px" }}
            size="large"
            placeholder="搜索医院名称"
            prefix={<SearchOutlined />}
          />

          <Button
            onClick={search}
            className="focus:outline-none bg-fuchsia-100"
            type="text"
          >
            搜索
          </Button>
          <Link to={"/login"}>
            <Button
              className="absolute right-0 h-[64px]  focus:outline-none mr-[20px]"
              type="link"
              danger
            >
              Sign in
            </Button>
          </Link>
          <br />
          <br />
        </Header>
        <Layout>
          <Content
            className={"min-h-[120px] text-black bg-white relative pt-[64px]"}
          >
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
                      <span id="level" key={index} onClick={level}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="position">
                    {["全部", ...provinces.current].map((item, index) => (
                      <span id="position" key={index} onClick={level}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <br />
              <div className="pop">
                <div className="myCard">
                  {hospitalList.map((item: chat.data, index) => {
                    const bg = (item: any) => (
                      <Fragment>
                        <BgColorsOutlined /> {item.hospitalName}
                      </Fragment>
                    );
                    return (
                      <Card
                        onClick={() => {
                          change({
                            hospitalId: item.hospitalId,
                            hospitalName: item.hospitalName,
                          });
                        }}
                        headStyle={{ color: "#a45555" }}
                        key={index}
                        title={bg(item)}
                        hoverable={true}
                      >
                        <SlackSquareOutlined />
                        &nbsp; &nbsp; {item.hospitalLevel}
                      </Card>
                    );
                  })}
                </div>
              </div>
              <br />
              <div className="pop">
                <Pop title={{ item1: "医生科普", item2: "热门推荐 ......" }} />
                <div className="myCard">
                  {original.current.map((item: chat.data, index) => {
                    return (
                      <Card
                        onClick={() =>
                          change({
                            hospitalId: item.hospitalId,
                            hospitalName: item.hospitalName,
                          })
                        }
                        id={item.hospitalId + ""}
                        key={index}
                        hoverable={true}
                        cover={
                          <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          />
                        }
                      >
                        <Meta
                          title="图文专栏"
                          description={item.hospitalName}
                        />
                      </Card>
                    );
                  })}
                </div>
              </div>
              <br />
              <div className="pop">
                <Pop title={{ item1: "排行榜", item2: "新起之秀 ......" }} />
                <div className="myCard" id="card">
                  {original.current.map((item: chat.data, index) => {
                    return (
                      <Card
                        key={index}
                        hoverable
                        style={{ width: 240 }}
                        cover={
                          <img
                            alt="example"
                            src={require("@/assets/images/music.png")}
                          />
                        }
                      >
                        <Meta
                          title={item.hospitalLevel}
                          description={item.hospitalName}
                        />
                      </Card>
                    );
                  })}
                </div>
              </div>
              <br />
              <div className="pop">
                <Pop
                  title={{ item1: "大家都会买", item2: "热卖商品 ......" }}
                />
                <div className="myCard">
                  {[
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                    "北京协和医院",
                    "乐山第一人民医院",
                    "西南医科大学附属医院",
                  ].map((item: string, index) => {
                    return (
                      <div key={index} className="goods">
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
        </Layout>
        <Footer className={"text-center text-[#fff]"}>Footer</Footer>
      </Layout>
    </Flex>
  );
};
interface Props {
  children?: React.ReactNode;
  title?: {
    item1?: String;
    item2?: String;
  };
}
const Pop: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <span>{props?.title?.item1}</span>
      <span>{props?.title?.item2}</span>
      {/* <i>(更多)</i> */}
      <br />
      <br />
    </Fragment>
  );
};
export default App;
