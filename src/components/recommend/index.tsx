import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Badge, Button, Card, Divider, notification, Space, Tag} from 'antd';
import {ZhihuOutlined, SlackOutlined, AliwangwangOutlined, GithubOutlined, BgColorsOutlined} from '@ant-design/icons'
import TextArea, {TextAreaRef} from "antd/es/input/TextArea";
import classNames from "classnames";
import {deleteComments, postComment} from "@/utility/http";
import {useAppSelector} from "@/store/hooks";
import {Typography} from 'antd';
import {useLoaderData} from 'react-router-dom';
import {log} from "@craco/craco/dist/lib/logger";

const {Text} = Typography;
/*标题 */
const title = () => (
    <Space size={[0, 'small']} wrap>
        <ZhihuOutlined/>
        <Tag className={'ml-4'} bordered={false} color="gold" children={' 感冒'}/>
        <Tag className={'ml-4'} bordered={false} color="cyan" children={'咳嗽'}/>
        <Tag className={'ml-4'} bordered={false} color="purple" children={'发烧'}/>
    </Space>
)
const App: React.FC = () => {
    const user = useAppSelector((state) => state.login.doth)
    // usEffect ->  -…- ->驱动data数据
    const data = useLoaderData() as any
    const [likeNumber, setLikeNumber] = useState<number[]>([0, 0])
    const [api, contextHolder] = notification.useNotification();
    const [ups, setUps] = useState<any[]>([])
    const [tas, setTas] = useState<any[][]>([[]])
    const [json, setJson] = useState<any>(data.json)
    const [show, setShow] = useState<any[]>(data.show)
    const auth = useAppSelector((state) => state.admin.doth.auth)
    /* 是否可以回复 */
    const reply = (item: any, index: number, num: number) => {
        item.reply[num] = !item.reply[num]
        show.splice(index, 1, item)

        setShow([...show])

    }
    /*展示评论列表*/
    const commentList = (item: any, index: number) => {
        item.commentList = !item.commentList
        show.splice(index, 1, item)
        setShow([...show])
    }
    /* 点赞 */
    const like = async (key: number, value: any, flag: number) => {
        if (flag == 1 && likeNumber[0] < 10) {
            value.like++
            likeNumber[0]++
        } else if (flag == 2 && likeNumber[1] < 10) {
            likeNumber[1]++
            value.dislike++
        }
        setLikeNumber([...likeNumber])
        json.splice(key, 1, value)
        setJson([...json])
        await postComment(value)
    }
    const comment = async (item: any, index: number) => {
        if (ups[index].trim().length < 5) {
            ups[index] = ''
            setUps([...ups])
            return api.open({message: '最少请输入5个字'})
        }
        const date = new Date()
        const nickname = [user.author ? `${user.hospitalName}-${user.author}医生` : `匿名用户${(item.comments.length + 1).toString().padStart(3, '0')}`]
        item.comments.push(
            {
                index: item.comments.length,
                nickname,
                comment: ups[index],
                commentDate: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
            }
        )
        setJson([...json])
        await postComment(item)
        api.open({message: '评论成功'})
        ups[index] = ''
        setUps([...ups])
    }
    const replyToTheLandlord = async (e: any, item: any, nickname: string[], index: number, num: number) => {
        nickname = [user.userId ? `${user.hospitalName}-${user.author}医生` : `匿名用户${(item.comments.length + 1).toString().padStart(3, '0')}`, `${nickname[0]}`]
        const value = e.target.parentNode.previousSibling.value
        if (value.trim().length < 5) {
            tas[index][num] = ''
            setTas([...tas])
            return api.open({message: '最少请评论5个字'})
        }
        const date = new Date()
        item.comments.push({
            index: item.comments.length,
            nickname,
            comment: value,
            commentDate: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        })
        json.splice(index, 1, item)
        setJson([...json])
        await postComment(item)
        tas[index][num] = ''
        setTas([...tas])
        api.open({message: '评论成功'})
    }

    /*删除评论*/
    const deleteComment = async (item: any, index: any) => {
        index = item.index
        const fileName = item.fileName
        const res = await deleteComments({index, fileName})
        json.splice(index, 1)
        setJson([...json])
        api.open({
            message: '删除成功'
        })
    }

    /* actions */
    const actions = (item: any, index: number): React.ReactNode[] => {
        return [
            <Fragment>
                <div className={'flex flex-row no_blue'}>
                    <div className={' text-left  w-[50%] flex flex-row'}>
                        <span
                            onClick={() => {
                                like(index, item, 1)
                            }}
                            className={'initial'}>
                            <SlackOutlined className={'w-5 '} spin={true}/> &nbsp;
                            <span>推一下 &nbsp;<Badge style={{
                                backgroundColor: 'transparent',
                                color: 'rgba(0, 0, 0, 0.45)',
                                fontSize: 15,
                                marginBottom: 5
                            }} count={item.like}/></span>
                        </span>
                        <span onClick={() => {
                            like(index, item, 2)
                        }} className={'initial ml-10'}>
                            <AliwangwangOutlined/> &nbsp;
                            <span>夸夸其谈 &nbsp;<Badge style={{
                                backgroundColor: 'transparent',
                                color: 'rgba(0, 0, 0, 0.45)',
                                fontSize: 15,
                                marginBottom: 5
                            }} count={item.dislike}/></span>
                        </span>
                    </div>
                    <div>
                        <span
                            onClick={() => commentList(show[index], index)}
                            className={'initial'}>
                            <GithubOutlined/> &nbsp;
                            <span>{item.comments.length == 0 ? '添加评论' : `查看评论`}<Badge style={{
                                backgroundColor: 'transparent',
                                color: 'rgba(0, 0, 0, 0.45)',
                                fontSize: 15,
                                marginBottom: 5
                            }} count={item.comments.length}/></span>
                        </span>
                    </div>
                </div>
                {
                    show[index].commentList &&
                    <Fragment>
                        {/*添加评论*/}
                        <div className={'flex flex-row justify-between  mt-1'}>
                            <TextArea
                                value={ups[index]}
                                onChange={value => {
                                    ups[index] = value.target.value ?? '';
                                    setUps([...ups])
                                }}
                                className={' w-[80%] ml-1 f-0 '}
                                placeholder="请规范评论内容~"
                                autoSize={{minRows: 1, maxRows: 5}}
                            />
                            <Button className={'mr-6  '} type="default"
                                    onClick={() => comment(item, index)}>立即评论</Button>
                        </div>
                        {/*评论列表*/}
                        <ol className={'comment'}>
                            {
                                item.comments.map((comment: any, num: number) => {
                                    const nickname = comment.nickname
                                    return (
                                        <li className={classNames('mt-[10px]', {'ml-[20px]': nickname.length > 1})}
                                            key={num}>
                                            <Tag
                                                color={nickname[0].includes('医生') ? 'success' : "magenta"}>{nickname[0]} </Tag>
                                            {
                                                nickname[1] && <Fragment>
                                                    <span className={' mr-1 detail'}>回复</span>
                                                    <Tag
                                                        color={nickname[1].includes('医生') ? 'success' : "magenta"}>{nickname[1]} </Tag>
                                                </Fragment>
                                            }

                                            <Card.Grid style={{width: '100%', textAlign: 'left'}}
                                                       className={'card bg-zinc-100'}>
                                                <span
                                                    className={'detail '}> <Text mark>     {comment.comment}</Text>      </span>
                                                <div className={' mt-1 detail'}>
                                                    <span> 发布日期：{comment.commentDate}</span>
                                                    <span className={"hover:text-cyan-600"}
                                                          onClick={() => reply(show[index], index, num)}
                                                          style={{float: 'right', marginRight: 20}}
                                                    >
                                                        <BgColorsOutlined/> &nbsp;回复</span>
                                                </div>
                                            </Card.Grid>
                                            {               //{/*回复评论*/}
                                                show[index]['reply'][num] &&
                                                <div className={'flex flex-row justify-between  mt-1'}>
                                                    <TextArea
                                                        value={tas[index][num]}
                                                        onChange={value =>
                                                            setTas(tas.map((item, k1) =>
                                                                item.map((it, k2) =>
                                                                    k1 == index && k2 == num
                                                                        ? value.target.value : it)))
                                                        }
                                                        className={'justify-between w-[80%] ml-1 f-0'}
                                                        placeholder="请规范评论内容~"
                                                        autoSize={{minRows: 1, maxRows: 5}}
                                                    />
                                                    <Button
                                                        onClick={(e) => replyToTheLandlord(e, item, comment.nickname, index, num)}
                                                        className={'mr-6'} type="default">立即评论</Button>
                                                </div>
                                            }
                                        </li>
                                    )
                                })
                            }

                        </ol>
                    </Fragment>
                }

            </Fragment>
        ]
    }
    return (
        <Fragment>
            {contextHolder}
            {/*这个div唯一的作用就是添加css*/}
            <div className={'mt-10'}/>
            <Card className={'w-[80%] m-auto select-none text-left transition-all'} title={title()}>
                {
                    json.map((item: any, index: number) => {
                        return (
                            <>
                                <Card className={classNames('transition-all overflow-hidden', 'text-ellipsis', 'mb-4', {
                                    'max-h-[120px]': show[index].action,
                                    'line-clamp-2': show[index].action,
                                })}
                                      actions={actions(item, index)}
                                      key={index} type="inner"
                                      title={'标题：' + item.title}
                                      extra={<> {auth && <Tag onClick={() => deleteComment(item, index)}
                                                              className={'cursor-pointer hover:text-red-300'}
                                                              color="error"> 删除 </Tag>}<a onClick={() => {
                                          show[index].action = !show[index].action
                                          setShow([...show])
                                      }} className={'hover:no-underline'} href="#">显示评论/隐藏细节</a></>}

                                >
                                    <div className={'text-blue-900 font-light'}
                                         dangerouslySetInnerHTML={{__html: item.htmlContent}}/>
                                </Card>
                                <Divider orientation="left" plain/>
                            </>
                        )
                    })
                }
            </Card>
        </Fragment>
    );
}

export default App;