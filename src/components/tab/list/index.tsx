import React, { Fragment, useState } from "react";
import { Space, Table, Tag, Input, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import Search from "./search";
import { deleteReport } from "@/utils/http";
import useMessage from "antd/es/message/useMessage";
const App: React.FC = () => {
  const [messageApi, contextHolder] = useMessage()
  const getList = (list: any[]) => {
    list.map((item) => {
      item.key = item.customerId
      delete item.reportPath
    })
    setData(list)
  }
  const [data, setData] = useState<Array<listDataType>>([]);
  const handleDelete = async (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    const result = await deleteReport(key)
    messageApi.success(result.message)
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
      dataIndex: "hospitalName",
      key: "hospitalName",
    },
    {
      title: "科室",
      dataIndex: "depart",
      key: "depart",
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
  return (
    <Fragment>
      <Search getList={getList} />
      {contextHolder}
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
