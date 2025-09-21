import {useRoutes} from "react-router-dom";
import root from "./routes/root";
import "./assets/css/App.scss";
import './assets/css/bootstrap-grid.min.css'
import {ConfigProvider} from "antd";
import {useEffect} from "react";

function App() {
    const element = useRoutes(root);
    return (
        <ConfigProvider
            theme={{
                components: {
                    a: {
                        colorText: "#1677ff",
                    },
                },
            }}
        >
            <div className="App">{element}</div>
        </ConfigProvider>
    );
}

export default App;
