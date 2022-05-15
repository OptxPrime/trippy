import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import useToken from "../../hooks/useToken";

// Formik: https://formik.org/docs/overview
import {ErrorMessage, Field, Form, Formik} from "formik";

import './login.css'

export const LoginAgency = () => {

    const navigate = useNavigate()
    const {setToken} = useToken();
    const [error,setError] = useState("");

    return (
    <>
    <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         if(!values.password) {
             errors.password = 'Required'
         }
         return errors;
       }}
       onSubmit={({email,password}, { setSubmitting }) => {
            axios.post(`${process.env.REACT_APP_API_URL}/login/agency`,
            {
                email,
                password
            })
            .then((response) => {
                setToken('agency',response.data); //response.data is user id in this case
                navigate('/home');
            })
            .catch((error) =>{
                setError(error)
            })
            .finally(()=>{
                setSubmitting(false);
            });
       }}
     >
       {({ isSubmitting }) => (
         <Form className="form-container w3-container w3-indigo">
            <label className="w3-text-white"><b>Email</b></label>
            <Field className="text-black" type="email" name="email" />
            <ErrorMessage className="text-red-700" name="email" component="div" />

            <label className="w3-text-white"><b>Password</b></label>
            <Field className="text-black" type="password" name="password" />
            <ErrorMessage className="text-red-700" name="password" component="div" />

            <button type="submit" className="w3-btn w3-round-large w3-margin w3-black" disabled={isSubmitting}>
             Login
            </button>
         </Form>
       )}
     </Formik>
        {error ? <p className="text-red-700 m-1"> Email and password combo incorrect </p> : null}
        <button
            className="w3-btn w3-round-large w3-margin w3-indigo"
            onClick={()=>navigate(-1)}
        >
            Go back
        </button>
    </>
  );
}