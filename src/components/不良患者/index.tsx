import React, { Fragment, useEffect, useRef, useState } from "react";
import { Space, Table, Tag, Input, Modal, notification, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getBads, http } from "@/utility/http";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useLoaderData } from "react-router-dom";
import {faulty, table} from "@/utility/new.type";
const success = (record: faulty.data) => {
  Modal.success({
    title: "售出信息",
    content: record.prescriptionDrug,
    okText: "知道了",
  });
};
const columns: ColumnsType<faulty.data> = [
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
    title: "医院级别",
    dataIndex: "hospitalLevel",
    key: "hospitalLevel",
  },
  {
    title: "医院地址",
    dataIndex: "hospitalAddress",
    key: "hospitalAddress",
  },
  {
    title: "创建时间",
    dataIndex: "createdDate",
    key: "createdDate",
  },
  {
    title: "不良原因",
    dataIndex: "cause",
    key: "cause",
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
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle" onClick={() => success(record)}>
        <a className="a_color">查看用药信息</a>
      </Space>
    ),
  },
];

const App: React.FC = () => {
  const loader = useLoaderData() as faulty.loader[];
  const [api, contextHolder] = notification.useNotification();
  const getList = async (params: faulty.params) => {
    const res: table.patient[] = (await getBads(params)).result;
    if (!res.length) {
      api.open({ message: "无任何数据" });
    }
    let arr: faulty.data[] = [];
    res.map((item, index) => {
      arr.push({
        ...item,
        key: JSON.stringify(item.customerId),
        tags: JSON.parse(item.tags),
      });
    });
    setData(arr);
  };
  const [data, setData] = useState<faulty.data[]>(loader);
  return (
    <Fragment>
      {contextHolder}
      <Search getList={getList} />
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        style={{ minHeight: "500px" }}
      />
    </Fragment>
  );
};
interface IProps {
  getList: Function;
}
const Search: React.FC<IProps> = (props) => {
  const hospital = useRef<any>(null);
  const name = useRef<any>(null);
  const id = useRef<any>(null);
  const query = (): void => {
    const param = {
      hospitalName: hospital.current.input.value,
      customerId: id.current.input.value,
      customer: name.current.input.value,
    };
    props.getList(param);
  };
  const clean = (): void => {
    // 清除查询信息
    hospital.current.input.value =
      name.current.input.value =
      id.current.input.value =
        null;
  };
  return (
    <Fragment>
      <Input
        ref={hospital}
        placeholder="医院名称"
        style={{ width: "300px", marginRight: "30px" }}
      />
      <Input
        ref={name}
        placeholder="患者名称"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Input
        ref={id}
        placeholder="身份证号"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Button
        onClick={query}
        type="primary"
        style={{ marginRight: "30px" }}
        icon={<SearchOutlined />}
      >
        查询信息
      </Button>
      <Button onClick={clean} type="dashed" icon={<CloseOutlined />}>
        清空查询
      </Button>
    </Fragment>
  );
};
export default App;
