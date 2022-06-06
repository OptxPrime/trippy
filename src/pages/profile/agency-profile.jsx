import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import useToken from "../../hooks/useToken";

import './profile.css'

let agency;

const fetchUserData = async (token) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_user`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    return response;
}

export const AgencyProfile = () => {

    const [error, setError] = useState('');
    const [agency, setAgency] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const {token} = useToken()


    useEffect(() => {
        fetchUserData(token)
            .then((response) => {
                let a = response.data[0];
                a.establishment_date = a.establishment_date.substring(0, 10); // slice because of different format coming from Django server
                setAgency(a)
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
                <img className="logo"
                     src={agency?.logo ? `${process.env.REACT_APP_API_URL}/media/${agency?.logo}` : "https://picsum.photos/300"}
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
                        agency
                    }
                    validate={values => {
                        const errors = {};
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        if (!values.establishment_date) {
                            errors.establishment_date = "Required";
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
                                <label className="text-black dark:text-white"><b>Agency name</b></label>
                                <Field className="text-black" type="text" name="name"/>

                                <label className="text-black dark:text-white"><b>Agency ID</b></label>
                                <Field className="text-black" type="text" name="agency_id"/>

                                <label className="text-black dark:text-white"><b>Email</b></label>
                                <Field className="text-black" type="email" name="email" disabled="disabled"/>

                                <label className="text-black dark:text-white"><b>Date of establishment</b></label>
                                <Field className="text-black" type="date" name="establishment_date"/>
                                <ErrorMessage className="text-red-700" name="establishment_date" component="div"/>

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