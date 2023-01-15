import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function App() {

     const user = useSelector(selectUser)

     return (
          <div>
               <Router>
                    <Routes>
                         <Route index element={user?<Home /> : <LoginPage />} />
                         {
                              // user.loggedIn ?
                              // <Route path='/home' element={<Home />} />
                              // :
                              // <Route index element={<LoginPage />} /> 
                              
                         }
                    </Routes>
               </Router>
               {/* {user ? <Home /> : <LoginPage />} */}
          </div>
     );
}

export default App;
