import React, { useState } from 'react';
import { Layout, Flex, Menu, MenuProps } from 'antd';
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#ffffff',
};
const items: MenuProps['items'] = [
    {
        label: '添加医院信息',
        key: 'mail',
    },
    {
        label: '医生信息',
        key: 'default'
    },
    {
        label: '错误信息反馈',
        key: 'preliminary'
    },
    {
        label: '评论管理',
        key: 'SubMenu',
        children: [
            {
                type: 'group',
                label: '医生',
                children: [
                    {
                        label: '文章管理',
                        key: 'setting:1',
                    },
                ],
            },
            {
                type: 'group',
                label: '患者',
                children: [
                    {
                        label: '发帖管理',
                        key: 'setting:3',
                    },
                ],
            },
        ],
    },
];
const App: React.FC = () => {
    const navigate = useNavigate()
    const [current, setCurrent] = useState<admin.Current>('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e.keyPath[0]);
        switch (e.keyPath[0]) {
            case 'mail':
                navigate('/admin/create')
                break
            case 'default':
                navigate('/admin/default')
                break
            case 'setting:1':
                navigate('/admin/essay-manager')
                break
            case 'setting:3':
                navigate('/detail/experience/recommend')
                break
            case 'preliminary':
                navigate('/admin/preliminary')
                break
        }
        setCurrent(e.key);
    };
    return (
        <Flex gap="middle" wrap="wrap">
            <Layout className={'border-r-8 overflow-hidden w-[100%] '}>
                <Layout.Header
                    className={'bg-white text-center text-[#fff] h-[64px] ps-[48px] pe-[48px] leading-[64px]'}>
                </Layout.Header>
                <Layout>
                    <Sider width="25%" style={siderStyle}>
                        <Menu className={'bg-transparent text-center flex flex-col justify-center '} onClick={onClick}
                            selectedKeys={[current]} mode="inline" items={items} />
                    </Sider>
                    <Layout.Content style={{ backgroundColor: 'white' }}
                        className={'text-center min-h-[120px] leading-1[120px] text-[#fff] bg-[#0958d9]'}>
                        <Outlet />
                    </Layout.Content>
                </Layout>
            </Layout>
        </Flex>
    )
}

export default App;