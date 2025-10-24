/*
  Author : Goli Bi Bale

  App Name : E-commerce with React.Js
  Created At : 24/10/2025 16:06:25
*/
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthState } from "../../redux/selectors/selectors";
import { setItem } from "../../services/localStorage.service";

const PrivatRoute = ({ children }: any) => {
  let isAuth = useSelector(getAuthState);
  const location = useLocation();

  if (!isAuth) {
    // const { token, userId } = JSON.parse(auth);
    // let auth: any = localStorage.getItem("auth");
    // isAuth = !!token && !!userId;
    console.log("chemin:" + location.pathname);
    setItem("pathname", location.pathname);
  }

  return isAuth ? children : <Navigate replace to="/login" />;
};

export default PrivatRoute;
