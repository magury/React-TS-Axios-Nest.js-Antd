import React, {Fragment} from "react";
import {Divider, Typography} from "antd";
import {useLoaderData, useLocation} from "react-router-dom";

const {Title, Paragraph, Text, Link} = Typography;
const App: React.FC = () => {
    const {state} = useLocation()
    return <Fragment>
        <Typography>
            <Title>
                <Text mark>{state.title}</Text>
            </Title>
            {
                state.paragraph.map((item: any, index: number) => (
                    <Paragraph copyable className={"text-left text-emerald-700"} editable={false} key={item}
                               children={item}
                               code={true}/>
                ))
            }
            <Divider/>
        </Typography>
    </Fragment>
}

export default App;
