import React, {Fragment, useState} from 'react';
import {Badge, Button, Input} from 'antd';
import {AliwangwangOutlined, GithubOutlined, SlackOutlined} from "@ant-design/icons";

const {TextArea} = Input;

const App: React.FC = () => {
    const [value, setValue] = useState(false);

    return (
        <Fragment>
            <Button onClick={() => setValue(!value)}>你好</Button>
            {value && <Fragment><h1 className={'text-amber-600'}>ss</h1><h1 className={'text-amber-600'}>ss</h1></Fragment>}
        </Fragment>
    );
};

export default App;