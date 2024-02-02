import React, { Fragment, useEffect, useRef, useState } from "react";
import { Space, Table, Tag, Input, Button, Modal, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { getPatients, http } from "@/utility/http";
import { useLoaderData } from "react-router-dom";
import {basic, table} from "@/utility/new.type";
const success = (record: basic.data) => {
  Modal.success({
    title: "售出信息",
    content: record.prescriptionDrug,
    okText: "知道了",
  });
};
const columns: ColumnsType<basic.data> = [
  {
    title: "患者姓名",
    dataIndex: "customer",
    key: "customer",
    align: "center",
  },
  {
    title: "医院名称",
    dataIndex: "hospitalName",
    key: "hospitalName",
    align: "center",
  },
  {
    title: "医院级别",
    dataIndex: "hospitalLevel",
    key: "hospitalLevel",
    align: "center",
  },
  {
    title: "医院地址",
    dataIndex: "hospitalAddress",
    key: "address",
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "createdDate",
    key: "createdDate",
    align: "center",
  },
  {
    title: "连续就诊次数",
    dataIndex: "times",
    align: "center",
    key: "times",
  },

  {
    title: "病情",
    key: "tags",
    dataIndex: "tags",
    align: "center",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 2 ? "geekblue" : "green";
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
    align: "center",
    render: (_, record) => (
      <Space size="middle" onClick={() => success(record)}>
        <a className="a_color">查看用药信息</a>
      </Space>
    ),
  },
];
const App: React.FC = () => {
  const loader = useLoaderData() as basic.loader[];
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<basic.loader[]>(loader);
  const getInfo = async (params: basic.params) => {
    const res: table.patient[] = (await getPatients(params)).result;
    if (!res.length) {
      api.open({ message: "无任何数据" });
    }
    let arr: basic.data[] = [];
    res.map((item, index) => {
      arr.push({
        ...item,
        key: JSON.stringify(index),
        tags: JSON.parse(item.tags),
      });
    });
    setData(arr);
  };

  return (
    <Fragment>
      {contextHolder}
      <Search getInfo={getInfo} />
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        style={{ minHeight: "500px", textAlign: "center" }}
      />
    </Fragment>
  );
};
interface Props {
  getInfo: Function;
}
const Search: React.FC<Props> = (props) => {
  const hospital = useRef<any>(null);
  const name = useRef<any>(null);
  const id = useRef<any>(null);
  const query = (): void => {
    const param = {
      hospitalName: hospital.current.input.value,
      customerId: id.current.input.value,
      customer: name.current.input.value,
    };
    props.getInfo(param);
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
        defaultValue={"乐山市第一人民医院"}
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
