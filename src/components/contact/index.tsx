import React, { Fragment, useState } from 'react';
import { Flex, QRCode, Space, Tag, Timeline, theme } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { useToken } = theme;
const App: React.FC = () => {
    const { token } = useToken();
    const [status, setStatus] = useState<any>('active')
    const click = async () => {
        setStatus('loading')
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(setStatus('active'))
            }, 1000)
        })
    }
    return (
        <Fragment>
            <Flex className={'mt-[10px] '} justify={'center'} align={'center'} vertical={false}>
                <Timeline
                    className='w-[50%] hidden lg:block'
                    mode="alternate"
                    items={[
                        {
                            children: '如有问题，请扫码与我们取得联系',
                        },
                        {
                            children: '请务必仔细提交问题内容，以确保工作人员能够快速解决',
                            color: 'green',
                        },
                        {
                            dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                            children: `工作人员收到反馈后，会立即进行修补`,
                        },
                        {
                            color: 'red',
                            children: '大约在3个工作日后，我们会处理好您提出的问题',
                        },
                        {
                            children: '如果在使用过程中有什么好的建议，也可以与我们联系',
                        },
                        {
                            dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                            children: '祝您网站使用愉快！',
                        },
                    ]}
                />
                <Space className='ml-[10%]'>
                    <QRCode status={status} value="about:blank" bgColor={token.colorBgLayout} color={token.colorSuccessText} size={400} />
                </Space>
            </Flex>

        </Fragment>
    );
};

export default App;