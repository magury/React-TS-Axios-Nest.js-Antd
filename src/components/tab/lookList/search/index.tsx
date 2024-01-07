import { Input, Button, Space, DatePicker, ConfigProvider } from "antd";
import React, { Fragment, useRef } from "react";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
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
        placeholder="姓名"
        style={{ width: "100px", marginRight: "30px" }}
      />
      <Space direction="vertical" size={12} style={{ marginRight: "30px" }}>
        <ConfigProvider locale={locale}>
          <RangePicker
            defaultValue={[
              dayjs("2022-01-01", "YYYY-MM-DD"),
              dayjs("2023-01-01", "YYYY-MM-DD"),
            ]}
          />
        </ConfigProvider>
      </Space>
      <Button
        onClick={query}
        type="primary"
        style={{ marginRight: "30px" }}
        icon={<SearchOutlined />}
      >
        查询数据
      </Button>
      <Button onClick={clean} type="dashed" icon={<CloseOutlined />}>
        重新输入
      </Button>
    </Fragment>
  );
};
export default App;
