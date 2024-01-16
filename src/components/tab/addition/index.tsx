import React, { Fragment, useState } from "react";
import { Table, Tag, Input, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import Search from "./search";
import { deleteUser, http } from "@/utils/http";
import useMessage from "antd/es/message/useMessage";
interface Result<T> {
  status: number,
  message: string,
  result: T
}
const App: React.FC = () => {
  // 对话框
  const [messageApi, contextHolder] = useMessage()
  const [data, setData] = useState<Array<addDataType>>([]);
  const handleDelete = async (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    const res = await deleteUser({ customerId: key })
    if (res.status == 200 && res.result.affectedRows == 1)
      messageApi.success({
        content: res.message,
        duration: 3
      })

  };
  /** 字段类型 */
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
      title: "病情",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") color = "volcano";
            return (<Tag color={color} key={tag}>{tag.toUpperCase()} </Tag>);
          })}
        </>
      ),
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: addDataType) => {
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
  /**
   * @description  更新字段函数
   * @param result 字段信息
   *  */
  const getList = ({ result }: Result<Info[]>) => {
    const res: addDataType[] = []

    result.map((item, index) => {
      const tags = JSON.parse(item.tags)
      res.push({
        key: item.customerId, id: index.toString(), customer: item.customer, hospitalName: item.hospitalName,
        depart: item.depart, createdDate: item.createdDate, tags
      })
    })
    setData(res)

  }

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
