import React, { Fragment, useState } from "react";
import { Table, Tag, Input, Popconfirm, Drawer } from "antd";
import type { ColumnsType } from "antd/es/table";
import Search from "./search";
const App: React.FC = () => {
  // 框
  const [open, setOpen] = useState(false);
  // 显示抽屉
  const showDrawer = () => {
    setOpen(true);
  };
  // 关闭抽屉
  const onClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState<Array<lookDataType>>([
    {
      key: "1",
      customer: "郑飞狗",
      hospitalName: "乐山市第一人民医院",
      departmentName: "外科",
      createdDate: new Date().toLocaleString(),
      tags: ["CT", "抽血"],
    },
    {
      key: "2",
      customer: "郑飞狗",
      hospitalName: "乐山市第二人民医院",
      departmentName: "外科",
      createdDate: new Date().toLocaleString(),
      tags: ["CT", "抽血"],
    },
  ]);
  const columns: ColumnsType<lookDataType> = [
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
      title: "科室",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "创建时间",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "检查类别",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <Fragment>
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
        </Fragment>
      ),
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: lookDataType) => {
        return data.length >= 1 ? (
          <a onClick={showDrawer} style={{ color: "#0056b3" }}>
            查看文件
          </a>
        ) : null;
      },
    },
  ];

  const data1: lookDataType[] = [
    {
      key: "1",
      customer: "郑飞狗",
      hospitalName: "乐山市第一人民医院",
      departmentName: "外科",
      createdDate: new Date().toLocaleString(),
      tags: ["感冒", "流鼻涕"],
    },
    {
      key: "2",
      customer: "郑飞狗",
      hospitalName: "乐山市第二人民医院",
      departmentName: "外科",
      createdDate: new Date().toLocaleString(),
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
      <Drawer title="报告信息" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Fragment>
  );
};

export default App;
