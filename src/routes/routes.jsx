import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// lazy import elements
// const HOME_PAGE = lazy(() => import("../pages/Home"));
// const LOGIN_PAGE = lazy(() => import("../pages/Login"));
import LoginPage from '../pages/Login';
import Home from '../pages/Home';

export default function Router() {
     const element = useRoutes([
          {
               path: "/",
               element: <LoginPage />,
          },
          {
               path: "/home",
               element: <Home />,
          },
          {
               path: "*",
               element: <Navigate to="/" />,
          },
     ]);
     return element
}
