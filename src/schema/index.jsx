import * as yup from "yup";

export const formSchema = yup.object().shape({
     firstName: yup.string().required("Please enter first name"),
     lastName:  yup.string().required("Please enter last name"),
     otherName:  yup.string(),
     gender:  yup.string().required("Please choose gender"),
     country:  yup.string().required("Please enter a country"),
     regionOrCity:  yup.string().required("Please enter a region/city"),
     dob: yup.date().max(new Date(), "Date of birth must be earlier than today").required("Please enter date of birth"),
     address:  yup.string().required("Please enter address"),
     profilePicture:  yup.string().required("Please select a profile picture"),
     employed:  yup.string().required("Required"),
     jobTitle:  yup.string(),
     maritalStatus:  yup.string().required("Required"),
     disability:  yup.string(),
});
