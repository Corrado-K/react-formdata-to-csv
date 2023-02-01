import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";

const HomeForm = () => {
     // Context for user data and logout function
     const { user, logout } = useContext(AuthContext);

     // States
     const [countries, setCountries] = useState();
     const [schoolAttended, setSchoolAttended] = useState([]);
     const [otherJob, setOtherJob] = useState(false);

     // Useeffect hook to get countries data from api
     useEffect(() => {
          fetch("https://restcountries.com/v2/all")
               .then((response) => response.json())
               .then((data) => {
                    setCountries(data);
                    console.log("Data retrieved");
               });

          if(formik.values.employed === 'no') {
               formik.values.jobTitle = ''
               setOtherJob(false)
          }
          console.log(otherJob);
     }, []);

     // Formik hook
     const formik = useFormik({
          initialValues: {
               firstName: "",
               lastName: "",
               otherName: '',
               gender: '',
               country: '',
               regionOrCity: '',
               dob: '',
               address: "",
               employed: "",
               jobTitle: "",
               maritalStatus: "",
               disability: "",
               schoolAttended: [],
               profilePicture: '',
               additionalDocuments: [],
          },
          onSubmit: (values) => {
               alert(JSON.stringify(values, null, 2));
          },
     });

     // Helper Functions
     const handleLogout = (e) => {
          e.preventDefault();
          logout();
     };

     const addSchool = (e) => {
          e.preventDefault();
          let newSchool = { school: "", start_date: "", end_date: "" };

          setSchoolAttended([...schoolAttended, newSchool]);
     };

     const removeSchool = (index) => {
          let data = [...schoolAttended];
          data.splice(index, 1);
          setSchoolAttended(data);
     };

     return (
          <>
               <div className="py-10 px-5">
                    <h1 className="text-3xl font-semibold text-center">
                         Simple KYC Form with CSV Data Storage
                    </h1>
                    <p className="text-center mt-3">
                         Welcome{" "}
                         <span className="font-semibold text-sky-700">
                              {user ? user.username : "Error"}
                         </span>
                         . Please fill this KYC form with you details
                    </p>
                    <button
                         onClick={handleLogout}
                         className="absolute right-10 top-10 py-2 px-5 bg-sky-700 text-white rounded-lg"
                    >
                         Logout
                    </button>

                    <div className="bg-slate-100 py-10 px-5 lg:px-10 lg:w-1/2 md:w-2/3 mx-auto mt-8 rounded-lg">
                         <form onSubmit={formik.handleSubmit} className="space-y-3">
                              <div className="lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0 space-y-3 ">
                                   {/* First name */}
                                   <div>
                                        <label className="text-lg">
                                             First Name
                                        </label>
                                        <input
                                             type="text"
                                             className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                                  formik.touched.firstName &&
                                                  formik.errors.firstName
                                                       ? "border-red-400"
                                                       : "border-blue-400"
                                             }`}
                                             name="firstName"
                                             onChange={formik.handleChange}
                                             onBlur={formik.handleBlur}
                                             value={formik.values.firstName}
                                        />
                                        {formik.touched.firstName &&
                                             formik.errors.firstName && (
                                                  <span className="text-red-400">
                                                       {formik.errors.firstName}
                                                  </span>
                                             )}
                                   </div>
                                   {/* Last name */}
                                   <div>
                                        <label className="text-lg">
                                             Last Name
                                        </label>
                                        <input
                                             type="text"
                                             className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                                  formik.touched.lastName &&
                                                  formik.errors.lastName
                                                       ? "border-red-400"
                                                       : "border-blue-400"
                                             }`}
                                             name="lastName"
                                             onChange={formik.handleChange}
                                             onBlur={formik.handleBlur}
                                             value={formik.values.lastName}
                                        />
                                        {formik.touched.lastName &&
                                             formik.errors.lastName && (
                                                  <span className="text-red-400">
                                                       {formik.errors.lastName}
                                                  </span>
                                             )}
                                   </div>
                              </div>

                              <div>
                                   <label className="text-lg">
                                        Other Names
                                   </label>
                                   <input
                                        type="text"
                                        className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             formik.touched.otherName &&
                                             formik.errors.otherName
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="otherName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.otherName}
                                        
                                   />
                                   
                              </div>
                              <div>
                                   <label className="text-lg">
                                        Gender
                                   </label>
                                   <select
                                        className={`p-3 w-full mx-auto border-2 rounded-lg bg-white ${
                                             formik.touched.gender &&
                                             formik.errors.gender
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="gender"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gender}    
                                   >
                                        <option className="text-sm" value={'male'}>
                                             Male
                                        </option>
                                        <option className="text-sm" value={'female'}>
                                             Female
                                        </option>
                                   </select>
                              </div>
                              <div>
                                   <label className="text-lg">
                                        Country
                                   </label>
                                   <select
                                        className={`p-3 w-full mx-auto border-2 rounded-lg bg-white ${
                                             formik.touched.country &&
                                             formik.errors.country
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="country"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.country}
                                   >
                                        {countries ? (
                                             countries.map((country, index) => (
                                                  <option
                                                       className="text-sm"
                                                       key={index}
                                                       value={country.name}
                                                  >
                                                       {country.name}
                                                  </option>
                                             ))
                                        ) : (
                                             <option className="text-md">
                                                  Loading...
                                             </option>
                                        )}
                                   </select>
                              </div>
                              <div>
                                   <label className="text-lg">Region/City</label>
                                   <input
                                        type="text"
                                        className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             formik.touched.regionOrCity &&
                                             formik.errors.regionOrCity
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="regionOrCity"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.regionOrCity}
                                   />
                                   
                              </div>

                              <div>
                                   <label className="text-lg">Date of birth <span className="text-red-600">*</span></label>
                                   <input
                                        type="date"
                                        className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                        name="dob"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.dob}
                                   />
                              </div>
                              <div>
                                   <label className="text-lg">Address <span className="text-red-600">*</span></label>
                                   <input
                                        type="text"
                                        className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                        name="address"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.address}
                                   />
                              </div>
                              <div>
                                   <label className="text-lg">Profile Picture</label>
                                   <input
                                        type="file"
                                        className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg bg-white"
                                        name="profilePicture"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.profilePicture}
                                   />
                              </div>

                              <div>
                                   <label className="text-lg">Employed? <span className="text-red-600">*</span></label>
                                   <select
                                        className={`p-3 w-full mx-auto border-2 rounded-lg bg-white ${
                                             formik.touched.employed &&
                                             formik.errors.employed
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="employed"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.employed}
                                   >
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
                                        formik.values.employed === 'yes' ? "block" : "hidden"
                                   } transition-all ease-in-out duration-500`}
                              >
                                   <label className="text-lg">Job <span className="text-red-600">*</span></label>
                                   <select
                                        className={`p-3 w-full mx-auto border-2 rounded-lg bg-white ${
                                             formik.touched.otherName &&
                                             formik.errors.otherName
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="jobTitle"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.employed === 'yes' && formik.values.jobTitle}
                                   >
                                        <option className="text-sm" value={"Doctor"} onClick={()=> {
                                             setOtherJob(false)
                                             console.log(otherJob);
                                        }}>
                                             Doctor
                                        </option>
                                        <option className="text-sm" value={"Nurse"} onClick={()=> {
                                             setOtherJob(false)
                                             console.log(otherJob);
                                        }}>
                                             Nurse
                                        </option>
                                        <option className="text-sm" value={''} onClick={()=> {
                                             setOtherJob(true)
                                             console.log(otherJob);
                                        }}>
                                             Other
                                        </option>
                                   </select>
                              </div>

                              {/* There's an issue with this that you have to check */}
                              <div
                                   className={`${
                                        otherJob ? "block" : "hidden"
                                   } transition-all ease-in-out duration-300`}
                              >
                                   <label className="text-lg">Other <span className="text-red-600">*</span></label>
                                   <input
                                        type="text"
                                        className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             formik.touched.jobTitle &&
                                             formik.errors.jobTitle
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="jobTitle"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.jobTitle}
                                   />
                              </div>
                              {/* End of conditional rendering */}

                              <div>
                                   <label className="text-lg">Marital Status <span className="text-red-600">*</span></label>
                                   <select
                                        className={`p-3 w-full mx-auto border-2 rounded-lg bg-white ${
                                             formik.touched.maritalStatus &&
                                             formik.errors.maritalStatus
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="maritalStatus"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.maritalStatus}
                                        
                                   >
                                        <option className="text-sm" value={'Married'}>Married</option>
                                        <option className="text-sm" value={'Divorced/Separated/Widowed'}>
                                             Divorced/Separated/Widowed
                                        </option>
                                        <option className="text-sm" value={'Never married'}>Never married</option>
                                   </select>
                              </div>

                              <div>
                                   <label className="text-lg">Disability</label>
                                   <input
                                        type="text"
                                        className={`p-3 w-full mx-auto border-2 rounded-lg bg-white ${
                                             formik.touched.disability &&
                                             formik.errors.disability
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="disability"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.disability}
                                   />
                              </div>

                              <div>
                                   <h2 className="text-lg font-medium mt-5">
                                        Schools Attended
                                   </h2>
                              </div>

                              {/*  */}
                              <div
                                   className="lg:grid lg:grid-cols-8 lg:gap-5 lg:space-y-0 space-y-3 bg-sky-200 px-3 py-5 mb-5 rounded-md"
                              >
                                   {
                                        // schoolAttended.length > 0 ? 
                                        // schoolAttended.map((school, index) => (
                                        //      <Fragment key={index}>
                                        //           <div className="lg:col-span-3">
                                        //                <label className="text-lg">
                                        //                     School Name
                                        //                </label>
                                        //                <input
                                        //                     type="text"                    
                                        //                     className={`p-3 w-full mx-auto border-2 rounded-lg bg-white ${
                                        //                          formik.touched.schoolAttended &&
                                        //                          formik.errors.schoolAttended
                                        //                               ? "border-red-400"
                                        //                               : "border-blue-400"
                                        //                     }`}
                                        //                     name="schoolAttended"
                                        //                     onChange={formik.handleChange}
                                        //                     onBlur={formik.handleBlur}
                                        //                     value={formik.values.schoolAttended[index]}
          
                                        //                />
                                        //                {/* <span
                                        //                     className={`${
                                        //                          fieldError.schoolAttended
                                        //                               ? "block text-red-600"
                                        //                               : "hidden"
                                        //                     }`}
                                        //                >
                                        //                     {error}
                                        //                </span> */}
                                                       
                                        //           </div>
                                        //           <div className="lg:col-span-2">
                                        //                <label className="text-lg">Start date</label>
                                        //                <input
                                        //                     type="date"
                                        //                     className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                        //                     // onChange={e => handleFormChange(index, e)}
                                        //                />
                                        //           </div>
                                        //           <div className="lg:col-span-2">
                                        //                <label className="text-lg">End date</label>
                                        //                <input
                                        //                     type="date"
                                        //                     className="p-3 w-full mx-auto border-2 border-blue-400 rounded-lg"
                                        //                     // onChange={e => handleFormChange(index, e)}
                                        //                />
                                        //           </div>
                                        //           <div className="lg:col-span-1">
                                        //                <label className="lg:invisible hidden lg:block">
                                        //                     Remove
                                        //                </label>
                                        //                <button
                                        //                     className="hidden lg:w-5 lg:h-5 bg-red-500 lg:p-3 lg:mx-auto lg:my-5 lg:rounded-full lg:flex lg:items-center lg:justify-center text-white font-semibold text-lg"
                                        //                     onClick={() => removeSchool(index)}
                                        //                >
                                        //                     -
                                        //                </button>
                                        //                <button
                                        //                     className="lg:hidden p-2 bg-red-500 rounded-lg flex items-center justify-center text-white font-normal"
                                        //                     onClick={() => removeSchool(index)}
                                        //                >
                                        //                     Remove
                                        //                </button>
                                        //           </div>
                                        //      </Fragment>
                                        // )) : 
                                        // <h2 className="text-lg col-span-8">Click on button ⬇️ and fill form with school details</h2>
                                   }
                                   {/* troppersleague.com */}
                              </div>
                              <div className="pt-3">
                                   <span>
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
                                        multiple
                                        className={`p-3 w-full mx-auto border-2 rounded-lg bg-white ${
                                             formik.touched.additionalDocuments &&
                                             formik.errors.additionalDocuments
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="additionalDocuments"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.additionalDocuments}
                                   />
                                   <div className="pt-3">
                                        <span className="text-sm">
                                             <strong>NB: </strong> You can select multiple
                                             files. Please do well to select all before
                                             closing the pop-up window
                                        </span>
                                   </div>
                              </div>


                              {/* Button div */}
                              <div>
                                   <button
                                        className="py-3 px-8 mx-auto mt-10 border-2 rounded-lg bg-sky-600 text-white"
                                        type="submit"
                                   >
                                        Submit
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>
          </>
     );
};

export default HomeForm;
