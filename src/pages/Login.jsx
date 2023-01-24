import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../features/userSlice'

const LoginPage = () => {

     const [loginData, setLoginData] = useState({
          username:'',
          password:''
     });

     const [hasError, setHasError] = useState(false);

     const dispatch = useDispatch();

     const handleSubmit = (e) => {
          e.preventDefault()

          if (loginData.username && loginData.password) {
               dispatch(
                    login({
                         username: loginData.username,
                         password: loginData.password,
                         loggedIn: true
                    })
               )     
          }else{
               setHasError(true)
          }

          
     }
          
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
                                             // className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             //      fieldError.otherName === true
                                             //            " block border-red-400"
                                             //           : " border-blue-400"
                                             // } `}
                                             name="username"
                                             onChange={(e) =>
                                                  // (loginData.username = e.target.value)
                                                  setLoginData({
                                                       ...loginData, // copy the old data
                                                       username: e.target.value // but override the value for the username
                                                  })
                                             }
                                             // onChange={(e) =>
                                             //      (loginData.username = e.target.value)
                                             // }

                                        />
                                        {/* <span
                                             className={`${
                                                  fieldError.otherName
                                                       ? "block text-red-600"
                                                       : "hidden"
                                             }`}
                                        >
                                             {error}
                                        </span> */}
                                   </div>
                                   <div>
                                        <label className="text-md">Password</label>
                                        <input
                                             type="password"
                                             className="p-2 w-full mx-auto border-2 rounded-lg border-blue-400"
                                             // className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             //      fieldError.otherName === true
                                             //            " block border-red-400"
                                             //           : " border-blue-400"
                                             // } `}
                                             name="password"
                                             
                                             onChange={(e) =>
                                                  setLoginData({
                                                       ...loginData, // copy the old data
                                                       password: e.target.value // but override the value for the username
                                                  })
                                             }
                                             // onChange={(e) =>
                                             //      (loginData.password = e.target.value)
                                             // }

                                        />
                                        {/* <span
                                             className={`${
                                                  fieldError.otherName
                                                       ? "block text-red-600"
                                                       : "hidden"
                                             }`}
                                        >
                                             {error}
                                        </span> */}
                                   </div>
                                   {
                                        hasError && 
                                             <p className="text-red-500 my-5">Please fill all field before submitting</p>
                                   }
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