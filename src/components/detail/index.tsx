import React, {Fragment, useEffect, useRef, useState} from "react";
import {Layout, Flex, Space, Modal, notification, Dropdown, MenuProps, Tag, ConfigProvider, Menu} from "antd";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "@/store/hooks";
import {FrownOutlined, DownOutlined, UserOutlined, UserSwitchOutlined, ImportOutlined} from "@ant-design/icons";
import {isCount} from "@/utility/constant";
import {getAdminLogin, getHospitalJson} from "@/utility/http";
import {setAuth} from "@/features/admin/adminSlice";
import {useAppDispatch} from "@/store/hooks";

const {Header, Footer, Sider, Content} = Layout;
const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 520,
    lineHeight: "120px",
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
    const [api, contextHolder] = notification.useNotification();
    const user: any = useRef<HTMLInputElement>(null);
    const password: any = useRef<HTMLInputElement>(null);
    const status = useAppSelector(state => state.login.doth)
    const dispatch = useAppDispatch()
    const [info, setInfo] = useState<any>(
        [{title: (<Fragment><UserOutlined/><span>首页</span></Fragment>), href: "",},]);
    const navigate = useNavigate();
    const hospitalName = useAppSelector((state) => state.hospital.hospitalName)
    const getList = (value: string[]) => {
        const newValue = value.map((title: string) => ({title, href: ''}))
        newValue.unshift(info[0])
        setInfo(newValue)
    };
    const toAdmin = () => {
        showModal()
    }
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
    const items: MenuProps['items'] = [
        {
            label: '后台管理',
            key: '0',
            icon: <UserSwitchOutlined/>,
            onClick: toAdmin
        },
        {
            label: '退出登录',
            key: '1',
            icon: <ImportOutlined/>,
            onClick: () => dispatch(setAuth(false))
        },

    ];
    const login = async () => {
        const param = {username: user.current.value, password: password.current.value}
        if (param.username.length * param.username.length == 0)
            return blunder('账号密码不能为空')
        if (param.username.length < 8 && param.password.length < 8)
            return blunder('账号或者密码长度不能小于8位')
        for (let str of param.username)
            if (isCount(str))
                return blunder('账号输入规则只能是字母和数字')
        const res: format.Result<format.Admin> = await getAdminLogin(param)
        if (res.statusCode == 200) {
            dispatch((setAuth(true)))
            return navigate('/admin')
        }
        blunder('账号或者密码错误')
    }
    const blunder = (description: string) => {
        api.open({
            message: '操作错误',
            description,
            icon: <FrownOutlined style={{color: '#108ee9'}}/>,
            placement: 'topLeft'
        })
    }
    return (
        <Fragment>
            {contextHolder}
            <Modal footer={null} className={'w-fit'} title="管理员登录" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className="htmleaf-container">
                    <div className="demo form-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 ml-[40px]">
                                    <form className="form-horizontal ">
                                        <div className="heading"></div>
                                        <div className="form-group">
                                            <i className="fa fa-user"></i>
                                            <input required name="login[username]"
                                                   defaultValue={'1111111'}
                                                   ref={user}
                                                   type="text"
                                                   className="form-control"
                                                   placeholder="Username"
                                                   id="exampleInputEmail1"/>
                                        </div>
                                        <div className="form-group">
                                            <i className="fa fa-lock"></i>
                                            <input required name="login[password]"
                                                   defaultValue={'11111111'}
                                                   ref={password}
                                                   type="password"
                                                   className="form-control"
                                                   placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                            <button onClick={login} type="button" className="btn btn-default"><i
                                                className="fa fa-arrow-right"></i></button>
                                            <span>Don't have an account?
                                                <a className="create_account">Sign up</a>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Flex gap="middle" wrap="wrap">
                <Layout style={layoutStyle}>
                    <Header
                        className='fixed z-10 w-[100%] text-gray-950 text-center  h-[44px] leading-[60px] bg-[#ffffff]  pe-[48px]'>
                        <Flex className={'leading-[45px]'} vertical={false}>
                            <MyMenu getList={getList}/>
                            <Space direction="vertical" size={16}
                                   className={'bg-transparent h-fit absolute right-[20px] mt-[0px] text-[14px]'}>
                                {
                                    <Dropdown arrow={false} menu={{items}}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Tag color="magenta">管理员登录
                                                    <DownOutlined/>
                                                </Tag>
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </Space>
                        </Flex>
                    </Header>
                    <Layout>
                        <Content style={contentStyle} className={' pr-[30px] pl-[30px] w-[80%] m-auto mt-[44px]'}>
                            <Outlet/>
                        </Content>
                    </Layout>
                </Layout>
            </Flex>
        </Fragment>
    )
};
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: "group"
): MenuItem {
    return {key, icon, children, label, type,} as MenuItem;
}

const items: MenuProps["items"] = [
    getItem("医院信息", "医院信息"), getItem("公众科普", "公众科普"), getItem("科室介绍", "科室介绍",),
    getItem("就医指导", "就医指导", null, [
        getItem("交通指南", "交通指南"), getItem("门诊指南", "门诊指南"), getItem("住院指南", "住院指南"),
        getItem("医保指南", "医保指南"),]), getItem("经验交流", "经验交流",),
];

interface IProps {
    getList: Function
}

const MyMenu: React.FC<IProps> = (props) => {
    const hospitalName = useAppSelector((state) => state.hospital.hospitalName)
    const navigate = useNavigate();
    const onClick: MenuProps["onClick"] = async ({keyPath,}: { keyPath: string[]; }) => {
        props.getList(keyPath.reverse())
        const title = keyPath[0];
        switch (title) {
            case "医院信息":
                let _ = await getHospitalJson(hospitalName);
                if (_.statusCode == 200 && _.result.length) {
                    const infoJsonPath = _.result[0]["infoJsonPath"];
                    const res: detail = await fetch(infoJsonPath).then(($) => $.json());
                    navigate(`introduce/${hospitalName}`, {
                        state: {
                            title: res.title,
                            paragraph: res.paragraph,
                        }
                    });
                }

                break;
            case "科室介绍":
                navigate(`depart/${hospitalName}`);
                break;
            case "交通指南":
            case "门诊指南":
            case "住院指南":
            case "医保指南":
                navigate("/detail");
            case "公众科普":
                navigate(`popular/${hospitalName}`);
                break;
            case "经验交流":
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
                className={" w-full flex justify-center "}
                onClick={onClick}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode={'horizontal'}
                theme={'light'}
                items={items}
            />
        </ConfigProvider>
    );
};
export default App;
