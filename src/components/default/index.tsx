import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Cascader, Col,
    DatePicker, Flex,
    Form,
    Input,
    InputNumber,
    Mentions, notification, Popconfirm, Row,
    Select, Space, Switch, Table, TableProps,
    TreeSelect,
} from 'antd';
import {FrownOutlined, SmileOutlined} from "@ant-design/icons";
import {createDoctor, deleteById, deleteDoctor} from "@/utility/http";
import {useLoaderData} from "react-router-dom";

interface DataType {
    key: string;
    username: string;
    password: string;
    author: string;
    hospitalName: string;
    depart: string
}

const formItemLayout = {
    labelCol: {
        // xs: {span: 24},
        // sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    },
};
const App: React.FC = () => {
    const loader= useLoaderData() as any
    const [columns, setColumns] = useState<TableProps<DataType>['columns']>([
        {
            title: '账号',
            dataIndex: 'username',
        },
        {
            title: '密码',
            dataIndex: 'password',
        },

        {
            title: '医院名称',
            dataIndex: 'hospitalName',
            filters: loader.filter,
            onFilter: (value: any, record) => record.hospitalName.startsWith(value),
            filterSearch: true,
        },
        {
            title: '医生',
            dataIndex: 'author',
        },
        {
            title: '科室',
            dataIndex: 'depart'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm title="Sure to delete?" onConfirm={() => drop(record)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ])

    const [data, setData] = useState<DataType[]>(loader.data)
    const [api, contextHolder] = notification.useNotification();
    const [hospitals, setHospitals] = useState<Array<{ level: string, value: string }>>(loader.hospital)
    const drop = async (record:DataType) => {
        const body={
            hospitalId:record.key,
            username:record.username
        }
      const res= await deleteDoctor(body)
        if(res.statusCode==200)
        {
            getAll(res)
            success('成功删除了该用户的数据')
        }

        else
            blunder(res.result.err)

    }
    const getAll = (json: any) => {
        let result = json.result.map((item: any, index: number) => {
            return {
                key: item.hospitalId,
                username: item.username,
                password: item.password,
                author: item.author,
                hospitalName: item.hospitalName,
                depart: item.depart
            }
        })
        let item = columns![2]
        item.filters = result.map((item: any) => ({text: item.hospitalName, value: item.hospitalName}))
        columns?.splice(2, 1, item)
        let arr = columns?.map((item) => item)
        setColumns(arr)
        setData(result.reverse())
    }
    /* 提交按钮回调,获取所有内容 */
    const finish = async (value: any) => {
        const res = await createDoctor(value)
        if (res.statusCode == 200) {
            success('成功添加该用户信息！')
            getAll(res)
        } else {
            blunder(res.result.err)
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
    return (
        <>
            <Form onFinish={finish} className={' grid grid-rows-2 grid-cols-3'} {...formItemLayout} variant="filled">
                {contextHolder}
                <Form.Item validateFirst={true} label="账号" name="username"
                           rules={[{required: true, message: '账号不能为空'}, {
                               min: 8,
                               type: "string",
                               message: '最短长度不能少于8位'
                           }, {pattern: /^[A-Za-z0-9]+$/, message: '账号只能包含字母和数字'}, {
                               whitespace: true,
                               message: '不能使用空格'
                           }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="姓名" name="author" rules={[{required: true, message: '姓名不能为空!'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="科室" name="depart" rules={[{required: true, message: '科室不能为空!'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item validateFirst={true} label="密码" name="password"
                           rules={[{required: true, message: '密码不能为空'}, {
                               min: 8,
                               type: "string",
                               message: '最短长度不能少于8位'
                           }, {pattern: /^[A-Za-z0-9]+$/, message: '密码只能包含字母和数字'}, {
                               whitespace: true,
                               message: '不能使用空格'
                           }]}>
                    <Input/>
                </Form.Item>

                <Form.Item className={'items-start'} initialValue={hospitals[0]} label="医院" name="hospital"
                           rules={[{required: true, message: '医院名称不能为空!'}]}>
                    <Select options={hospitals}/>
                </Form.Item>
                <Form.Item className={'items-start'} wrapperCol={{offset: 4, span: 4}}>
                    <Button className={'w-[200px]'} type="primary" htmlType="submit">
                        创建
                    </Button>
                </Form.Item>
            </Form>
            <Table className={'border-r-0'} pagination={false} columns={columns} dataSource={data}/>;
        </>
    )
}

export default App;