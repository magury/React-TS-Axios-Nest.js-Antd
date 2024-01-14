import React, { useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table } from "antd";
import { http } from "@/utils/http";
// 二级数据源
const App: React.FC = () => {
  // 一级数据源
  const [content, setContent] = useState<dictionaryDataType[]>();
  // 二级数据
  const [children, setChild] = useState();
  const child: any = [];
  useEffect(() => {
    http.get("/hospital/list").then((res) => {
      const data: Array<ProvinceData> = res.data;
      const provinces: any = [];
      for (const it of data) {
        const province: any = { ...it };
        provinces.push(province);
        delete province.children;
        child.push(it.children);
      }
      setContent(provinces);
      setChild(child);
    });
  }, []);

  const expandedRowRender = (
    record: any,
    index: number,
    indent: any,
    expanded: any
  ) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "医院名称", dataIndex: "hospitalName" },
      { title: "添加的时间", dataIndex: "additionDate" },
      { title: "医院水平", dataIndex: "hospitalLevel" },
      {
        title: "地址",
        dataIndex: "position",
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        hospitalName: "111",
        additionDate: "sss",
        hospitalLevel: "sss",
        province: "sss",
      });
    }

    return (
      <Table
        columns={columns}
        dataSource={children![index]}
        pagination={false}
        rowKey={(record) => Date.now() + Math.random() * 100 + ""}
      />
    );
  };

  const columns: TableColumnsType<DataType> = [
    { title: "省份", dataIndex: "provinceName" },
    { title: "邮政编码", dataIndex: "code" },
    { title: "医生数量", dataIndex: "doctorNumber" },
    { title: "医院数量", dataIndex: "mount" },
  ];

  return (
    <>
      <Table
        rowKey={(record) => record.provinceName}
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={content}
      />
    </>
  );
};

export default App;
