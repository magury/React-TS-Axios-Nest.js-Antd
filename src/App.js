import { useRoutes } from "react-router-dom";
import root from "./routes/root";
import "./App.scss";
function App() {
  const element = useRoutes(root);
  return <div className="App">{element}</div>;
}

export default App;
