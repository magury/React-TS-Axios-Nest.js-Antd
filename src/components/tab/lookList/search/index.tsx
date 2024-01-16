import { Input, Button, Space, DatePicker, ConfigProvider } from "antd";
import React, { Fragment, useRef, useState } from "react";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { getReport } from "@/utils/http";
const { RangePicker } = DatePicker;
interface IProps {
  getList: Function
}
const App: React.FC<IProps> = (props) => {
  /** 日期动态初值 */
  const [dataRange, setDataRange] = useState<any>([dayjs("2024-01-15", "YYYY-MM-DD"), dayjs("2024-01-16", "YYYY-MM-DD")])
  const customerId = useRef<any>(null);
  const customer = useRef<any>(null);
  const query = async (): Promise<void> => {
    const params = {
      customerId: customerId.current.input.value,
      customer: customer.current.input.value,
      range: [new Date(dataRange[0]['$d']).toLocaleString(), new Date(dataRange[1]['$d']).toLocaleString()]
    }
    const res = await getReport(params)
    props.getList(res.result)

  };
  const clean = (): void => {
    // 清除查询信息
    customer.current.input.value = customerId.current.input.value = null;

  };
  const onChange = (dates: any, dateStrings: [string, string]) => {
    setDataRange([
      dayjs(dateStrings[0], "YYYY-MM-DD"), dayjs(dateStrings[1], "YYYY-MM-DD")
    ])
  }

  return (
    <Fragment>
      <Input
        defaultValue={'1705331781542.4788'}
        ref={customerId}
        placeholder="身份证号"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Input
        defaultValue={'秦膶髇'}
        ref={customer}
        placeholder="姓名"
        style={{ width: "100px", marginRight: "30px" }}
      />
      <Space direction="vertical" size={12} style={{ marginRight: "30px" }}>
        <ConfigProvider locale={locale}>
          <RangePicker
            onChange={onChange}
            allowEmpty={[false, false]}
            allowClear={false}
            value={dataRange}
            defaultValue={dataRange}
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
