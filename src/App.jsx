import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
// import { useSelector } from "react-redux";
// import { selectUser } from "./features/userSlice";

function App() {

     const { user} = useContext(AuthContext)

     return (
          <div>
               <Router>
                    <Routes>
                         <Route path='/' element={user ? <Home /> : <LoginPage />} />
                    </Routes>
               </Router>
          </div>
          // routes
     );
}

export default App;
