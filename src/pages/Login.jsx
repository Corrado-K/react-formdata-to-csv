import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

     const { login, user } = useContext(AuthContext)

     const [loginData, setLoginData] = useState({
          username:"",
          password:""
     })

     const navigate = useNavigate()

     const handleSubmit = (e) => {
          e.preventDefault()
          
          login(loginData)
     }

     useEffect(() => {
          if (user) {
               navigate("/");
          }
     }, []);

     // console.log(user);
     // console.log(JSON.parse(localStorage.getItem('user')));

    
          
     return ( 
          <div className="w-screen h-screen grid grid-cols-2">
               <div className="bg-sky-800 bg-techy flex items-center justify-center">
                    {/* <h1 className="text-4xl font-semibold text-white">KYC FORM</h1> */}
               </div>
               <div className="flex items-center justify-center relative">
                    <div className="block w-[50%]">
                         <h2 className="text-2xl font-medium">Login</h2>
                         <h4 className="text-sm font-medium text-sky-700">Please log in to access the KYC form</h4>
                         <div className="mt-12">
                              <form onSubmit={(e) => handleSubmit(e)}>
                                   <div className="mb-5">
                                        <label className="text-md">Username</label>
                                        <input
                                             type="text"
                                             className="p-2 w-full mx-auto border-2 rounded-lg border-blue-400"
                                             
                                             name="username"
                                             onChange={(e) =>
                                                  setLoginData({
                                                       ...loginData, // copy the old data
                                                       username: e.target.value // but override the value for the username
                                                  })
                                             }

                                        />
                                        
                                   </div>
                                   <div>
                                        <label className="text-md">Password</label>
                                        <input
                                             type="password"
                                             className="p-2 w-full mx-auto border-2 rounded-lg border-blue-400"
                                             name="password"
                                             
                                             onChange={(e) =>
                                                  setLoginData({
                                                       ...loginData, // copy the old data
                                                       password: e.target.value // but override the value for the username
                                                  })
                                             }

                                        />
                                   </div>
                                   
                                   <div className="my-16 w-full flex justify-center items-center">
                                        <button type="submit" className="bg-sky-600 px-10 py-3 w-full mx-auto border-2 rounded-lg text-white">Login</button>
                                   </div>
                              </form>
                         </div>

                    </div>
                    {/* <div className="w-[45%]"></div> */}
                    <div className="absolute ml-[25%] w-[50%] left-0 bottom-3">
                         <p className="text-left text-xs font-light text-gray-500"> &copy; Created by Kebede ⭐❄️</p>
                    </div>

               </div>
          </div>
     );
}
 
export default LoginPage;