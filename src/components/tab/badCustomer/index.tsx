import React, { Fragment, useEffect, useState } from "react";
import { Space, Table, Tag, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import Search from "./search";
import { http } from "@/utils/http";
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
    dataIndex: "reason",
    key: "reason",
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
          key: String(item.customerId),
          customer: item.customer,
          hospitalName: item.hospitalName,
          hospitalLevel: item.hospitalLevel,
          hospitalAddress: item.hospitalAddress,
          createdDate: item.createdDate,
          reason: item.cause,
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
