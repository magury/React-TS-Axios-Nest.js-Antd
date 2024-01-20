import {Avatar, Card, FloatButton, Input, InputRef, Modal} from "antd";
import React, {ChangeEvent, Fragment, MutableRefObject, useEffect, useRef, useState} from "react";
import {LikeOutlined, DislikeOutlined, FormOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import {useLocation, useNavigate} from "react-router-dom";
import TextArea, {TextAreaRef} from "antd/es/input/TextArea";
import {putPublicJson, putTopicContent} from "@/utils/http";
import {useAppSelector} from "@/store/hooks";
import useMessage from "antd/es/message/useMessage";
import {isChinese} from "@/utils/constant";

const App: React.FC = () => {
    const [messageApi, contextHolder] = useMessage()
    /*用于判断是否可以编辑*/
    const {userId} = useAppSelector(state => state.login.status)
    /*路由跳转*/
    const navigate = useNavigate();
    /*获取路由参数*/
    const {state: {popular}} = useLocation()
    //需要上传的路由参数
    const only = useRef<any>('')
    const title = useRef<any>()
    const describe = useRef<any>()
    const paragraph = useRef<any>()
    /* loading or not*/
    const [loading, setLoading] = useState(false)
    //显示的json
    const [json, setJson] = useState<any[]>(popular)
    //模态框
    const [isModalOpen, setIsModalOpen] = useState(false);
    /*显示模态框*/
    const showModal = () => {
        if (userId)
            setIsModalOpen(true);
        else
            messageApi.open({
                type: 'error',
                content: '您的身份不被授权',
                duration: 5
            })

        // console.log('模态框被打开')
    };
    /** 点击确定 */
    const handleOk = async () => {
        const {current: {input: {value: topic}}} = title
        const {current: {resizableTextArea: {textArea: {value: description}}}} = describe
        const {current: {resizableTextArea: {textArea: {value: content}}}} = paragraph
        if (topic == '' || content == '') {
            messageApi.error('标题或内容不能为空！！！')
        } else if (isPut(topic) && isPut(content) && isPut(description)) {
            setLoading(true)
            const res = await putTopicContent({userId, topic, description, content})
            if (res.status == 200) {
                const result = await fetch(res.result.path).then((response) => response.json())
                setJson(result)
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        setLoading(false)
                        setIsModalOpen(false)
                    }, 1000)
                })

            }
        } else {
            messageApi.error('你现在在乱输内容！！！')
        }

    };

    /*判断是不是属于能发布的内容*/
    function isPut(values: string): boolean {
        let chCount = 0
        for (let value of values)
            chCount = isChinese(value) ? chCount + 1 : chCount
        return chCount >= values.length / 2;


    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    /*模态框*/
    const [badge, setBadge] = useState(0);
    /*  点赞 */
    const outlined = (onlyKey: String, index: number) => {
        only.current = onlyKey
        let result = []
        switch (index) {
            case 1:
                result = json.map((item) => {
                    if (item.onlyKey == onlyKey)
                        item.like++
                    return item
                })
                break;
            case 2:
                result = json.map((item) => {
                    if (item.onlyKey == onlyKey)
                        item.dislike++
                    return item
                })
                break;
        }
        setJson(result)
    };
    useEffect(() => {
        setJson(popular)
    }, []);
    useEffect(() => {
        putPublicJson(only.current, json).then((res) => res.result)
    }, [json])
    /* 记录输入框变换*/
    const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log(e.target.value)
    }
    return (
        <Fragment>
            {contextHolder}
            <Modal
                afterClose={() => {
                    setLoading(false)
                }}
                confirmLoading={loading}
                cancelText={"取消"}
                okText={"确认输入"}
                okType={"danger"}
                title="写入你的内容"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input addonBefore={<span>输入标题</span>} ref={title} onChange={change} placeholder="输入标题"/>
                <br/>
                <TextArea
                    ref={describe}
                    onChange={change}
                    autoSize={true}
                    showCount={true}
                    className="line"
                    // rows={10}
                    placeholder="输入内容"
                />
                <TextArea
                    ref={paragraph}
                    onChange={change}
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
                    badge={{count: badge == 0 ? null : badge}}
                    icon={<FormOutlined/>}
                    type="primary"
                    className='top-[100px] right-[24px]'
                />
                <div className="flex">
                    <div className="myCard  noSelect">
                        {json!.map((item: any, index) => (
                                <Card
                                    hoverable
                                    key={item.avatarPath}
                                    className='min-w-[300px] w-fit m-[20px]'
                                    cover={
                                        <img
                                            onClick={() => {
                                                navigate('/detail/introduce', {
                                                    state: {
                                                        title: item.title,
                                                        paragraph: item.paragraph
                                                    }
                                                })
                                            }}
                                            alt="example"
                                            src={item.descriptionPath}
                                        />
                                    }
                                    actions={[
                                        <div>
                                            <DislikeOutlined
                                                key="setting"
                                                onClick={() => outlined(item.onlyKey, 2)}
                                            />
                                            <span>{item.dislike > 0 ? item.dislike : null}</span>
                                        </div>,
                                        <div>
                                            <LikeOutlined key="edit" onClick={() => outlined(item.onlyKey, 1)}/>
                                            <span>{item.like > 0 ? item.like : null}</span>
                                        </div>,
                                    ]}
                                >
                                    <div onClick={() => {
                                        navigate('/detail/introduce', {
                                            state: {
                                                title: item.title, paragraph: item.paragraph
                                            }
                                        })
                                    }}>
                                        <Meta
                                            className={'max-w-[250px]'}
                                            avatar={
                                                <Avatar src={item.avatarPath}/>
                                            }
                                            title={item.title}
                                            description={item.description}
                                        />
                                        <br/>
                                        <span className={'float-left'} children={"作者:" + item.author}/>
                                        <span className={'float-right'} children={"发布时间:" + item.publicDate} />
                                    </div>

                                </Card>
                            )
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default App