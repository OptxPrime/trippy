import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import useToken from "../../hooks/useToken";

import './profile.css'


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
    const [traveler, setTraveler] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const {token} = useToken();

    useEffect(() => {
        fetchUserData(token)
            .then((response) => {
                let t = response.data[0];
                setTraveler(t);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError("Error fetching data!");
            })
    }, []);

    return (
        loading ? <div>Loading...</div> :
            <>
                <img className="logo"
                     src={traveler?.profile_pic ? `${process.env.REACT_APP_API_URL}/media/${traveler?.profile_pic}` : "https://picsum.photos/300"}
                />
                <form className="logo-form" encType="multipart/form-data" method="POST"
                      action={`${process.env.REACT_APP_API_URL}/upload-avatar`}>
                    <input className="file-input" type="file" name="slika" required/>
                    <input name="token" style={{display: 'none'}} type="text" value={token} readOnly/>
                    <button
                        className="logo-button w3-btn w3-round-large bg-sky-300 dark:bg-sky-600 text-black dark:text-white"
                        type="submit"> Submit new avatar
                    </button>
                </form>

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
                            <Form className="form-container w3-container bg-sky-200 dark:bg-sky-600"
                                  style={{margin: '2em'}}>
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