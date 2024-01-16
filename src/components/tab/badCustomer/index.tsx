import React, { Fragment, useEffect, useState } from "react";
import { Space, Table, Tag, Input, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import Search from "./search";
import { http } from "@/utils/http";
const success = (record: badDataType) => {
  Modal.success({
    title: '售出信息',
    content: record.prescriptionDrug,
    okText: '知道了'
  });
};
const columns: ColumnsType<badDataType> = [
  {
    title: "患者姓名",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "医院名称",
    dataIndex: "hospitalName",
    key: "hospitalName",
  },
  {
    title: "医院级别",
    dataIndex: "hospitalLevel",
    key: "hospitalLevel",
  },
  {
    title: "医院地址",
    dataIndex: "hospitalAddress",
    key: "hospitalAddress",
  },
  {
    title: "创建时间",
    dataIndex: "createdDate",
    key: "createdDate",
  },
  {
    title: "不良原因",
    dataIndex: "cause",
    key: "cause",
  },
  {
    title: "病情",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
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
    key: 'action',
    render: (_, record) => (
      <Space size="middle" onClick={() => success(record)}>
        <a className="a_color">查看用药信息</a>
      </Space>
    ),
  },
];

const App: React.FC = () => {
  const getList = async (params: any) => {
    const res: Info[] = await await (
      await http.request({
        url: "/bad/list",
        method: "get",
        params,
      })
    ).data;
    let arr: badDataType[] = [];
    res.map((item, index) => {
      arr = [
        ...arr,
        {
          ...item,
          key: String(item.customerId),
          tags: JSON.parse(item.tags),
        },
      ];
    });
    setData(arr);
  };
  const [data, setData] = useState<badDataType[]>([]);
  return (
    <Fragment>
      <Search getList={getList} />
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        style={{ minHeight: "500px" }}
      />
    </Fragment>
  );
};

export default App;
