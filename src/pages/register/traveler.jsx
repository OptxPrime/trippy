import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useState} from "react";

export const RegisterTraveler = () => {

    const [error, setError] = useState('');
    const navigate = useNavigate();

    return (
        <>
            <head>
                <base href="/"></base>
                {/* weird bug: https://stackoverflow.com/questions/42773306/react-router-doesnt-load-images-properly-with-nested-routes */}
            </head>
            <img src="app-logo.png" style={{margin: '0 auto', maxWidth: '300px'}}/>
            <Formik
                initialValues={
                    {
                        first_name: '',
                        last_name: '',
                        username: '',
                        email: '',
                        password: '',
                        repeated_password: ''
                    }
                }
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (values.password !== values.repeated_password) {
                        errors.repeated_password = "Passwords must match"
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    axios.post(`${process.env.REACT_APP_API_URL}/register/traveler`,
                        {
                            values
                        })
                        .then((response) => {
                            console.log(response.data);
                            alert("Registration successful!");
                            navigate('/login');
                        })
                        .catch((error) => {
                            setError(error.response.data)
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({isSubmitting}) => (
                    <Form className="form-container w3-container bg-sky-200 dark:bg-sky-600">
                        <label className="text-black dark:text-white"><b>First name</b></label>
                        <Field className="text-black" type="text" name="first_name"/>

                        <label className="text-black dark:text-white"><b>Last name</b></label>
                        <Field className="text-black" type="text" name="last_name"/>

                        <label className="text-black dark:text-white"><b> Username</b></label>
                        <Field className="text-black" type="text" name="username"/>

                        <label className="text-black dark:text-white"><b>Email</b></label>
                        <Field className="text-black" type="email" name="email"/>
                        <ErrorMessage className="text-red-700" name="email" component="div"/>

                        <label className="text-black dark:text-white"><b>Password</b></label>
                        <Field className="text-black" type="password" name="password"/>
                        <ErrorMessage className="text-red-700" name="password" component="div"/>

                        <label className="text-black dark:text-white"><b>Repeat password</b></label>
                        <Field className="text-black" type="password" name="repeated_password"/>
                        <ErrorMessage className="text-red-700" name="repeated_password" component="div"/>

                        <button type="submit" className="w3-btn w3-round-large w3-margin w3-black"
                                disabled={isSubmitting}>
                            Register
                        </button>
                    </Form>
                )}
            </Formik>

            {error ? <p className="text-red-700 m-1"> {error} </p> : null}
            <button
                className="w3-btn w3-round-large w3-margin bg-sky-200 dark:bg-sky-600"
                onClick={() => navigate(-1)}
            >
                Go back
            </button>
        </>
    );
}