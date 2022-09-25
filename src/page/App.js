import React, { useEffect, useState, useContext } from "react";
import { publicRoutes, AuthenticationRoutes } from "../route/route";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { AuthContext } from "../state/Auth";
import { actionType } from "../state/Authreducer";
function App() {
  const [IsUser, setIsUser] = useState(localStorage.getItem("auth"));
  const [IsAdmin, setIsAdmin] = useState(localStorage.getItem("adminAuth"));
  // const [UserDataJson, setUserDataJson] = useState([]);
  const [user, dispatch] = useContext(AuthContext);

  const publicRoute = (route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        element={<route.component />}
        exact={route.exact}
      />
    );
  };
  useEffect(async () => {
    if (localStorage.getItem("auth")) {
      const data = await localStorage.getItem("auth");
      setIsUser(true);
      dispatch({
        type: actionType.SET_USER,
        user: JSON.parse(data),
      });
    }
    //if admin

    if (localStorage.getItem("adminAuth")) {
      const data = await localStorage.getItem("adminAuth");
      // console.log(localStorage.getItem("adminAuth"), "/////");
      // setUserDataJson(JSON.parse(localStorage.getItem("auth")));
      setIsAdmin(true);
      dispatch({
        type: actionType.SET_ADMIN,
        admin: JSON.parse(data),
      });
    }
  }, [localStorage.getItem("auth")]);
  // console.log(user.admin, "////////user");
  return (
    <div>
      {/* <button onClick={() => localStorage.clear()}>logoiut </button> */}
      <BrowserRouter>
        <Routes>
          {/* {IsUser || IsAdmin
            ? user &&
              (user.user || user.admin) &&
              publicRoutes.map((route, index) => publicRoute(route, index))
            : AuthenticationRoutes.map((route, index) =>
                publicRoute(route, index)
              )} */}

          {!IsUser
            ? publicRoutes.map((route, index) => publicRoute(route, index))
            : AuthenticationRoutes.map((route, index) =>
                publicRoute(route, index)
              )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
