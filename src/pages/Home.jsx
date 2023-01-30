import { useContext } from "react";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { AuthContext } from "../context/AuthContext";
// import { useDispatch, useSelector } from "react-redux";
// import { logout, selectUser } from '../features/userSlice'


const Home = () => {
     const error = "Input should be at least 3 characters";
     const requiredError = "Please make sure required fields are filled";

     const { user, logout } = useContext(AuthContext)
     const [hasError, setHasError] = useState(false);
     
     const [dataLoaded, setdataLoaded] = useState(false);
     

     const [showModal, setShowModal] = useState(false);
     
     const [fieldError, setFieldError] = useState({
          firstName: false,
          lastName: false,
          otherName: false,
          regionOrCity: false,
          address: false,
          jobTitle: false,
          disability: false,
          schoolAttended: false,
     });

     const [formData, setFormData] = useState([{
          firstName: "",
          lastName: "",
          otherName: "",
          gender: "",
          country: "",
          regionOrCity: "",
          dob: "",
          address: "",
          employed: "",
          jobTitle: "none",
          maritalStatus: "",
          disability: "",
          schoolAttended: [],
          profilePicture: {},
          additionalDocuments: [{}],
     }]);

     const [hasJob, setHasJob] = useState(false);
     const [jobType, setJobType] = useState();

     const [countries, setCountries] = useState();

     const [schoolAttended, setSchoolAttended] = useState([
          {
               school: "",
               start_date: "",
               end_date: "",
          },
     ]);

     const addSchool = () => {
          let newSchool = { school: "", start_date: "", end_date: "" };

          setSchoolAttended([...schoolAttended, newSchool]);
     };

     const removeSchool = (index) => {
          let data = [...schoolAttended];
          data.splice(index, 1);
          setSchoolAttended(data);
     };

     const handleFormChange = (index, e) => {
          let data = [...schoolAttended];
          data[index][e.target.name] = e.target.value;
          setSchoolAttended(data);
     }

     useEffect(() => {
          fetch("https://restcountries.com/v2/all")
               .then((response) => response.json())
               .then((data) => {
                    setCountries(data);
                    console.log(data);
               });
     }, []);

     // check if the length of text fields are more than 3 digits
     const handleTooShort = (e) => {
          e.preventDefault();

          if (e.target.value.length < 3) {
               for (const key in fieldError) {
                    if (key === e.target.name) {
                         // fieldError[key] = true;
                         setFieldError({...fieldError, [key]: true})
                    }
               }

          } else {
               for (const key in fieldError) {
                    if (key === e.target.name) {
                         setFieldError({...fieldError, [key]: false})

                    }
               }
          }
     };


     // check of the employment field is true or false and 
     //render conditionally the next for field
     const handleEmployment = (e) => {
          e.preventDefault();

          if (e.target.value === "yes") {
               setHasJob(true);
               formData[0].employed = e.target.value;
          } else {
               setHasJob(false);
               formData[0].employed = e.target.value;
          }
     };

     const handleJobType = (e) => {
          e.preventDefault();

          if (e.target.value === "other") {
               setJobType("other");
          } else {
               setJobType(e.target.value);
               formData[0].jobTitle = e.target.value;
          }
     };

     const headers = [
          { label: "First Name", key: "firstName" },
          { label: "Last Name", key: "lastName" },
          { label: "Other Name", key: "otherName" },
          { label: "Gender", key: "gender" },
          { label: "Country", key: "country" },
          { label: "Region/City", key: "regionOrCity" },
          { label: "Date of Birth", key: "dob" },
          { label: "Address", key: "address" },
          { label: "Employed", key: "employed" },
          { label: "Job Title", key: "jobTitle" },
          { label: "Marital Status", key: "maritalStatus" },
          { label: "Disability", key: "disability" },
          { label: "School Attended", key: "schoolAttended" },
          { label: "Profile Picture", key: "profilePicture" },
          { label: "Additional Documents", key: "additionalDocuments" },
     ];

     const handleSubmit = () => {
          // e.preventDefault();

          if (schoolAttended){
               if(schoolAttended[0].school!==null) {
                    formData[0].schoolAttended.push(schoolAttended);
               } 
          }

          if (formData[0].firstName && formData[0].lastName && 
               formData[0].gender && formData[0].country &&
               formData[0].regionOrCity && formData[0].dob &&
               formData[0].address && formData[0].employed && 
               formData[0].jobTitle && formData[0].maritalStatus
          ) {
               setShowModal(true)    
          }else{
               setHasError(true)
          }

          console.log(formData);
     };

     // const dispatch = useDispatch()

     const handleLogout= (e) => {
          e.preventDefault()
          // dispatch(logout())
          logout();
     }

     // const user = useSelector(selectUser)

     return (
          <>
               <div className="py-10 px-5">
                    <h1 className="text-3xl font-semibold text-center">
                         Simple KYC Form with CSV Data Storage
                    </h1>
                    <p className="text-center mt-3">Welcome <span className="font-semibold text-sky-700">{user ? user.username : "Error"}</span>. Please fill this KYC form with you details</p>
                    <button onClick={handleLogout} className="absolute right-10 top-10 py-2 px-5 bg-sky-700 text-white rounded-lg">Logout</button>


                    <div className="bg-slate-100 py-10 px-5 lg:px-10 lg:w-1/2 md:w-2/3 mx-auto mt-8 rounded-lg space-y-3">
                         <div className="lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0 space-y-3 ">
                              <div>
                                   <label className="text-lg">First Name <span className="text-red-600">*</span></label>
                                   <input
                                        type="text"
                                        className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             fieldError.firstName === true
                                                  ? " border-red-400"
                                                  : " border-blue-400"
                                        } `}
                                        name="firstName"
                                        onChange={(e) => 
                                             (formData[0].firstName = e.target.value)
                                        }
                                        onKeyUp={handleTooShort}

                                   />
                                   <span
                                        className={`${
                                             fieldError.firstName
                                                  ? "block text-red-600"
                                                  : "hidden"
                                        }`}
                                   >
                                        {error}
                                   </span>
                              </div>
                              <div>
                                   <label className="text-lg">Last Name <span className="text-red-600">*</span></label>
                                   <input
                                        type="text"
                                        className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             fieldError.lastName
                                                  ? " block border-red-400"
                                                  : " border-blue-400"
                                        }  `}
                                        name="lastName"
                                        onChange={(e) =>
                                             (formData[0].lastName = e.target.value)
                                        }
                                        onKeyUp={handleTooShort}
                                   />
                                   <span
                                        className={`${
                                             fieldError.lastName
                                                  ? "block text-red-600"
                                                  : "hidden"
                                        }`}
                                   >
                                        {error}
                                   </span>
                              </div>
                         </div>
                         <div>
                              <label className="text-lg">Other Names</label>
                              <input
                                   type="text"
                                   className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                        fieldError.otherName === true
                                             ? " block border-red-400"
                                             : " border-blue-400"
                                   } `}
                                   name="otherName"
                                   onChange={(e) =>
                                        (formData[0].otherName = e.target.value)
                                   }
                                   onKeyUp={handleTooShort}

                              />
                              <span
                                   className={`${
                                        fieldError.otherName
                                             ? "block text-red-600"
                                             : "hidden"
                                   }`}
                              >
                                   {error}
                              </span>
                         </div>
                         <div>
                              <label className="text-lg">Gender <span className="text-red-600">*</span></label>
                              <select
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg bg-white"
                                   onChange={(e) =>
                                        (formData[0].gender = e.target.value)
                                   }
                              >
                                   <option className="text-sm">Select Gender</option>
                                   <option className="text-sm">Male</option>
                                   <option className="text-sm">Female</option>
                              </select>
                         </div>
                         <div>
                              <label className="text-lg">Country <span className="text-red-600">*</span></label>
                              <select
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg bg-white"
                                   onChange={(e) =>
                                        (formData[0].country = e.target.value)
                                   }
                              >
                                   <option className="text-sm">Select Country</option>

                                   {countries ? (
                                        countries.map((country, index) => (
                                             <option className="text-sm" key={index} value={country.name}>
                                                  {country.name}
                                             </option>
                                        ))
                                   ) : (
                                        <option className="text-md">
                                             Loading...
                                        </option>
                                   )}
                                   {/* <option className="text-md">Male</option>
                                   <option className="text-md">Female</option> */}
                              </select>
                         </div>
                         {/* Conditionally render this form input */}
                         <div>
                              <label className="text-lg">Region/City <span className="text-red-600">*</span></label>
                              <input
                                   type="text"
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                   name="regionOrCity"
                                   onChange={(e) =>
                                        (formData[0].regionOrCity = e.target.value)
                                   }
                                   onKeyUp={handleTooShort}

                              />
                              <span
                                   className={`${
                                        fieldError.regionOrCity
                                             ? "block text-red-600"
                                             : "hidden"
                                   }`}
                              >
                                   {error}
                              </span>
                         </div>
                         {/* End of conditional rendering */}

                         <div>
                              <label className="text-lg">Date of birth <span className="text-red-600">*</span></label>
                              <input
                                   type="date"
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                   onChange={(e) => (formData[0].dob = e.target.value)}
                              />
                         </div>
                         <div>
                              <label className="text-lg">Address <span className="text-red-600">*</span></label>
                              <input
                                   type="text"
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                   name="address"
                                   onChange={(e) =>
                                        (formData[0].address = e.target.value)
                                   }
                                   onKeyUp={handleTooShort}
                              />
                              <span
                                   className={`${
                                        fieldError.address
                                             ? "block text-red-600"
                                             : "hidden"
                                   }`}
                              >
                                   {error}
                              </span>
                         </div>
                         <div>
                              <label className="text-lg">Profile Picture</label>
                              <input
                                   type="file"
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg bg-white"
                                   onChange={(e) =>
                                        (formData[0].profilePicture = e.target.value)
                                   }
                              />
                         </div>

                         <div>
                              <label className="text-lg">Employed? <span className="text-red-600">*</span></label>
                              <select
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg bg-white"
                                   onChange={handleEmployment}
                              >
                                   <option className="text-sm">Are You Employed?</option>
                                   <option className="text-sm" value={"no"}>
                                        No
                                   </option>
                                   <option className="text-sm" value={"yes"}>
                                        Yes
                                   </option>
                              </select>
                         </div>
                         {/* Conditionally render this form input */}
                         <div
                              className={`${
                                   hasJob ? "block" : "hidden"
                              } transition-all ease-in-out duration-500`}
                         >
                              <label className="text-lg">Job <span className="text-red-600">*</span></label>
                              <select
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg bg-white"
                                   onChange={handleJobType}
                              >
                                   <option className="text-sm">Select a Career</option>
                                   <option className="text-sm" value={"Doctor"}>
                                        Doctor
                                   </option>
                                   <option className="text-sm" value={"Nurse"}>
                                        Nurse
                                   </option>
                                   <option className="text-sm" value={"other"}>
                                        Other
                                   </option>
                              </select>
                         </div>
                         <div
                              className={`${
                                   hasJob && jobType === "other" ? "block" : "hidden"
                              } transition-all ease-in-out duration-300`}
                         >
                              <label className="text-lg">Other <span className="text-red-600">*</span></label>
                              <input
                                   type="text"
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                   name="jobTitle"
                                   onChange={(e) =>
                                        (formData[0].jobTitle = e.target.value)
                                   }
                                   onKeyUp={handleTooShort}
                              />
                              <span
                                   className={`${
                                        fieldError.jobTitle
                                             ? "block text-red-600"
                                             : "hidden"
                                   }`}
                              >
                                   {error}
                              </span>
                         </div>
                         {/* End of conditional rendering */}

                         <div>
                              <label className="text-lg">Marital Status <span className="text-red-600">*</span></label>
                              <select
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg bg-white"
                                   onChange={(e) =>
                                        (formData[0].maritalStatus = e.target.value)
                                   }
                              >
                                   <option className="text-sm">Select Marital Status</option>
                                   <option className="text-sm">Married</option>
                                   <option className="text-sm">
                                        Divorced/Separated/Widowed
                                   </option>
                                   <option className="text-sm">Never married</option>
                              </select>
                         </div>

                         <div>
                              <label className="text-lg">Disability</label>
                              <input
                                   type="text"
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                   name="disability"
                                   onChange={(e) =>
                                        (formData[0].disability = e.target.value)
                                   }
                                   onKeyUp={handleTooShort}
                              />
                              <span
                                   className={`${
                                        fieldError.disability
                                             ? "block text-red-600"
                                             : "hidden"
                                   }`}
                              >
                                   {error}
                              </span>
                         </div>

                         <div>
                              <h2 className="text-lg font-medium mt-5">
                                   Schools Attended
                              </h2>
                         </div>

                         {schoolAttended.map((school, index) => (
                              <div
                                   key={index}
                                   className="lg:grid lg:grid-cols-8 lg:gap-5 lg:space-y-0 space-y-3 bg-sky-200 p-3 mb-5 rounded-md"
                              >
                                   <div className="lg:col-span-3">
                                        <label className="text-lg">
                                             School Name
                                        </label>
                                        <input
                                             type="text"
                                             className={`p-3 w-full mx-auto border-2 border-blue-400 rounded-lg bg-white ${
                                                  fieldError.schoolAttended === true
                                                       ? " border-red-400"
                                                       : " border-blue-400"
                                             } `}
                                             name="schoolAttended"
                                             onChange={e => handleFormChange(index, e)}
                                             onKeyUp={handleTooShort}

                                        />
                                        <span
                                             className={`${
                                                  fieldError.schoolAttended
                                                       ? "block text-red-600"
                                                       : "hidden"
                                             }`}
                                        >
                                             {error}
                                        </span>
                                        
                                   </div>
                                   <div className="lg:col-span-2">
                                        <label className="text-lg">Start date</label>
                                        <input
                                             type="date"
                                             className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                             onChange={e => handleFormChange(index, e)}
                                        />
                                   </div>
                                   <div className="lg:col-span-2">
                                        <label className="text-lg">End date</label>
                                        <input
                                             type="date"
                                             className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                             onChange={e => handleFormChange(index, e)}
                                        />
                                   </div>
                                   <div className="lg:col-span-1">
                                        <label className="lg:invisible hidden lg:block">
                                             Remove{" "}
                                        </label>
                                        <button
                                             className="hidden lg:w-5 lg:h-5 bg-red-500 lg:p-3 lg:mx-auto lg:my-5 lg:rounded-full lg:flex lg:items-center lg:justify-center text-white font-semibold text-lg"
                                             onClick={() => removeSchool(index)}
                                        >
                                             -
                                        </button>
                                        <button
                                             className="lg:hidden p-2 bg-red-500 rounded-lg flex items-center justify-center text-white font-normal"
                                             onClick={() => removeSchool(index)}
                                        >
                                             Remove
                                        </button>
                                   </div>
                              </div>
                         ))}

                         <div className="pt-3">
                              <span>
                                   {" "}
                                   <strong>NB: </strong> If no school, please remove
                                   form
                              </span>
                         </div>
                         <div>
                              <button
                                   className="py-3 px-8 mx-auto border-2 rounded-lg bg-sky-600 text-white"
                                   onClick={addSchool}
                              >
                                   Add another school
                              </button>
                         </div>

                         <div>
                              <label className="text-lg">
                                   Additional documents
                                   <span className="text-xs lg:text-sm">
                                        (could include birth certifcate and other
                                        relevant IDs)
                                   </span>
                              </label>
                              <input
                                   type="file"
                                   className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg bg-white"
                                   multiple
                                   onChange={(e) =>
                                        (formData[0].additionalDocuments =
                                             e.target.value)
                                   }
                              />
                              <div className="pt-3">
                                   <span className="text-sm">
                                        {" "}
                                        <strong>NB: </strong> You can select multiple
                                        files. Please do well to select all before
                                        closing the pop-up window
                                   </span>
                              </div>
                         </div>

                         <div>
                              <button
                                   className="py-3 px-8 mx-auto mt-10 border-2 rounded-lg bg-sky-600 text-white"
                                   onClick={handleSubmit}
                              >
                                   Submit
                              </button>
                         </div>
                         {
                              hasError &&
                              <div className="mt-3">
                                   <span className="text-red-600 mt-3">{requiredError}</span>
                              </div>
                         }
                    </div>
                    
               </div>


               {
                    showModal &&
                    <div className="flex bg-[#0000008b] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                         <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              <div className="border-2 border-sky-600 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                   <div className="flex items-start justify-between py-5 px-20 border-b border-solid border-sky-300 rounded-t ">
                                        <h3 className="text-xl font-semibold">
                                             Save form data in csv?
                                        </h3>
                                        
                                   </div>

                                   <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                             className="text-sky-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                             type="button"
                                             onClick={() => setShowModal(false)}
                                        >
                                             Close
                                        </button>
                                        <CSVLink
                                             filename={formData[0].firstName.toLowerCase()+'_'+formData[0].lastName.toLowerCase()+'.csv'}
                                             headers={headers}
                                             data={formData}
                                             className="text-white bg-sky-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        >
                                             Yes, save
                                        </CSVLink>
                                       
                                   </div>
                              </div>
                         </div>
                    </div>
               }
          </>
     );
};

export default Home;
