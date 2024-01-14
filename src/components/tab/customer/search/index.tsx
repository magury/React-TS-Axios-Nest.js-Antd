import { Input, Button, Flex, Tooltip, InputRef } from "antd";
import React, { Fragment, ReactElement, useRef } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
interface Props {
  getInfo: Function;
}
const App: React.FC<Props> = (props) => {
  const hospital = useRef<any>(null);
  const name = useRef<any>(null);
  const id = useRef<any>(null);
  const query = (): void => {
    const param = {
      hospital: hospital.current.input.value,
      id: id.current.input.value,
      name: name.current.input.value,
    };
    if (!(param.hospital == param.id && param.id == param.name))
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
        value={"乐山市第一人民医院"}
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
