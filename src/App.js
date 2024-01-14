import { useRoutes } from "react-router-dom";
import root from "./routes/root";
import "./App.scss";
import { ConfigProvider } from "antd";
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
