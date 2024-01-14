import React, { Fragment, useEffect, useRef } from "react";
import { Button, Card, Checkbox, Form, Input, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { http } from "../../utils/http";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setAvatar, setUser } from "../../features/login/loginSlice";
import { useDispatch } from "react-redux";
const App: React.FC = () => {
  const dispatch = useDispatch()
  // 导航
  const navigate = useNavigate();
  const user: any = useRef(null);
  const password: any = useRef(null);
  const onFinish = (values: any) => { };
  async function login() {
    const param = {
      username: user.current.input.value,
      password: password.current.input.value,
    }
    if (
      param.username.trim() == "" ||
      param.password.trim() == ""
    )
      return undefined;
    const res = await http.request({
      url: "/login",
      params: {
        username: user.current.input.value,
        password: password.current.input.value,
      },
    });
    if (res.data.code == 200) {
      dispatch(setUser({ ...param }))
      dispatch(setAvatar(res.data.data.url))
      navigate("/patient");
    }
  }
  function register() {
    if (
      user.current.input.value.trim() == "" ||
      password.current.input.value == ""
    )
      return undefined;
    http.request({
      url: "/register",
      params: {
        username: user.current.input.value,
        password: password.current.input.value,
      },
    });
  }
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
                  ref={user}
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
                  ref={password}
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
                  onClick={login}
                >
                  Log in
                </Button>
                Or
                <a href="javascript: void(0)" onClick={register}>
                  register now!
                </a>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </div>
    </Fragment>
  );
};

export default App;
