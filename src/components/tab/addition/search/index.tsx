import { Input, Button, Flex, Tooltip } from "antd";
import React, { Fragment, useRef } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
const App: React.FC = () => {
  const hospital = useRef<any>(null);
  const name = useRef<any>(null);
  const id = useRef<any>(null);
  const query = (): void => {};
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
        placeholder="身份证号"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Input
        ref={name}
        placeholder="患者名称"
        style={{ width: "100px", marginRight: "30px" }}
      />
      <Input
        ref={id}
        placeholder="主要病情"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Input
        ref={id}
        placeholder="连续就诊次数"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Input
        ref={id}
        placeholder="处方药"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Button
        onClick={query}
        type="primary"
        style={{ marginRight: "30px" }}
        icon={<SearchOutlined />}
      >
        添加信息
      </Button>
      <Button onClick={clean} type="dashed" icon={<CloseOutlined />}>
        重新输入
      </Button>
    </Fragment>
  );
};
export default App;
