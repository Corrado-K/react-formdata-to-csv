import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import { formSchema } from "../schema";

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
               profilePicture: '',
               employed: "",
               jobTitle: "",
               maritalStatus: "",
               disability: "",
          },
          onSubmit: (values) => {
               alert(JSON.stringify(values, null, 2) + "\n \n Success!");
          },
          validationSchema: formSchema
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
                                        <option className="text-sm">Select a gender</option>
                                        <option className="text-sm" value={'male'}>
                                             Male
                                        </option>
                                        <option className="text-sm" value={'female'}>
                                             Female
                                        </option>
                                   </select>
                                   {formik.touched.gender &&
                                             formik.errors.gender && (
                                                  <span className="text-red-400">
                                                       {formik.errors.gender}
                                                  </span>
                                             )}
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
                                        <option className="text-sm">Select a country</option>
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
                                   {formik.touched.country &&
                                        formik.errors.country && (
                                             <span className="text-red-400">
                                                  {formik.errors.country}
                                             </span>
                                        )}
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
                                   {formik.touched.regionOrCity &&
                                        formik.errors.regionOrCity && (
                                             <span className="text-red-400">
                                                  {formik.errors.regionOrCity}
                                             </span>
                                        )}
                                   
                              </div>

                              <div>
                                   <label className="text-lg">Date of birth</label>
                                   <input
                                        type="date"
                                        className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             formik.touched.dob &&
                                             formik.errors.dob
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="dob"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.dob}
                                   />
                                   {formik.touched.dob &&
                                        formik.errors.dob && (
                                             <span className="text-red-400">
                                                  {formik.errors.dob}
                                             </span>
                                        )}
                              </div>
                              <div>
                                   <label className="text-lg">Address</label>
                                   <input
                                        type="text"
                                        className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             formik.touched.address &&
                                             formik.errors.address
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="address"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.address}
                                   />
                                   {formik.touched.address &&
                                        formik.errors.address && (
                                             <span className="text-red-400">
                                                  {formik.errors.address}
                                             </span>
                                        )}
                              </div>
                              <div>
                                   <label className="text-lg">Profile Picture</label>
                                   <input
                                        type="file"
                                        className={`p-3 w-full mx-auto border-2 rounded-lg ${
                                             formik.touched.profilePicture &&
                                             formik.errors.profilePicture
                                                  ? "border-red-400"
                                                  : "border-blue-400"
                                        }`}
                                        name="profilePicture"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.profilePicture}
                                   />
                                   {formik.touched.profilePicture &&
                                        formik.errors.profilePicture && (
                                             <span className="text-red-400">
                                                  {formik.errors.profilePicture}
                                             </span>
                                        )}
                              </div>

                              <div>
                                   <label className="text-lg">Employed?</label>
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
                                        <option className="text-sm">Are you employed?</option>
                                        <option className="text-sm" value={"no"}>
                                             No
                                        </option>
                                        <option className="text-sm" value={"yes"}>
                                             Yes
                                        </option>
                                   </select>
                                   {formik.touched.employed &&
                                        formik.errors.employed && (
                                             <span className="text-red-400">
                                                  {formik.errors.employed}
                                             </span>
                                        )}
                              </div>

                              {/* Conditionally render this form input */}
                              <div
                                   className={`${
                                        formik.values.employed === 'yes' ? "block" : "hidden"
                                   } transition-all ease-in-out duration-500`}
                              >
                                   <label className="text-lg">Job</label>
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
                                        value={formik.values.jobTitle}
                                   >
                                        <option className="text-sm" value={"Doctor"} onClick={()=> {
                                             setOtherJob(false)
                                        }}>
                                             Doctor
                                        </option>
                                        <option className="text-sm" value={"Nurse"} onClick={()=> {
                                             setOtherJob(false)
                                        }}>
                                             Nurse
                                        </option>
                                        <option className="text-sm" value={''} onClick={()=> {
                                             setOtherJob(true)
                                        }}>
                                             Other
                                        </option>
                                   </select>
                              </div>

                              {/* There's an issue with this that you have to check */}
                              <div
                                   className={`${
                                        formik.values.employed === 'yes' && otherJob ? "block" : "hidden"
                                   } transition-all ease-in-out duration-300`}
                              >
                                   <label className="text-lg">Other</label>
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
                                        value={formik.values.employed === "no" ? "" : formik.values.jobTitle}
                                   />
                              </div>
                              {/* End of conditional rendering */}

                              <div>
                                   <label className="text-lg">Marital Status</label>
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
                                        <option className="text-sm">Select a marital status</option>
                                        <option className="text-sm" value={'Married'}>Married</option>
                                        <option className="text-sm" value={'Divorced/Separated/Widowed'}>
                                             Divorced/Separated/Widowed
                                        </option>
                                        <option className="text-sm" value={'Never married'}>Never married</option>
                                   </select>
                                   {formik.touched.maritalStatus &&
                                        formik.errors.maritalStatus && (
                                             <span className="text-red-400">
                                                  {formik.errors.maritalStatus}
                                             </span>
                                        )}
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
