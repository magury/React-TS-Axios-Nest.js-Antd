import React from "react";
import { useNavigate } from "react-router-dom";
const App: React.FC = () => {
  const navigate = useNavigate();
  const showDepart = (_value: string) => {
    navigate("/detail/introduce");
  };
  return (
    <div className="depart">
      {[1, 2, 3, 4, 5].map((item, index) => {
        return (
          <div className="item" key={index}>
            <span>手术科室</span>
            <div className="flex">
              {[1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1].map((item, index) => {
                return (
                  <span key={index} onClick={() => showDepart("关节外科")}>
                    关节外科
                  </span>
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
