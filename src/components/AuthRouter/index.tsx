import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { Navigate, useLocation, redirect, useNavigate } from "react-router-dom";

type IProps = {
  children: ReactNode;
};
const App: React.FC<IProps> = ({ children }) => {
  const location = useLocation();
  const user = useAppSelector((state) => state.login.doth);
  if (location.pathname.includes("patient")) {
    if (user.userId) return <>{children}</>;
    else return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
export default App;
