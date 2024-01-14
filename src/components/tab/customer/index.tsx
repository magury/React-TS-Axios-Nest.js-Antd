import React, { Fragment, useEffect, useState } from "react";
import { Space, Table, Tag, Input, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import Search from "./search";
import { http } from "../../../utils/http";
const info = () => {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() { },
  });
};

const success = () => {
  Modal.success({
    content: 'some messages...some messages...',
  });
};

const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
};

const warning = () => {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
};
const columns: ColumnsType<DataType> = [
  {
    title: "患者姓名",
    dataIndex: "customer",
    key: "customer",
    align: 'center',
    render: (text) => <a >{text}</a>,
  },
  {
    title: "医院名称",
    dataIndex: "hospitalName",
    key: "hospitalName",
    align: 'center'
  },
  {
    title: "医院级别",
    dataIndex: "hospitalLevel",
    key: "hospitalLevel", align: 'center'
  },
  {
    title: "医院地址",
    dataIndex: "hospitalAddress",
    key: "address", align: 'center'
  },
  {
    title: "创建时间",
    dataIndex: "createdDate",
    key: "createdDate", align: 'center'
  },
  {
    title: "连续就诊次数",
    dataIndex: "times", align: 'center',
    key: "times",
  },

  {
    title: "病情",
    key: "tags",
    dataIndex: "tags", align: 'center',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 2 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action', align: 'center',
    render: (_, record) => (
      <Space size="middle" onClick={() => {
        console.log(record);
      }}>
        <a className="a_color">查看用药信息</a>
      </Space >
    ),
  },
];
const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const getInfo = async (params: any) => {
    const res: Info[] = await (await http.request({ url: "/info", method: "get", params, })).data;
    console.log(res);

    let arr: DataType[] = [];
    res.map((item, index) => {
      arr = [
        ...arr,
        {
          key: String(item.customerId),
          customer: item.customer,
          hospitalName: item.hospitalName,
          hospitalLevel: item.hospitalLevel,
          hospitalAddress: item.hospitalAddress,
          createdDate: item.createdDate,
          times: item.times,
          tags: JSON.parse(item.tags),
        },
      ];
    });
    setData(arr);
  };

  return (
    <Fragment>
      <Space wrap>
        <Button onClick={info}>Info</Button>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
      </Space>
      <Search getInfo={getInfo} />
      <Table
        rowKey={(record) => record.customer + record.hospitalName}
        pagination={false}
        columns={columns}
        dataSource={data}
        style={{ minHeight: "500px", textAlign: 'center' }}
      />
    </Fragment>
  );
};

export default App;
