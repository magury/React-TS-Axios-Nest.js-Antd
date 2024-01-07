import { Input, Button, UploadProps, Upload } from "antd";
import React, { Fragment, useRef } from "react";
import {
  SearchOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const props: UploadProps = {
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: "1",
      name: "xxx.png",
      status: "uploading",
      url: "http://www.baidu.com/xxx.png",
      percent: 33,
    },
    {
      uid: "2",
      name: "yyy.png",
      status: "done",
      url: "http://www.baidu.com/yyy.png",
    },
    {
      uid: "3",
      name: "zzz.png",
      status: "error",
      response: "Server Error 500", // custom error message to show
      url: "http://www.baidu.com/zzz.png",
    },
  ],
};
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
      <div
        style={{
          width: "600px",
          margin: "0px auto",
          marginTop: "-20px",
        }}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>
      <Input
        ref={hospital}
        placeholder="订单号"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Input
        ref={name}
        placeholder="身份证号"
        style={{ width: "100px", marginRight: "30px" }}
      />
      <Input
        ref={id}
        placeholder="检查内容"
        style={{ width: "200px", marginRight: "30px" }}
      />
      <Button
        onClick={query}
        type="primary"
        style={{ marginRight: "30px" }}
        icon={<SearchOutlined />}
      >
        确认上传
      </Button>
      <Button onClick={clean} type="dashed" icon={<CloseOutlined />}>
        重新输入
      </Button>
    </Fragment>
  );
};
export default App;
