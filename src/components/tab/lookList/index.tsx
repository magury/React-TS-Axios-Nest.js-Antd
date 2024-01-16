import React, { Fragment, useRef, useState } from "react";
import { Table, Tag, Input, Popconfirm, Drawer } from "antd";
import type { ColumnsType } from "antd/es/table";
import Search from "./search";
const App: React.FC = () => {
  const img = useRef<any>(null)
  // 框
  const [open, setOpen] = useState(false);
  // 显示抽屉
  const showDrawer = (path: any) => {
    img.current.src = path

    setOpen(true);
  };
  // 关闭抽屉
  const onClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState<Array<lookDataType>>([]);
  const columns: ColumnsType<lookDataType> = [
    {
      title: "患者姓名",
      dataIndex: "customer",
    },
    {
      title: "医院名称",
      dataIndex: "hospitalName",
    },
    {
      title: "科室",
      dataIndex: "depart",
    },
    {
      title: "创建时间",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "检查类别",
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
      dataIndex: "reportPath",
      render: (_, record: lookDataType) => {
        return data.length >= 1 ? (
          <a className="a_color" onClick={() => showDrawer(record.reportPath)}>
            查看文件
          </a>
        ) : null;
      },
    },
  ];

  const getList = (result: any[]) => {
    result.map((item, index) => {
      item.key = item.customerId
      delete item.customerId
      item.createdDate = new Date(item.createdDate).toLocaleString()
    })
    setData(result)
  }
  return (
    <Fragment>
      <Search getList={getList} />
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        style={{ minHeight: "500px" }}
      />
      <Drawer forceRender={true} width='fit-content' title="报告信息" placement="right" onClose={onClose} open={open}>
        <img ref={img} src="" alt="" />
      </Drawer>
    </Fragment>
  );
};

export default App;
