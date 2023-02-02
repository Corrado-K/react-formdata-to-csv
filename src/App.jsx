import "./App.css";

// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { redirect, useNavigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";
// import Router from "./routes/routes";
// import { useSelector } from "react-redux";
// import { selectUser } from "./features/userSlice";




function App() {

     const { user} = useContext(AuthContext) 
     const element = useRoutes([
          {
               path: "/",
               element: <Home />,
          },
          {
               index: true,
               path: "/login",
               element: <LoginPage />,
          },   
     ])
     // const navigate = useNavigate()

     // useEffect(() => {
     //      if (user){
     //           navigate("/");
     //      } 
     // }, []);
     
     console.log(user);

     return (
          <div>
               {element}
          </div>
          // routes
     );
}

export default App;
