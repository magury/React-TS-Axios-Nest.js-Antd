import React, { Fragment } from "react";
import { Space, Table, Tag, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "../../../utils/type";
import Search from "./search";
const columns: ColumnsType<DataType> = [
  {
    title: "患者姓名",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "医院名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "医院级别",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "医院地址",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "创建时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "连续就诊次数",
    dataIndex: "timer",
    key: "timer",
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

const data: DataType[] = [
  {
    key: "1",
    customer: "郑飞狗",
    name: "乐山市第一人民医院",
    level: "三甲医院",
    address: "四川省乐山市市中区白塔街238号",
    time: new Date().toLocaleString(),
    timer: 1,
    tags: ["感冒", "流鼻涕"],
  },
];

const App: React.FC = () => {
  return (
    <Fragment>
      <Search />
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
