import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useState} from "react";

import '../modals.css'
import useToken from "../../../hooks/useToken";


const ModalForm = ({closeModal, refreshData}) => {

    const {token} = useToken();
    const [coordinatesError, setCoordinatesError] = useState('');

    const fetchCoordinates = async (locationName, setFieldValue) => {
        setCoordinatesError('');
        await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${locationName}&format=json`)
            .then((response) => {
                let {lat, lon} = response.data[0]
                setFieldValue('lat', lat);
                setFieldValue('lng', lon);
            })
            .catch((error) => {
                setCoordinatesError("Generating coordinates not sucessful. Check if you typed location correctly or enter coordinates yourself.");
                setTimeout(() => {
                    setCoordinatesError('');
                }, 4000)
                console.log(error)
            });
    }

    return (
        <Formik
            initialValues={
                {
                    title: '',
                    description: '',
                    transport: [],
                    datetime: '',
                    location: '',
                    lat: '',
                    lng: '',
                    min_travelers: 5,
                    max_travelers: 30,
                    picture_url: ''
                }
            }
            validate={values => {
                const errors = {};
                if (!values.datetime) {
                    errors.datetime = 'Required';
                }
                if (!values.lat) {
                    errors.lat = 'Required';
                }
                if (!values.lng) {
                    errors.lat = 'Required';
                }
                if (!values.min_travelers) {
                    errors.min_travelers = 'Required';
                }
                if (!values.max_travelers) {
                    errors.max_travelers = 'Required';
                }
                if (values.min_travelers <= 0) {
                    errors.min_travelers = 'Must be positive number';
                }
                if (values.max_travelers <= 0) {
                    errors.max_travelers = 'Must be positive number';
                }
                if (values.max_travelers < values.min_travelers) {
                    errors.max_travelers = 'Bounds not valid';
                }
                // TO DO: fix url validation (regex below has false negatives): https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
                // if (values.picture_url && !values.picture_url.match( // https://stackoverflow.com/questions/61634973/yup-validation-of-website-using-url-very-strict
                //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
                // )) {
                //     errors.picture_url = 'Invalid url';
                // }
                return errors;
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                axios.post(`${process.env.REACT_APP_API_URL}/add-group-tour`,
                    values, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                )
                    .then((response) => {
                        closeModal();
                        resetForm();
                        refreshData();
                        alert("Created group tour");
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("Error in creating group tour");
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }}
        >
            {({isSubmitting, setFieldValue, values}) => (
                <Form className="modal-form-container w3-container bg-sky-200 dark:bg-sky-600 dark:bg-sky-600">
                    <label className="text-black dark:text-white"><b>Title</b></label>
                    <Field className="text-black text-center" type="text" name="title"/>

                    <label className="text-black dark:text-white"><b>Description</b></label>
                    <Field className="text-black" as="textarea" name="description"/>

                    <label className="text-black dark:text-white"><b>Date and time</b></label>
                    <Field className="text-black" type="datetime-local" name="datetime"/>
                    <ErrorMessage className="text-red-700" name="datetime" component="div"/>

                    <label className="text-black dark:text-white"><b>Picture url</b></label>
                    <Field className="text-black" type="text" name="picture_url"/>
                    <ErrorMessage className="text-red-700" name="picture_url" component="div"/>

                    <label className="text-black dark:text-white"><b>Location</b></label>
                    <Field className="text-black text-center" type="text" name="location"/>
                    <ErrorMessage className="text-red-700" name="location" component="div"/>

                    <button
                        type="button"
                        className="w3-btn w3-round-large w3-margin bg-sky-400 dark:bg-sky-900 text-white generate-coordinates-button"
                        disabled={isSubmitting}
                        onClick={async () => await fetchCoordinates(values.location, setFieldValue)}
                    >
                        Generate coordinates
                    </button>
                    {coordinatesError ? <p className="text-red-700 text-sm"> {coordinatesError} </p> : null}

                    <div className="flex flex-row coordinates-row justify-around">
                        <div className="flex flex-col coordinate">
                            <label className="text-black dark:text-white"><b>Latitude</b></label>
                            <Field className="text-black" type="number" name="lat"/>
                            <ErrorMessage className="text-red-700" name="lat" component="div"/>
                        </div>
                        <div className="flex flex-col coordinate">
                            <label className="text-black dark:text-white"><b>Longitude</b></label>
                            <Field className="text-black" type="number" name="lng"/>
                            <ErrorMessage className="text-red-700" name="lng" component="div"/>
                        </div>
                    </div>

                    <div className="flex flex-row coordinates-row justify-around">
                        <div className="flex flex-col coordinate">
                            <label className="text-black dark:text-white"><b>Min travelers</b></label>
                            <Field className="text-black text-center" type="number" name="min_travelers"/>
                            <ErrorMessage className="text-red-700" name="min_travelers" component="div"/>
                        </div>
                        <div className="flex flex-col coordinate">
                            <label className="text-black dark:text-white"><b>Max travelers</b></label>
                            <Field className="text-black text-center" type="number" name="max_travelers"/>
                            <ErrorMessage className="text-red-700" name="max_travelers" component="div"/>
                        </div>
                    </div>


                    <label className="text-black dark:text-white"><b>Transport</b></label>
                    <div className="transport-options">
                        <label>
                            <Field className="text-black m-2" type="checkbox" name="transport" value="plane"/>
                            Plane
                        </label>
                        <label>
                            <Field className="text-black m-2" type="checkbox" name="transport" value="bus"/>
                            Bus
                        </label>
                        <label>
                            <Field className="text-black m-2" type="checkbox" name="transport" value="ship"/>
                            Ship
                        </label>
                    </div>

                    <button type="submit"
                            className="w3-btn w3-round-large w3-margin bg-sky-400 dark:bg-sky-900 text-white"
                            disabled={isSubmitting}>
                        Add tour
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export const GroupTourModal = ({refreshData}) => {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <button
                className="w3-btn w3-round-large w3-margin bg-gray-500 text-white"
                onClick={openModal}
            > Add Group Tour
            </button>
            <div className="w3-modal modal-container"
                 style={{display: isOpen ? 'block' : 'none', zIndex: 2000}}>
                <div className="w3-modal-content w3-card-4">
                    <header className="w3-container bg-sky-400 dark:bg-sky-900">
                    <span onClick={closeModal}
                          className="w3-button w3-display-topright">&times;
                    </span>
                        <h2>Group Tour</h2>
                    </header>
                    <div className="w3-container text-black font-small bg-sky-200 dark:bg-sky-600">
                        <ModalForm closeModal={closeModal} refreshData={refreshData}/>
                    </div>
                </div>
            </div>
        </>
    );
}