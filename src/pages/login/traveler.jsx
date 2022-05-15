import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import useToken from "../../hooks/useToken";

// Formik: https://formik.org/docs/overview
import {ErrorMessage, Field, Form, Formik} from "formik";

import './login.css'

export const LoginTraveler = () => {

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
            axios.post(`${process.env.REACT_APP_API_URL}/login/traveler`,
            {
                email,
                password
            })
            .then((response) => {
                setToken('traveler',response.data); //response.data is user id in this case
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
           <Form className="form-container w3-container bg-sky-200 dark:bg-sky-600">
               <label className="text-black dark:text-white"><b>Email</b></label>
               <Field className="text-black" type="email" name="email"/>
               <ErrorMessage className="text-red-700" name="email" component="div"/>

               <label className="text-black dark:text-white"><b>Password</b></label>
               <Field className="text-black" type="password" name="password"/>
               <ErrorMessage className="text-red-700" name="password" component="div"/>

               <button type="submit" className="w3-btn w3-round-large w3-margin w3-black" disabled={isSubmitting}>
                   Login
               </button>
           </Form>
       )}
    </Formik>
        {error ? <p className="text-red-700 m-1"> Email and password combo incorrect </p> : null}

        <NavLink to={'/reset-password'}
                 className="m-2 bg-sky-200 dark:bg-sky-600 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black">
            Reset password
        </NavLink>

        <button
            className="w3-btn w3-round-large w3-margin bg-sky-200 dark:bg-sky-600"
            onClick={() => navigate(-1)}
        >
            Go back
        </button>
    </>
  );
}