import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";

import '../modals.css'
import Dropdown from "react-dropdown";
import useToken from "../../../hooks/useToken";


const ModalForm = ({closeModal, refreshData, latlng}) => {

    const [agencies, setAgencies] = useState([]);
    const [coordinatesError, setCoordinatesError] = useState('');
    const {token} = useToken();

    const fetchAgencies = async () => {
        setCoordinatesError('');
        await axios.get(`${process.env.REACT_APP_API_URL}/get-all-agencies`)
            .then((response) => {
                let agenciesList = [];
                for (let a of response.data) {
                    agenciesList.push({value: a.id, label: a.name});
                }
                setAgencies(agenciesList);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        fetchAgencies();
    }, [])

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
                    agency: agencies.length ? agencies[0].value : '',
                    transport: [],
                    datetime: '',
                    location: '',
                    lat: latlng ? latlng[0] : '',
                    lng: latlng ? latlng[1] : '',
                    max_price: '',
                }
            }
            validate={values => {
                const errors = {};
                if (!values.max_price) {
                    errors.max_price = 'Required';
                }
                if (!values.datetime) {
                    errors.datetime = 'Required';
                }
                if (!values.lat) {
                    errors.lat = 'Required';
                }
                if (!values.lng) {
                    errors.lat = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                axios.post(`${process.env.REACT_APP_API_URL}/add-solo-trip`,
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
                        alert("Solo trip request sent to agency!");
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("Error in sending solo trip request");
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

                    <label className="text-black dark:text-white"><b>Date and time</b></label>
                    <Field className="text-black" type="datetime-local" name="datetime"/>
                    <ErrorMessage className="text-red-700" name="datetime" component="div"/>

                    <label className="text-black dark:text-white"><b>Max price</b></label>
                    <Field className="text-black text-center" type="number" name="max_price"/>
                    <ErrorMessage className="text-red-700" name="max_price" component="div"/>

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


                    <label className="text-black dark:text-white"><b>Agency</b></label>
                    <Dropdown
                        className="agency-dropdown"
                        options={agencies}
                        value={agencies[0]}
                        onChange={({value, label}) => setFieldValue("agency", value)}
                    />

                    <button type="submit"
                            className="w3-btn w3-round-large w3-margin bg-sky-400 dark:bg-sky-900 text-white"
                            disabled={isSubmitting}>
                        Add trip
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export const SoloTripModal = ({refreshData, page, ...props}) => {

    const [isOpen, setIsOpen] = useState(page === 'home' ? true : false);

    const openModal = () => {
        if (props.openModal) props.openModal();
        else setIsOpen(true);
    }

    const closeModal = () => {
        if (props.closeModal) props.closeModal();
        else setIsOpen(false);
    }

    return (
        <>
            {page !== 'home' ? <button
                className="w3-btn w3-round-large w3-margin bg-gray-500 text-white"
                onClick={openModal}
            > Request Solo Trip
            </button> : null}
            <div className="w3-modal modal-container"
                 style={{display: isOpen ? 'block' : 'none', zIndex: 2000}}>
                <div className="w3-modal-content w3-card-4">
                    <header className="w3-container bg-sky-400 dark:bg-sky-900">
                    <span onClick={closeModal}
                          className="w3-button w3-display-topright">&times;
                    </span>
                        <h2>Solo Trip</h2>
                    </header>
                    <div className="w3-container text-black font-small bg-sky-200 dark:bg-sky-600">
                        <ModalForm closeModal={closeModal} refreshData={refreshData} latlng={props.location}/>
                    </div>
                </div>
            </div>
        </>
    );
}