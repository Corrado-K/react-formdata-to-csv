import "./App.css";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function App() {

     const user = useSelector(selectUser)

     let routes = useRoutes([
          {
               path: '/',
               element: <LoginPage />
          },
          {
               path: '/home',
               element: <LoginPage />
          },
     ])

     return (
          // <div>
          //      <Router>
          //           <Routes>
          //                <Route path='/' element={user?<Home /> : <LoginPage />} />
          //           </Routes>
          //      </Router>
          // </div>
          routes
     );
}

export default App;
