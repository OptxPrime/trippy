import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import useToken from "../../hooks/useToken";

import {ErrorMessage, Field, Form, Formik} from "formik";

import './reset-password.css'

export const ResetPassword = () => {

    const navigate = useNavigate()
    const [error, setError] = useState("");

    return (
        <>
            <img src="app-logo.png" style={{margin: '0 auto'}}/>
            <Formik
                initialValues={{email: '', old_password: '', new_password: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}

                onSubmit={({email, old_password, new_password}, {setSubmitting}) => {
                    axios.post(`${process.env.REACT_APP_API_URL}/reset-password`,
                        {
                            email,
                        })
                        .then((response) => {
                            navigate('/login');
                        })
                        .catch((error) => {
                            // console.log(error);
                            setError(error.response.data)
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({isSubmitting}) => (
                    <Form className="form-container w3-container bg-sky-200 dark:bg-sky-600">
                        <label className="text-black dark:text-white"><b>Email</b></label>
                        <Field className="p-2 text-black" type="email" name="email"/>
                        <ErrorMessage className="text-red-700" name="email" component="div"/>

                        <button type="submit" className="w3-btn w3-round-large w3-margin w3-black"
                                disabled={isSubmitting}>
                            Reset
                        </button>
                    </Form>
                )}
            </Formik>
            {error ? <p className="text-red-700 m-1"> {error} </p> : null}

            <button
                className="m-2 bg-sky-200 dark:bg-sky-600 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black"
                onClick={() => navigate(-1)}
            >
                Go back
            </button>
        </>
    );
}