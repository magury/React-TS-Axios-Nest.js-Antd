import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

const App: React.FC = () => {
    const navigate = useNavigate();
    let {state} = useLocation()
    const showDepart = (_value: string) => {
        state.depart.map((item: Depart) => {
            let res = item.content.filter((item: Content) => item.key == _value)[0]
            navigate("/detail/introduce", {
                state: {
                    ...res
                }
            })
        })
        // navigate("/detail/introduce", {
        //     state: {}
        // });
    };
    return (
        <div className="depart">
            {state.depart.map((item: Depart, index: number) => {
                return (
                    <div className="item" key={item.title}>
                        <span children={item.title}/>
                        <div className="flex">
                            {item.content.map((item: Content, index: number) => {
                                return (
                                    <span children={item.key} key={item.key} onClick={() => showDepart(item.key)}/>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default App;
