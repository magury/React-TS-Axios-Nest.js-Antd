import React, {Fragment, useEffect, useState} from "react";
import {Layout, Flex, Input, Card, Image} from "antd";
import {SearchOutlined, BgColorsOutlined, SlackSquareOutlined,} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import Pop from "./pop";
import {getHospitalList} from "@/utils/http";
import {useAppDispatch} from "@/store/hooks";
import {setHospitalInfo} from "@/features/hospital/hospitalSlice";

const {Header, Footer, Sider, Content} = Layout;
const {Meta} = Card;
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
    // backgroundColor: "#4096ff",
};

const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
};
const App: React.FC = () => {
    let dispatch = useAppDispatch();
    const [select, setSelect] = useState(['全部', '全部'])
    const [constant, setConstant] = useState<Addition[]>([])
    const [hospitalName, setHospitalName] = useState()
    const [hospitalList, setList] = useState<Addition[]>([])
    const navigate = useNavigate();
    const onChange = (value: any) => {

        setHospitalName(value.target.value)
    }
    const search = () => {
        getHospitalList(hospitalName || '医院').then((res) => {
            setConstant(res.result)
            setList(res.result)
        })


    }
    const change = (state: { hospitalId: String, hospitalName: String }) => {
        console.log(state)
        dispatch(setHospitalInfo(state))
        navigate('/detail');
    };
    const colorChange = (e: any) => {
        let node: HTMLElement = e.target;
        let parent: ParentNode | null = node.parentNode;
        let children: NodeListOf<ChildNode> = parent!.childNodes;
        children.forEach((item: any, index: number) => {
            item.style.setProperty("color", "black");
        });
        node.style.setProperty("color", "#1677ff");
    }
    const level = (e: any) => {
        const target = e.target.getAttribute('id')
        colorChange(e)
        const key = e.target.innerText
        if (target == 'level')
            setSelect([key, select[1]])
        if (target == 'position')
            setSelect([select[0], key])
    };
    useEffect(() => {
        let res: Addition[] = constant
        const level = select[0]
        if (level != '全部')
            res = constant.filter((item) => item.hospitalLevel == level)
        const province = select[1]
        if (province != '全部')
            res = res.filter((item) => item.hospitalName.includes(province))
        setList(res)
    }, [select])
    useEffect(() => {
        search()
    }, [])
    return (
        <Flex gap="middle" wrap="wrap">
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Input
                        onChange={onChange}
                        style={{width: "500px", marginRight: "50px"}}
                        size="large"
                        placeholder="搜索医院名称"
                        prefix={<SearchOutlined/>}
                    />
                    <span
                        onClick={search}
                        style={{color: "#4096ff", fontSize: "20px", cursor: "pointer"}}
                    >
            搜索
          </span>
                    <br/>
                    <br/>
                </Header>
                <Layout>
                    <Content style={contentStyle}>
                        <div className="content">
                            <span>医院</span>
                            <br/>
                            <div className="category">
                                <div className="title">
                                    <span>等级：</span>
                                    <span>地区：</span>
                                </div>
                                <div className="other">
                                    <div className="level">
                                        {["全部", "三级甲等", "三级乙等", "二级甲等", "二级乙等", "一级",]
                                            .map((item, index) => (
                                                <span id="level" key={index} onClick={level}>
                        {item}
                      </span>
                                            ))}
                                    </div>
                                    <div className="position">
                                        {["全部", "乐山", "北京", "犍为",]
                                            .map((item, index) => (
                                                <span id="position" key={index} onClick={level}>
                                            {item}
                      </span>))}
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="pop">
                                <div className="myCard">
                                    {hospitalList.map((item: any, index) => {
                                        const bg = (item: any) => (
                                            <Fragment>
                                                <BgColorsOutlined/> {item.hospitalName}
                                            </Fragment>
                                        );
                                        return (
                                            <Card
                                                onClick={() => {
                                                    change({
                                                        hospitalId: item.hospitalId,
                                                        hospitalName: item.hospitalName
                                                    })
                                                }}
                                                headStyle={{color: "#a45555"}}
                                                key={index}
                                                title={bg(item)}
                                                hoverable={true}
                                            >
                                                <SlackSquareOutlined/>
                                                &nbsp; &nbsp; {item.hospitalLevel}
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                            <br/>
                            <div className="pop">
                                <Pop title={{item1: "科普时间", item2: "热门专栏 ......"}}/>
                                <div className="myCard">
                                    {constant.map((item: Addition, index) => {
                                        return (
                                            <Card
                                                onClick={() => navigate(`/patient/${item}`)}
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
                                                <Meta title="图文专栏" description={item.hospitalName}/>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                            <br/>
                            <div className="pop">
                                <Pop title={{item1: "失眠？", item2: "音乐来治疗 ......"}}/>
                                <div className="myCard" id="card">
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
                                                style={{width: 240}}
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
                            <br/>
                            <div className="pop">
                                <Pop title={{item1: "好物？", item2: "热卖商品 ......"}}/>
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

                </Layout>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </Flex>
    );
};
export default App;
