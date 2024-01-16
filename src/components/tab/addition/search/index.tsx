import { Input, Button, InputNumber, Tag } from "antd";
import React, { Fragment, useRef, useState } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import useMessage from "antd/es/message/useMessage";
import { useAppSelector } from "@/store/hooks";
import { http } from "@/utils/http";
import { METHOD_POST } from "@/utils/constant";
interface IProps {
  getList: Function
}
const App: React.FC<IProps> = (props) => {
  const status = useAppSelector(state => state.login.status)
  // 对话框
  const [messageApi, contextHolder] = useMessage()
  const hospital = useRef<any>(null);
  const name = useRef<any>(null);
  const main = useRef<any>(null);
  const medical = useRef<any>(null)
  const result = useRef<any>(null)
  const frequent = useRef<any>(null)
  const [times, setTimes] = useState(3)
  /**
   * @description 显示错误提示
   * @param content 提示信息
   */
  const showErr = (content: string) => {
    messageApi.open({
      type: 'error',
      content,
      duration: 3,

    });
  }
  /**
   * @description 添加信息
   * @returns null
   */
  const query = async (): Promise<void> => {
    const params = []
    const customerId = Date.now() + Math.random() * 1000 + ''
    if (customerId == '')
      params.push('身份证号')
    const customer = name.current.input.value.trim()
    if (customer == '')
      params.push('患者姓名')
    const tags = main.current.input.value.trim()
    if (tags == '')
      params.push('主要病情')
    const prescriptionDrug = medical.current.input.value.trim()
    if (prescriptionDrug == '')
      params.push('处方药')
    if (times == 0)
      params.push('就诊次数')
    const cause = result.current.input.value.trim()
    if (params.length > 0) return showErr(`输入错误！！${params.join('、')}不能为空`)
    const data = {
      ...status, customerId, customer, tags, prescriptionDrug, cause, times
    }
    const res = await http.request({
      url: '/update/user',
      method: METHOD_POST,
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.data.status == 200) {
      messageApi.open({
        type: 'success',
        content: res.data.message,
        duration: 3,

      });
      props.getList(res.data)
    }




  };
  /**
   * @description 清除查询信息
   */
  const clean = (): void => {
    setTimes(0)
    // 清除查询信息
    hospital.current.input.value = name.current.input.value = main.current.input.value =
      medical.current.input.value = null;
  };
  const onChange = (value: any) => setTimes(value)
  return (
    <Fragment>
      {contextHolder}
      <Input
        defaultValue="csc0001"
        ref={hospital}
        placeholder="身份证号"
        style={{
          width: "200px", marginRight: "30px"
        }}
      />
      < Input
        defaultValue="秦膶髇"
        ref={name}
        placeholder="患者名称"
        style={{ width: "100px", marginRight: "30px" }}
      />
      <Input
        defaultValue="感冒 流鼻涕，咳嗽"
        ref={main}
        placeholder="主要病情"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Input
        defaultValue="我不知道啊"
        ref={medical}
        placeholder="处方药"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Input
        defaultValue=""
        ref={result}
        placeholder="不良患者"
        style={{ width: "200px", marginRight: "30px" }}
      />


      <div style={{ marginTop: -50 }}>
        <Tag color="success">输入就诊次数</Tag>
        <InputNumber ref={frequent} min={1} max={10} value={times} style={{ marginRight: "30px" }} onChange={onChange} />;

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
      </div>

    </Fragment>
  );
};
export default App;
