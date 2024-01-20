import React, {useEffect, useState} from "react";
import {Layout, Flex} from "antd";
import {Outlet, useLocation, useNavigate, useParams, useRoutes} from "react-router-dom";
import Menu from "./menu";
import {setHospitalInfo} from '@/features/hospital/hospitalSlice'
import {useAppSelector} from "@/store/hooks";
import {getHospitalJson, getPopularJson} from "@/utils/http";

const {Header, Footer, Sider, Content} = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#ffffff",
};

const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 520,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#ffffff",
};

const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#ffffff",
    width: "30%",
};

const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#ffffff",
};

const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    //   maxWidth: "calc(50% - 8px)",
};

const App: React.FC = () => {
    const [json, setJson] = useState()
    const navigate = useNavigate();
    const hospitalName = useAppSelector((state) => state.hospital.hospitalName)
    /** 界面初始化 */
    useEffect(() => {
        if (hospitalName == '')
            navigate('/chat')
    }, [])
    useEffect(() => {

    }, []);
    return (
        <Flex gap="middle" wrap="wrap">
            <Layout style={layoutStyle}>
                <Header className='text-gray-950' style={headerStyle}>Header</Header>
                <Layout>
                    <Sider width="25%" style={siderStyle}>
                        <Menu/>
                    </Sider>
                    <Content style={contentStyle}>
                        <Outlet/>
                    </Content>
                </Layout>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </Flex>
    )
};

export default App;
