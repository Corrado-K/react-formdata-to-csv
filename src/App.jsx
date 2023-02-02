import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import HomeForm from "./pages/HomeForm";
// import { useSelector } from "react-redux";
// import { selectUser } from "./features/userSlice";

function App() {

     const { user} = useContext(AuthContext)

     return (
          <div>
               <Router>
                    <Routes>
                         <Route path='/' element={user ? <HomeForm /> : <LoginPage />} /> {/* This uses formik, yup and context */}
                         <Route path='/home' element={<Home />} /> {/* This route uses contains the form without formik and yup */}
                         
                    </Routes>
               </Router>
          </div>
          // routes
     );
}

export default App;
