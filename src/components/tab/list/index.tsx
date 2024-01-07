import React, { Fragment, useState } from "react";
import { Space, Table, Tag, Input, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { listDataType } from "../../../utils/type";
import Search from "./search";
const App: React.FC = () => {
  const [data, setData] = useState<Array<listDataType>>([
    {
      key: "1",
      orderId: new Date().getTime().toString(),
      customer: "郑飞狗",
      name: "乐山市第一人民医院",
      departmentName: "外科",
      time: new Date().toLocaleString(),
      tags: ["CT", "抽血"],
    },
    {
      key: "2",
      orderId: new Date().getTime().toString(),
      customer: "郑飞狗",
      name: "乐山市第二人民医院",
      departmentName: "外科",
      time: new Date().toLocaleString(),
      tags: ["CT", "抽血"],
    },
  ]);
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };
  const columns: ColumnsType<listDataType> = [
    {
      title: "订单号",
      dataIndex: "orderId",
      key: "orderId",
    },
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
      title: "科室",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "创建时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "检查类别",
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
      title: "operation",
      dataIndex: "operation",
      render: (_, record: listDataType) => {
        return data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              handleDelete(record.key);
            }}
          >
            <a style={{ color: "#0056b3" }}>Delete</a>
          </Popconfirm>
        ) : null;
      },
    },
  ];

  const data1: listDataType[] = [
    {
      key: "1",
      orderId: new Date().getTime().toString(),
      customer: "郑飞狗",
      name: "乐山市第一人民医院",
      departmentName: "外科",
      time: new Date().toLocaleString(),
      tags: ["感冒", "流鼻涕"],
    },
    {
      key: "2",
      orderId: new Date().getTime().toString(),
      customer: "郑飞狗",
      name: "乐山市第二人民医院",
      departmentName: "外科",
      time: new Date().toLocaleString(),
      tags: ["CT", "抽血"],
    },
  ];

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
