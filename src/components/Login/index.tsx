import React, { Fragment } from "react";
import { Button, Card, Checkbox, Form, Input, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Fragment>
      <div className="bg">
        <Space direction="vertical" size={16}>
          <Card
            title="欢迎登录"
            extra={<a href="#">游客登录</a>}
            style={{
              width: 500,
              marginLeft: 100,
              marginTop: 200,
              height: 350,
              border: "1px solid black",
              boxShadow: "5px 5px 5px black",
            }}
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </div>
    </Fragment>
  );
};

export default App;
