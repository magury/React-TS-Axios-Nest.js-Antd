import React, {useEffect, useState} from "react";
import {MailOutlined} from "@ant-design/icons";
import {MenuProps, ConfigProvider} from "antd";
import {Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {getHospitalJson, getPopularJson} from "@/utils/http";
import {useAppSelector} from "@/store/hooks";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps["items"] = [
    getItem("医院信息", "sub1", <MailOutlined/>),
    getItem("公众科普", "sub2", <MailOutlined/>),
    getItem("科室介绍", "sub3", <MailOutlined/>),
    getItem("就医指导", "sub4", <MailOutlined/>, [
        getItem("交通指南", "sub45"),
        getItem("门诊指南", "sub46"),
        getItem("住院指南", "sub47"),
        getItem("医保指南", "sub48"),
    ]),
    getItem("经验交流", "sub5", <MailOutlined/>),
];

const App: React.FC = () => {
    const hospitalName = useAppSelector((state) => state.hospital.hospitalName)
    const navigate = useNavigate();
    const [json, setJson] = useState<detail>()
    const [popular, setPopular] = useState<any>()
    useEffect(() => {
        getHospitalJson(hospitalName).then(async function (_): Promise<any> {
            if (_.status == 200 && _.result.length) {
                const infoJsonPath = _.result[0]['infoJsonPath']
                const res = await fetch(infoJsonPath).then(($) => $.json()).then((json) => json)
                setJson(res)
            }
        })
    }, [])
    useEffect(() => {
        // 生命周期函数里不能是异步的 所以采用回调地狱 这里的函数是收集所有的文章
        // 先获取所有存数据的json 再依次遍历
        // react是通过异步更新数据 所以需要res数据
        getPopularJson()
            .then((_) => {
                let res: any[] = []
                _.result.map((item: string) => fetch(item)
                    .then(($) => $.json())
                    .then((item: any[]) => item.map((json) => {
                        res[res.length] = json
                    })))
                setPopular(res)
            })
    }, [])
    const onClick: MenuProps["onClick"] = ({keyPath,}: { keyPath: string[]; }) => {
        const title = keyPath[0];
        switch (title) {
            case "sub1":
                navigate("introduce", {
                    state: {
                        title: json!.title,
                        paragraph: json!.paragraph
                    }
                });
                break;
            case "sub3":
                navigate("depart", {
                    state: {
                        depart: json!.depart
                    }
                });
                break;
            case "sub45":
            case "sub46":
            case "sub47":
            case "sub48":
                navigate("/detail");
            case "sub2":
                navigate("popular", {
                    state: {
                        popular
                    }
                });
                break;
            case "sub5":
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
                onClick={onClick}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
            />
        </ConfigProvider>
    );
};

export default App;
