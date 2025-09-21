import React, {useState} from "react";
import {Button, Space, Table, Tag, notification} from "antd";
import type {TableProps} from "antd";
import {useLoaderData} from "react-router-dom";
import {putFallback} from "@/utility/http";

interface DataType {
    key: string;
    name: string;
    hospitalName: string;
    errors: string;
    hospitalId: string;
    dealStatus: number;
    userId: string
}

const App: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const deal = async (record: DataType, index: number) => {
        let update = await putFallback({uuid: record.key, hospitalId: record.hospitalId, userId: record.userId})
        if (update.statusCode == 200) {
            data[index].dealStatus = 1
            data.sort((a: DataType, b: DataType)=>a.dealStatus-b.dealStatus)
            setData([...data])
            api.open({
                message: '操作成功',
                placement: 'topLeft'
            })
        }

    }
    const [data, setData] = useState<DataType[]>(useLoaderData() as any[]);
    const columns: TableProps<DataType>["columns"] = [
        {
            title: "医生姓名",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "所属医院",
            dataIndex: "hospitalName",
            key: "hospitalName",
        },
        {
            title: "错误信息",
            dataIndex: "errors",
            key: "errors",
            width: 500,
        },
        {
            title: '是否处理',
            dataIndex: 'dealStatus',
            key: 'dealStatus',
            render: (_, record) =>
                (
                    record.dealStatus ? <Tag bordered={false} color="success">成功解决</Tag> :
                        <Tag bordered={false} color="error">还未处理</Tag>

                )


        },
        {
            title: "操作",
            key: "action",
            render: (_, record, index) => (
                <Space size="middle">
                    <Button onClick={() => deal(record, index)}>进行处理</Button>
                </Space>
            ),
            align: 'center'
        },
    ];

    return (
        <>
            {contextHolder}
            <Table style={{wordWrap: 'break-word', wordBreak: 'break-word'}} pagination={false}
                   scroll={{x: 'max-content'}} className="" columns={columns} dataSource={data}/>
        </>
    );
};

export default App;
