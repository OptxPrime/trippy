import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import useToken from "../../hooks/useToken";

let traveler;

const fetchUserData = async (token) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_user`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    return response;
}

export const TravelerProfile = () => {

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {token} = useToken()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData(token)
            .then((response) => {
                traveler = JSON.parse(response.data);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setError("Error fetching data!");
            })
    }, []);

    return (
        loading ? <div>Loading...</div> :
            <>
                <button
                    className="w3-btn w3-round-large w3-margin bg-sky-200 dark:bg-sky-600"
                    onClick={() => navigate('/home')}
                >
                    Home
                </button>
                <Formik
                    initialValues={
                        traveler
                    }
                    validate={values => {
                        const errors = {};
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        axios.post(`${process.env.REACT_APP_API_URL}/update-profile`,
                            values, {
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                            .then((response) => {
                                console.log(response.data);
                                alert("Successfully updated profile info");
                                navigate('/profile');
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                            .finally(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({isSubmitting}) => {
                        return (
                            <Form className="form-container w3-container bg-sky-200 dark:bg-sky-600">
                                <label className="text-black dark:text-white"><b>First name</b></label>
                                <Field className="text-black" type="text" name="first_name"/>

                                <label className="text-black dark:text-white"><b>Last name</b></label>
                                <Field className="text-black" type="text" name="last_name"/>

                                <label className="text-black dark:text-white"><b> Username</b></label>
                                <Field className="text-black" type="text" name="username" disabled="disabled"/>

                                <label className="text-black dark:text-white"><b>Email</b></label>
                                <Field className="text-black" type="email" name="email" disabled="disabled"/>

                                <label className="text-black dark:text-white"><b>Password</b></label>
                                <Field className="text-black" type="password" name="password"/>
                                <ErrorMessage className="text-red-700" name="password" component="div"/>

                                <button type="submit" className="w3-btn w3-round-large w3-margin w3-black"
                                        disabled={isSubmitting}>
                                    Save changes
                                </button>
                            </Form>
                        )
                    }}
                </Formik>

                {error ? <p className="text-red-700 m-1"> {error} </p> : null}
            </>
    );
}