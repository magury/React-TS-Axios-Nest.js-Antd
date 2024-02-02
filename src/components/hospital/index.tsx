import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    notification, Popconfirm,
    Select, Space, Table, TableProps, Tag,
    TreeSelect,
} from 'antd';
import {deleteById, getHospitalList, postManager} from "@/utility/http";
import {FrownOutlined, SmileOutlined} from "@ant-design/icons";
import {useLoaderData} from "react-router-dom";

const options = '三级甲等 三级乙等 二级甲等 二级乙等 一级'.split(' ').map((value) => ({value}))
const provinces = '四川省 湖北省 湖南省 上海市 北京市 贵州省 云南省 广东省 广西壮族自治区'.split(' ').map((value) => ({value}))
const formItemLayout = {
    labelCol: {
        // xs: {span: 24},
        // sm: {span: 10},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    },
};

interface DataType {
    key: string;
    name: string;
    level: number;
    address: string;
    province: string;
    hospitalId:string
}

const App: React.FC = () => {
   let loader= useLoaderData() as any
    const [columns, setColumns] = useState<TableProps<DataType>['columns']>([
        {
            title: '医院名称',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            filters: loader.filter,
            onFilter: (value: any, record) => record.name.startsWith(value),
            filterSearch: true,
        },
        {
            title: '医院等级',
            dataIndex: 'level',
        },

        {
            title: '省份',
            dataIndex: 'province',
        },
        {
            title: '详细地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm title="Sure to delete?" onConfirm={() => drop(record.hospitalId)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ])
    const [data, setData] = useState<DataType[]>(loader.data.reverse())
    const [api, contextHolder] = notification.useNotification();
    /* 提交按钮回调,获取所有内容 */
    const finish = async (value: any) => {
        const {address, level: {value: level}, name, province: {value: province}} = value
        const res: format.Result<Addition[]> = await postManager({address, level, name, province})
        if (res.statusCode == 200) {
            success(`你成功添加了${name}`)
            getAll(res)
        } else {
            blunder('请检查是否输入正确')
        }
    }
    const getAll = (json: any) => {
        let result = json.result.map((item: Addition, index: number) => {
            return {
                key:index+'',
                name: item.hospitalName,
                address: item.position,
                level: item.hospitalLevel,
                province: item.province,
                hospitalId:item.hospitalId,
            }

        })
        let item = columns![0]
        item.filters = result.map((item: any) => ({text: item.name, value: item.name}))
        columns?.splice(0, 1, item)
        let arr = columns?.map((item) => item)
        setColumns(arr)
        setData(result.reverse())
    }
    const drop = async (key: any) => {
        const res = await deleteById(key)
        if(res.statusCode==200)
        {
            success('成功删除了该医院数据')
            getAll(res)
        }

        else
            blunder('网络繁忙，请稍后重试')
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
            {contextHolder}
            <Form onFinish={finish} className={' flex flex-row justify-start'} {...formItemLayout} variant="filled">
                <Form.Item className={'flex-1'} label="医院名称" name="name"
                           rules={[{required: true, message: 'Please input!'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item className={'flex-1'} initialValue={options[0]} label="医院等级" name="level"
                           rules={[{required: true, message: '医院名称不能为空!'}]}>
                    <Select labelInValue options={options}/>
                </Form.Item>
                <Form.Item className={'flex-1 w-[80%]'} initialValue={provinces![0]} label="省份" name="province"
                           rules={[{required: true, message: '省份不能为空!'}]}>
                    <Select labelInValue options={provinces}/>
                </Form.Item>
                <Form.Item className={'flex-1'} label="详细地址" name="address"
                           rules={[{required: true, message: '详细地址不能为空!'}]}>
                    <Input/>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    创建
                </Button>
            </Form>
            <Table className={'border-r-0'} pagination={false} columns={columns} dataSource={data}/>;

        </>
    )
}

export default App;