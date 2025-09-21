import React from 'react';
import {Alert, Flex, Skeleton, Spin} from 'antd';

const App: React.FC = () => (
    <Flex gap="small" vertical>
            <Spin className={'mt-[100px]'} tip="Loading" size="large">
                <Skeleton active />;
            </Spin>
    </Flex>
);

export default App;