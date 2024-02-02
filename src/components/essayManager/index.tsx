import React, {useEffect, useState} from 'react';
import {Button, notification, Popconfirm, Space, Table, Tag} from 'antd';
import type {TableProps} from 'antd';
import {deleteJson, http} from "@/utility/http";
import {useLoaderData, useNavigate} from "react-router-dom";
import {FrownOutlined, SmileOutlined} from "@ant-design/icons";

interface DataType {
    key: string;
    author: string;
    hospitalName: number;
    title: string;
    depart: string;
    descript: string;
    userId: string;
    paragraph: string[]
}

const data: DataType[] = []
const App: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const [data, setData] = useState<DataType[]>(useLoaderData() as DataType[])
    const columns: TableProps<DataType>['columns'] = [
        {
            title: '姓名',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: '医院',
            dataIndex: 'hospitalName',
            key: 'hospitalName',
        },
        {
            title: '科室',
            key: 'depart',
            dataIndex: 'depart',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true
        },
        {
            title: '主要描述',
            key: 'descript',
            dataIndex: 'descript',
            ellipsis: true
        },
        {
            title: '查看文章',
            key: 'scan',
            render: (_, record) => <Button onClick={() => scan(record)} type="primary">查看文章</Button>,
            align: 'center'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
                <Space size="middle">
                    <Popconfirm title="Sure to delete?" onConfirm={() => drop(record, index)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        //     获取所有信息
        // useLoaderData()
    }, []);
    // 数据处理
    const deal = async (json: any[]) => {
        let arr = []
        for (let item of json) {
            const js = await (await http.request(item.sciencePath)).data
            for (let it of js) {
                arr.push({
                    key: it.onlyKey,
                    author: item.author,
                    hospitalName: item.hospitalName,
                    title: it.title,
                    depart: item.depart,
                    descript: it.description,
                    userId: item.userId,
                    paragraph: it.paragraph
                })
            }
        }
        setData(arr)
    }
    const scan = (record: any) => {
        record.onlyKey = record.key
        delete record.key
        console.log(record)
        navigate('/detail/introduce', {
            state: {
                item: record
            }
        })
    }
    const drop = async (record: any, index: any) => {
        data.splice(index, 1)
        setData([...data])
        const res = await deleteJson({
            userId: record.userId,
            onlyKey: record.key
        })
        if (res.statusCode == 200) {
            success('不符合规则的文章已经删除成功')
        }


    }
    const success = (description: string) => {
        api.open({
            message: '操作成功',
            description,
            icon: <SmileOutlined style={{color: '#108ee9'}}/>,
            placement: 'topLeft'
        })
    }
    const blunder = (description: string) => {
        api.open({
            message: '操作错误',
            description,
            icon: <FrownOutlined style={{color: '#108ee9'}}/>,
            placement: 'topLeft'
        })
    }
    return <>
        {contextHolder}
        <Table columns={columns} dataSource={data} pagination={false}/></>
}

export default App;