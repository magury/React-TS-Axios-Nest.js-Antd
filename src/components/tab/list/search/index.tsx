import { Input, Button, UploadProps, Upload, message } from "antd";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { SearchOutlined, CloseOutlined, UploadOutlined, } from "@ant-design/icons";
import useMessage from "antd/es/message/useMessage";
import { useAppSelector } from "@/store/hooks";
interface IProps {
  getList: Function
}
const App: React.FC<IProps> = (props) => {
  const status = useAppSelector(state => state.login.status)
  // 对话框
  const [messageApi, contextHolder] = useMessage()
  const [orderId, setOrderId] = useState('1')
  const [customerId, setCustomerId] = useState('csc0001');
  const [tags, setTags] = useState('感冒、流鼻涕')
  const [show, setShow] = useState(true)
  const [customer, setCustomer] = useState('秦膶髇')
  useEffect(() => {
    if (orderId == '' || customerId == '' || tags == '' || customer == '')
      setShow(false)
    else
      setShow(true)
  }, [orderId, customerId, tags, customer])

  const prop: UploadProps = {
    accept: 'image/*',
    openFileDialogOnClick: show,
    showUploadList: false,
    name: 'file',
    action: `http://localhost:3011/upload/report`,
    headers: {
      authorization: 'authorization-text',
    },
    data: {
      orderId, customerId: Date.now() + Math.random() * 1000 + '', hospitalName: status.hospitalName, depart: status.depart, createdDate: new Date().toLocaleString(),
      tags, customer
    },
    onChange(info) {
      if (info.file.status == 'uploading') {
        messageApi.loading(`${info.file.name} file uploading`)
      }
      if (info.file.status === 'done') {
        messageApi.success(`${info.file.name} file uploaded successfully`);
        props.getList(info.file.response.result)

      } else if (info.file.status === 'error') {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    }

  };
  const onChange = async (e: any) => {
    const { id, value } = e.target
    switch (id) {
      case 'order':
        setOrderId(value)
        break;
      case 'customerId':
        setOrderId(value)
        break;
      case 'tags':
        setOrderId(value)
      case 'customer':
        setCustomer(value)
        break;
    }
  }
  const clean = (): void => {
    // 清除查询信息
    setOrderId('')
    setCustomerId('')
    setTags('')
  };
  const onClick = () => {
    const params = []
    if (orderId.trim() == '')
      params.push('订单号')
    if (customerId.trim() == '')
      params.push('身份证号')
    if (tags.trim() == '')
      params.push('检查内容')
    if (customer.trim() == '')
      params.push('患者姓名')
    if (params.length > 0)
      messageApi.open({
        type: 'error',
        content: `${params.join('、')} 信息不完整,上传失败！`
      })


  }
  return (
    <Fragment>
      {contextHolder}
      <div
        style={{
          width: "600px",
          margin: "0px auto",
          marginTop: "-20px",
        }}
      >
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 50, marginBottom: 30, justifyContent: 'center' }}>
        <Input
          id="order"
          onChange={onChange}
          defaultValue={1}
          placeholder="订单号"
          style={{ width: "200px", marginRight: "30px" }}
        />
        <Input
          id="customer"
          onChange={onChange}
          defaultValue={'秦膶髇'}
          placeholder="患者姓名"
          style={{ width: "100px", marginRight: "30px" }}
        />
        <Input
          id="customerId"
          onChange={onChange}
          defaultValue={'csc0001'}
          placeholder="身份证号"
          style={{ width: "100px", marginRight: "30px" }}
        />
        <Input
          id="tags"
          onChange={onChange}
          defaultValue={'感冒,流鼻涕'}
          placeholder="检查内容"
          style={{ width: "200px", marginRight: "30px" }}
        />
        <div className="upload">
          <Upload {...prop} >
            <Button onClick={onClick} icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <Button style={{ marginLeft: '30px' }} onClick={clean} type="dashed" icon={<CloseOutlined />}>
            重新输入
          </Button>
        </div>

      </div>

    </Fragment>
  );
};
export default App;
