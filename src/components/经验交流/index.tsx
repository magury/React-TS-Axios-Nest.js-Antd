import React, {CSSProperties, Fragment, useState} from "react";
import {Menu, MenuProps} from "antd";
import {Outlet, useNavigate} from "react-router-dom";

const items: MenuProps['items'] =
    [
        {label: '推荐', key: 'recommend',},
        {label: '热搜', key: 'hot',},
        {label: '提问', key: 'enquire'},
        {label: "联系我们", key: 'contact',},
    ];
const centerStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'end',
    paddingRight:100
};
const App: React.FC = () => {
    // 三级路由
    const navigate = useNavigate()
    const [current, setCurrent] = useState('recommend');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e.key);
        switch (e.key) {
            case 'recommend':
                navigate('recommend');
                break
            case 'hot':
                navigate('hot');
                break
            case 'enquire':
                navigate('enquire');
                break
            case 'contact':
                navigate('contact');
                break
        }
        setCurrent(e.key);
    };
    return (
        <Fragment>
            <Menu style={centerStyle} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}>
            </Menu>
            <Outlet/>
        </Fragment>
    );
};
export default App;
