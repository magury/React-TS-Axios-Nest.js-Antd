import React, {Fragment, useEffect, useRef, useState} from "react";
import {
    Button,
    ButtonProps,
    Card,
    Checkbox,
    CheckboxProps,
    Form,
    Input,
    InputRef,
    notification,
    Select,
    Space,
} from "antd";
import {getLogin, getRegister} from "@/utility/http";
import {useLoaderData, useNavigate} from "react-router-dom";
import {setStatus} from "@/features/login/loginSlice";
import {useAppDispatch} from "@/store/hooks";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import classNames from "classnames";
import {FrownOutlined} from "@ant-design/icons";
import {isCount} from "@/utility/constant";
import {login} from "@/utility/new.type";

const CryptoJS = require("crypto-js");
const App: React.FC = () => {
    let loader = useLoaderData() as login.loader;
    const [provinces, setProvince] = useState<login.provinces>(
        loader.map((item) => ({
            label: item.hospitalName,
            value: item.hospitalId,
        })) || []
    );
    const [agree, setAgree] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch();
    // 导航
    const navigate = useNavigate();
    const user = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    /**
     *
     * @description 登录
     */
    const onChange: CheckboxProps["onChange"] = (e: CheckboxChangeEvent) => {
    };
    const blunder = (description: string) => {
        api.open({
            message: "操作错误",
            description,
            icon: <FrownOutlined style={{color: "#108ee9"}}/>,
            placement: "topLeft",
        });
    };
    const finish = async (value: login.finish) => {
        if (!agree) return blunder("需要先同意并遵守服务协议");
        const {username, password, hospital} = value;
        if (!username || !password || !hospital) {
            return api.open({
                message: "您可能输入了错误的登录信息，请检查是否正确",
            });
        }
        if (username.length < 8 && password.length < 8)
            return blunder("账号或者密码长度不能小于8位");
        for (let str of username)
            if (isCount(str)) return blunder("账号输入规则只能是字母和数字");
        const res = await getLogin(value);
        if (res.statusCode == 200) {
            dispatch(setStatus({username, password}));
            dispatch(setStatus(res.result));
            navigate("/patient");
        } else {
            blunder("账号或密码错误！");
        }

    };
    return (
        <Fragment>
            {contextHolder}
            <div
                className={
                    "min-h-screen bg-gray-100 text-gray-900 flex justify-center dlbox"
                }
            >
                <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className=" lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">用户登录</h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                        <div className="weixin"></div>
                                        <span className="ml-4">使用微信登录</span>
                                    </button>
                                    <button
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                        <div className="weibo"></div>
                                        <span className="ml-4">使用微博登录</span>
                                    </button>
                                </div>

                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        或者使用已有账号登录
                                    </div>
                                </div>
                                <Form onFinish={finish}>
                                    <div className="mx-auto max-w-xs">
                                        <Form.Item
                                            initialValue={""}
                                            name="username"
                                            className={"mb-0"}
                                        >
                                            <input
                                                disabled={!agree}
                                                id={"username"}
                                                ref={user}
                                                className={classNames(
                                                    "w-full px-8 py-4 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white",
                                                    {
                                                        "bg-zinc-300": !agree,
                                                    }
                                                )}
                                                type="text"
                                                placeholder="内部账号"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            initialValue={""}
                                            name="password"
                                            className={"mb-0"}
                                        >
                                            <input
                                                autoComplete="off"
                                                disabled={!agree}
                                                id={"password"}
                                                ref={password}
                                                className={classNames(
                                                    "w-full px-8 py-4 rounded-lg font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5",
                                                    {
                                                        "bg-zinc-300": !agree,
                                                    }
                                                )}
                                                type="password"
                                                placeholder="密码"
                                            />
                                        </Form.Item>
                                        <Form.Item name="hospital" className={"mb-0"}>
                                            <Select
                                                placeholder="来自医院"
                                                disabled={!agree}
                                                labelInValue
                                                className={classNames(" mt-[16px] w-full font-medium ")}
                                                options={provinces}
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <button
                                                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                                <span className="ml-3">登 录</span>
                                            </button>
                                        </Form.Item>
                                        <section>
                                            <p className="mt-6 text-xl text-gray-600 text-center flex flex-row justify-center items-center">
                                                <Checkbox
                                                    onClick={() => setAgree(!agree)}
                                                    className={" mr-[10px]"}
                                                    onChange={onChange}
                                                />
                                                <span className={"h-fit"}>我同意并遵守服务协议</span>
                                            </p>
                                        </section>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 hidden text-center lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-svg"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default App;
