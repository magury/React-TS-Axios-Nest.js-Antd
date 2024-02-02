import React, {Fragment, useEffect, useRef, useState} from "react";
import {Button, Card, Divider, Tag, Typography, notification} from "antd";
import {useAppSelector} from "@/store/hooks";
import {getHospitalJson, postContent} from "@/utility/http";
import {useLoaderData, useLocation} from "react-router-dom";
import TextArea, {TextAreaRef} from "antd/es/input/TextArea";
import {BgColorsOutlined} from '@ant-design/icons'
import classNames from "classnames";
import _ from "lodash";

const {Title, Paragraph, Text} = Typography;
const App: React.FC = () => {
    const data = useLocation().state
    const [api, contextHolder] = notification.useNotification();
    const [first, setFirst] = useState<any>('')
    const [state, setState] = useState(data.item)
    const user = useAppSelector((state) => state.login.doth)
    const [show, setShow] = useState(Array(data.item.comments.length).fill(false))
    const [tas, setTas] = useState<any>([])
    const comment = async () => {
        if (first!.trim()!.length < 5) {
            setFirst('')
            return api.open({message: '请输入不低于5个字的有效评论'})
        }
        const res = await postContent({
            onlyKey: state.onlyKey,
            nickname: [user.userId ? `${user.hospitalName}-${user.author}医生` : `匿名用户${state.comments.length + 1}`],
            comment: first
        })
        if (res.statusCode == 200) {
            api.open({message: '评论成功!'})
            state.comments = res.result
            setState({...state})
            setFirst('')
        }

    }
    useState(() => {
        console.log(state)
    })
    const showReply = (num: number) => {
        show[num] = !show[num]
        setShow([...show])
    }
    const replyContent = async (event: any, nickname: string[], index: number) => {
        nickname = [user.userId ? `${user.hospitalName}-${user.author}医生` : `匿名用户${(state.comments.length + 1).toString().padStart(3, '0')}`, `${nickname[0]}`]
        if (tas[index].trim().length < 5) {
            tas[index] = ''
            setTas([...tas])
            return api.open({message: '最少请评论5个字'})
        }

        const date = new Date()
        const comment = {
            index: state.comments.length,
            nickname,
            comment: tas[index],
            commentDate: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        }
        state.comments.push(comment)
        setState({...state})
        tas[index] = ''
        setTas([...tas])
        const res = await postContent({
            onlyKey: state.onlyKey, nickname,  comment:comment.comment
        })
        if (res.status == 200)
            api.open({message: '回复成功'})

    }
    return <Fragment>
        <Typography>
            <Title>
                <Text mark>{state.title}</Text>
            </Title>
            {
                state.paragraph.map((item: any, index: number) => (
                    <Paragraph copyable className={"text-left text-emerald-700"} editable={false} key={index}
                               children={item}
                               code={true}/>
                ))
            }
            <Divider/>
        </Typography>
        {
            // _.some(state,Boolean) &&
            <Fragment>
                {contextHolder}
                {/*添加评论*/}
                <div className={'flex flex-row justify-between  mt-1'}>
                    <TextArea
                        value={first}
                        onChange={(value) => setFirst(value.target.value)
                        }
                        className={' w-[80%] ml-1 f-0 '}
                        placeholder="请规范评论内容~"
                        autoSize={{minRows: 1, maxRows: 5}}
                    />
                    <Button className={'mr-6  '} type="default" onClick={() => comment()}
                    > 立即评论</Button>
                </div>
                {/*评论列表*/}
                <ol>
                    <Card>
                        {
                            state.comments.map((item: any, num: number) => {
                                const nickname = item.nickname
                                return (
                                    <li className={classNames('mt-[10px] cursor-pointer select-none', {'ml-[20px]': nickname.length > 1})}
                                        key={num}>
                                        <Tag className="float-left"
                                             color={nickname[0].includes('医生') ? 'success' : "magenta"}>{nickname[0]} </Tag>
                                        {
                                            nickname[1] && <Fragment>
                                                <span className={' mr-1 detail float-left'}>回复</span>
                                                <Tag
                                                    className="float-left"
                                                    color={nickname[1].includes('医生') ? 'success' : "magenta"}>{nickname[1]} </Tag>
                                            </Fragment>
                                        }

                                        <Card.Grid style={{width: '100%', textAlign: 'left'}}
                                                   className={'card bg-zinc-100'}
                                        >
                                            <span
                                                className={'detail '}
                                            >
                                            <Text mark> {item.comment}</Text>
                                            </span>
                                            <div className={' mt-1 detail'}>
                                                <span> 发布日期：{item.commentDate}</span>
                                                <span className={"hover:text-cyan-600"}
                                                      onClick={() => showReply(num)}
                                                      style={{float: 'right', marginRight: 20}}
                                                >
                                                    <BgColorsOutlined/> &nbsp;回复</span>
                                            </div>
                                        </Card.Grid>
                                        {               //回复评论
                                            show[num] &&
                                            <div className={'flex flex-row justify-between  mt-1'}>
                                                <TextArea
                                                    value={tas[num]}
                                                    onChange={(value) => {
                                                        tas.splice(num, 1, value.target.value)
                                                        setTas([...tas])
                                                    }
                                                    }
                                                    className={'justify-between w-[80%] ml-1 f-0'}
                                                    placeholder="请规范评论内容~"
                                                    autoSize={{minRows: 1, maxRows: 5}}
                                                />
                                                <Button
                                                    onClick={(e) => replyContent(e, item.nickname, num)}
                                                    className={'mr-6'} type="default">立即评论</Button>
                                            </div>
                                        }
                                    </li>
                                )
                            })
                        }
                    </Card>
                </ol>
            </Fragment>
        }
    </Fragment>
}

export default App;
