import React, { Fragment, useState } from "react";
import { Space, Table, Tag, Input, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { addDataType } from "../../../utils/type";
import Search from "./search";
const App: React.FC = () => {
  const [data, setData] = useState<Array<addDataType>>([
    {
      key: "1",
      id: new Date().getTime().toString(),
      customer: "郑飞狗",
      name: "乐山市第一人民医院",
      departmentName: "外科",
      time: new Date().toLocaleString(),
      tags: ["感冒", "流鼻涕"],
    },
    {
      key: "2",
      id: new Date().getTime().toString(),
      customer: "郑飞狗",
      name: "乐山市第二人民医院",
      departmentName: "外科",
      time: new Date().toLocaleString(),
      tags: ["感冒", "流鼻涕"],
    },
  ]);
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };
  const columns: ColumnsType<addDataType> = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
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
      title: "operation",
      dataIndex: "operation",
      render: (_, record: addDataType) => {
        console.log(record);
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

  const data1: addDataType[] = [
    {
      key: "1",
      id: new Date().getTime().toString(),
      customer: "郑飞狗",
      name: "乐山市第一人民医院",
      departmentName: "外科",
      time: new Date().toLocaleString(),
      tags: ["感冒", "流鼻涕"],
    },
    {
      key: "2",
      id: new Date().getTime().toString(),
      customer: "郑飞狗",
      name: "乐山市第二人民医院",
      departmentName: "外科",
      time: new Date().toLocaleString(),
      tags: ["感冒", "流鼻涕"],
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
