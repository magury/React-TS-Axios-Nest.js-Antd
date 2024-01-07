import React, { Fragment, useEffect, useRef, useState } from "react";
import type { TableColumnsType } from "antd";
import { Badge, Space, Table } from "antd";
import { dictionaryDataType, ExpandedDataType } from "../../../utils/type";

const App: React.FC = () => {
  // 二阶数据
  let exData: any[] | undefined = [];
  useEffect(() => {
    exData = [
      {
        key: new Date().getTime().toString(),
        id: new Date().getTime().toString(),
        name: "乐山市第一人民医院",
        level: "三甲",
        time: new Date().toLocaleString(),
      },
    ];
  }, []);

  // 触发回调
  const onExpandedRowsChange = (expandedRows: readonly React.Key[]) => {
    // 二阶数据
    exData = [
      {
        key: new Date().getTime().toString(),
        id: new Date().getTime().toString(),
        name: "乐山市第二人民医院",
        level: "三甲",
        time: new Date().toLocaleString(),
      },
    ];
  };
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "序号", dataIndex: "id", key: "id" },
      { title: "医院名称", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => <Badge status="success" text="三甲" />,
      },
      { title: "创建时间", dataIndex: "time", key: "time" },
    ];
    return <Table columns={columns} dataSource={exData} pagination={false} />;
  };

  const columns: TableColumnsType<dictionaryDataType> = [
    { title: "省份", dataIndex: "sort", key: "sort" },
    { title: "编码", dataIndex: "code", key: "code" },
    { title: "医院数量", dataIndex: "level", key: "level" },
    { title: "医生人数", dataIndex: "doctorNumber", key: "doctorNumber" },
  ];

  const data: dictionaryDataType[] = [];
  data.push({
    key: new Date().toString(),
    sort: "四川省",
    code: "110011",
    level: 20,
    doctorNumber: 20,
  });

  return (
    <Fragment>
      <Table
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
          onExpandedRowsChange,
        }}
        dataSource={data}
      />
    </Fragment>
  );
};

export default App;
