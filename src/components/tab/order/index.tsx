import React, { Fragment } from "react";
import { Space, Table, Tag, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import Search from "./search";
const columns: ColumnsType<orderDataType> = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    className: "text",
    align: "center",
  },
  {
    title: "交易账单",
    dataIndex: "order",
    key: "order",
    className: "text",
    align: "center",
  },
  {
    title: "医院名称",
    dataIndex: "hospitalName",
    key: "hospitalName",
    className: "text",
    align: "center",
  },
  {
    title: "科室名称",
    dataIndex: "departmentName",
    key: "departmentName",
    className: "text",
    align: "center",
  },
  {
    title: "安排时间",
    dataIndex: "scheduleTime",
    key: "scheduleTime",
    className: "text",
    align: "center",
  },
  {
    title: "患者姓名",
    dataIndex: "customer",
    key: "customer",
    className: "text",
    align: "center",
  },
  {
    title: "预约号",
    dataIndex: "number",
    key: "number",
    className: "text",
    align: "center",
  },
  {
    title: "费用",
    dataIndex: "fee",
    key: "fee",
    className: "text",
    align: "center",
  },
  {
    title: "订单状态",
    dataIndex: "station",
    key: "station",
    className: "text",
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "createdDate",
    key: "createdDate",
    className: "text",
    align: "center",
  },
];

const data: orderDataType[] = [
  {
    key: "1",
    id: "1",
    order: "string",
    hospitalName: "乐山市第一人民医院",
    departmentName: "外科",
    scheduleTime: new Date().toLocaleString(),
    customer: "郑飞狗",
    number: 12,
    fee: 100,
    station: "OK",
    createdDate: new Date().toLocaleString(),
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
        size="large"
      />
    </Fragment>
  );
};

export default App;
