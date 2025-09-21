import React, {lazy} from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import {Alert, Empty} from "antd";
import EssayManager from "components/essayManager";
import AuthRouter from "../components/AuthRouter";
import {
    getBads,
    getFallback,
    getHospitalJson,
    getHospitalList,
    getPatients,
    getPopularJson,
    http,
} from "@/utility/http";
import {fetching} from "@/utility/fetch";
import {table} from "@/utility/new.type";

const DIntroduce = lazy(() => import("../components/introDoctor"));
const Patient = lazy(() => import("@/components/医生后台/index"));
const Customer = lazy(() => import("../components/患者信息"));
const BadCustomer = lazy(() => import("../components/不良患者"));
const Addition = lazy(() => import("../components/添加信息"));
const List = lazy(() => import("../components/上传报告"));
const Look = lazy(() => import("../components/查看报告"));
const Chat = lazy(() => import("../components/首页"));
const Detail = lazy(() => import("../components/detail"));
const HIntroduce = lazy(() => import("../components/医院介绍"));
const Depart = lazy(() => import("../components/部门分类"));
const Popular = lazy(() => import("../components/公众科普"));
const Experience = lazy(() => import("../components/经验交流"));
const Enquire = lazy(() => import("../components/enquire"));
const Recommend = lazy(() => import("../components/recommend"));
const Contact = lazy(() => import("../components/contact"));
const Administrator = lazy(() => import("../components/admin"));
const Create = lazy(() => import("../components/hospital"));
const Default = lazy(() => import("../components/default"));
const Login = lazy(() => import("@/components/登录/index"));
const Preliminary = lazy(() => import("../components/preliminary"));
const routes = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
        loader: async () => {
            return await http
                .get('/hospitals/all')
                .then((res) => res.data.result)
        },
    },
    {
        path: "/",
        element: <Navigate to="/chat"/>,
    },
    {
        path: "/chat",
        element: <Chat/>,
        loader: async () => {
            let hospital = await getHospitalList("医院");
            let province = await http
                .get('/hospitals/province')
                .then((res) => res.data)
            return {
                hospital: hospital.result,
                province: province.result,
            };
        },
    },
    {
        path: "/detail",
        element: <AuthRouter children={<Detail/>}/>,
        loader: async () => {
            return null;
        },
        children: [
            {
                path: "",
                element: <Empty style={{minHeight: "500px", marginTop: 50}}/>,
            },
            {
                path: "introduce",
                element: <DIntroduce/>,
            },
            {
                path: "introduce/:hospitalName",
                element: <HIntroduce/>,
            },
            {
                path: "depart/:hospitalName",
                element: <Depart/>,
                loader: async ({params: {hospitalName}}) => {
                    let _ = await getHospitalJson(hospitalName);
                    if (_.statusCode == 200 && _.result.length) {
                        const infoJsonPath = _.result[0]["infoJsonPath"];
                        const res: detail = await fetch(infoJsonPath).then(($) => $.json());
                        return {
                            depart: res.depart,
                        };
                    } else
                        return {
                            depart: "",
                        };
                },
            },
            {
                path: "popular/:hospitalName",
                element: <Popular/>,
                loader: async () => {
                    let res: any[] = [];
                    const urls = await getPopularJson();
                    for (let item of urls.result) {
                        let files = await fetch(item).then((_) => _.json());
                        files.map((json: any) => {
                            res[res.length] = json;
                        });
                    }
                    return res;
                },
            },
            {
                path: "experience",
                element: <Experience/>,
                children: [
                    {
                        path: "enquire",
                        element: <Enquire/>,
                    },
                    {
                        path: "",
                        element: <Navigate to="recommend"/>,
                    },
                    {
                        path: "recommend",
                        element: <Recommend/>,
                        loader: async () => {

                            const json = await http.get(`/users/experience?type=recommend`)
                                .then(res => res.data.result)
                            const show = json.map((item: any) => ({
                                action: false,
                                commentList: false,
                                reply: Array(item.comments.length).fill(false),
                            }));
                            return {
                                json,
                                show,
                            };
                        },
                    },
                    {
                        path: "hot",
                        element: <Navigate to="/detail/experience/recommend"/>,
                    },
                    {
                        path: "contact",
                        element: <Contact/>,
                    },
                ],
            },
        ],
    },
    {
        path: "/patient",
        element: <AuthRouter children={<Patient/>}/>,
        children: [
            {
                path: "info",
                element: <AuthRouter children={<Customer/>}/>,
                loader: async () => {
                    const res = await getPatients({
                        hospitalName: "",
                        customer: "",
                        customerId: "",
                    });
                    return res.result.map((item: any, index: number) => ({
                        ...item,
                        key: JSON.stringify(index),
                        tags: JSON.parse(item.tags),
                    }));
                },
            },
            {
                path: "",
                element: <Empty style={{minHeight: "500px"}}/>,
            },
            {
                path: "bad/info",
                element: <BadCustomer/>,
                loader: async () => {
                    const res = await getBads({
                        hospitalName: "",
                        customer: "",
                        customerId: "",
                    });
                    return res.result.map((item: any, index: number) => ({
                        ...item,
                        key: JSON.stringify(item.customerId),
                        tags: JSON.parse(item.tags),
                    }));
                },
            },
            {
                path: "addition/:hospitalName",
                element: <Addition/>,
                loader: async ({params: {hospitalName}}) => {
                    const res = await getPatients({
                        hospitalName: "",
                        customer: "",
                        customerId: "",
                    });
                    return res.result.map((item: Info, index: number) => ({
                        key: item.customerId,
                        id: item.customerId,
                        customer: item.customer,
                        hospitalName: item.hospitalName,
                        depart: item.depart,
                        createdDate: item.createdDate,
                        tags: JSON.parse(item.tags),
                        uuid: item.uuid,
                    }));
                },
            },
            {
                path: "list/:hospitalName",
                element: <List/>,
                loader: async ({params: {hospitalName}}) => {
                    return await http.get(`/upload/${hospitalName}`)
                        .then(res => {
                            return res.data.result.map((item: any, index: number) => {
                                return {
                                    ...item,
                                    key: index + "",
                                    tags: JSON.parse(item.tags),
                                }
                            })
                        })
                },
            },
            {
                path: "look/:hospitalName",
                element: <Look/>,
                loader: async ({params: {hospitalName}}) => {

                    let res = await http.get(`/htupload/${hospitalName}`).then((res) => res.data)
                    if (res.length == 0) return [];
                    return res.result;
                },
            },
            {
                path: "",
                element: <Navigate to={"/patient/info"}/>,
            },
        ],
    },
    {
        path: "/admin",
        element: <Administrator/>,
        children: [
            {
                path: "create",
                element: <Create/>,
                loader: async () => {
                    let result = await http.get(`/hospitals/all`)
                        .then((res) => res.data)
                        .then((json) =>
                            json.result.map((item: Addition, index: number) => ({
                                key: index + '',
                                name: item.hospitalName,
                                address: item.position,
                                level: item.hospitalLevel,
                                province: item.province,
                            }))
                        );
                    let filters = result.map((item: any) => ({
                        text: item.name,
                        value: item.name,
                    }));
                    return {
                        data: result,
                        filter: filters,
                    };
                },
            },
            {
                path: "default",
                element: <Default/>,
                loader: async () => {
                    const hospital = await http.get("/hospitals")
                        .then((res) => res.data)
                        .then((json) =>
                            json.result.map(
                                (item: { hospitalName: any; hospitalId: any }) => ({
                                    value: item.hospitalName,
                                    level: item.hospitalId,
                                })
                            )
                        );
                    const data: any[] = (
                        await http.get("/users/doctors")
                            .then((res) => res.data)
                            .then((json) =>
                                json.result.map((item: any) => ({
                                    key: item.hospitalId,
                                    username: item.username,
                                    password: item.password,
                                    author: item.author,
                                    hospitalName: item.hospitalName,
                                    depart: item.depart,
                                    customerId: item.hospitalId
                                }))
                            )
                    ).reverse();
                    const filter = data.map((item: any) => ({
                        text: item.hospitalName,
                        value: item.hospitalName,
                    }));
                    return {hospital, data, filter};
                },
            },
            {
                path: "",
                element: <Navigate to={"create"}/>,
            },
            {
                path: "essay-manager",
                element: <EssayManager/>,
                loader: async () => {
                    let arr: any[] = [];
                    await http.get("/hospitals/json")
                        .then((res) => res.data)
                        .then(async (json) => {
                            for (let item of json.result) {
                                const js =  await http.request(item.sciencePath).then(res=>res.data.result);
                                for (let it of js) {
                                    arr.push({
                                        key: it.onlyKey,
                                        author: item.author,
                                        hospitalName: item.hospitalName,
                                        title: it.title,
                                        depart: item.depart,
                                        descript: it.description,
                                        userId: item.userId,
                                        paragraph: it.paragraph,
                                        comments: it.comments,
                                    });
                                }
                            }
                        });
                    return arr;
                },
            },
            {
                path: "preliminary",
                element: <Preliminary/>,
                loader: async () => {
                    const res = await getFallback();
                    console.log(res);
                    return res.result.map((item: any) => ({
                        key: item.uuid,
                        name: item.author,
                        hospitalName: item.hospitalName,
                        errors: item.errors,
                        hospitalId: item.hospitalId,
                        dealStatus: item.dealStatus,
                        userId: item.userId,
                    }));
                },
            },
        ],
    },
    {
        path: "/*",
        element: (
            <Alert
                className={"mt-[100px] h-[300px] w-[80%] m-auto text-center "}
                message="错误的页面"
                description="Error Description Error Description Error Description Error Description"
                type="error"
            />
        ),
    },
]);
export default routes