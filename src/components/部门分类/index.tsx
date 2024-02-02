import React, {Fragment} from "react";
import {useLoaderData, useLocation, useNavigate} from "react-router-dom";
import {Card, ConfigProvider} from "antd";
import {depart} from "@/utility/new.type";

const App: React.FC = () => {
    const navigate = useNavigate();
    const data=useLoaderData() as {depart:depart.depart[]}
    const showDepart = (_value: string) => {
        data.depart.map((item: depart.depart) => {
            let res = item.content.filter((item: depart.content) => item.key == _value)[0]
            navigate(`/detail/introduce/${_value}`, {
                state: {
                    ...res
                }
            })
        })
    };
    return (
        <ConfigProvider theme={{
            components: {
                Card: {
                    actionsBg: '#eeeeff'
                }
            }
        }}>
            {
                data.depart.map((item: depart.depart) => (
                    <Card className={'text-left border-0 select-none cursor-pointer'} key={item.title} title={item.title}>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        {
                            item.content.map((item: Content) => (
                                <Card.Grid
                                    style={{
                                        width: '25%',
                                        borderLeft: '1px solid rgb(134 239 172)',
                                        borderRight: '1px solid rgb(253 230 138)',
                                        borderTop: '1px solid rgb(191 219 254)',
                                        borderBottom: '1px solid rgb(251 207 232)'
                                    }}
                                    className={'text-center border-2 border-orange-500 border-solid mr-5'}
                                    children={item.key}
                                    key={item.key}
                                    hoverable={true}
                                    onClick={() => showDepart(item.key)}/>

                            ))
                        }
                    </Card>
                ))
            }
        </ConfigProvider>
    );
};
export default App;
