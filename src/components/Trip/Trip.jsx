import './Trip.css'
import {useEffect, useState} from "react";
import useToken from "../../hooks/useToken";
import axios from "axios";

export const Trip = ({trip, refreshData}) => {
    const {token, getUserType} = useToken();
    let {
        status, title, description, trip_id, is_registered
    } = trip

    let date = new Date(trip.datetime);
    let transport = trip.transport.split(',');
    let capacity = trip.max_travelers ? trip.max_travelers : 1;
    let statusColor = status === 'accepted' ? 'bg-green-300 dark:bg-green-600' : status === 'rejected' ? 'bg-red-400 dark:bg-red-600' : status === 'canceled' ? 'bg-orange-500' : status === 'in review' ? 'bg-gray-500' : 'bg-gray-500';
    let variant = trip.max_travelers ? 'group' : 'solo';

    let [checkedIn, setCheckedIn] = useState(trip.checkedIn);
    let [currentTravelers, setCurrentTravelers] = useState(trip.currentTravelers ? trip.currentTravelers : 1)
    let [capacityColor, setCapacityColor] = useState('bg-green-300 dark:bg-green-600');

    useEffect(() => {
        if (capacity === currentTravelers) setCapacityColor('bg-red-400 dark:bg-red-600');
        else setCapacityColor('bg-green-300 dark:bg-green-600');
    }, [currentTravelers]);

    const handleCheck = async (action) => {
        // To do: add axios call to add/remove traveler to trip. If success, then:
        // if (!checkedIn) setCurrentTravelers(currentTravelers + 1);
        // else setCurrentTravelers(currentTravelers - 1);
        // setCheckedIn(!checkedIn);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/tour-registration`,
                {action, tour_id: trip_id},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            refreshData();
        } catch (err) {
            alert('Trip registration change not successful!');
        }
    }

    const changeTripStatus = async (status) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/change-trip-status`,
                {status, trip_id},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            refreshData();
        } catch (err) {
            alert('Trip status change not successful!');
        }
    }

    const deleteTrip = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/delete-trip`,
                {trip_id, trip_type: variant},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            refreshData();
        } catch (err) {
            alert('Trip deletion not successful!');
        }
    }

    return (
        <div
            className="trip-card w-1/4 rounded-lg bg-sky-200 dark:bg-sky-900 border-4 border-sky-600 trip-card-container">
            {
                variant === 'solo' ?
                    <div className={`trip-status text-black dark:text-white ${statusColor}`}>
                        <p className="text-md">{status}</p>
                    </div> :
                    <div className={`trip-status text-black dark:text-white ${capacityColor}`}>
                        {/*<p className="text-md">{`${currentTravelers}/${capacity}`}</p>*/}
                        <p className="text-md">{trip.min_travelers}-{trip.max_travelers} people</p>
                    </div>
            }

            <div className="trip-type bg-sky-600 text-white">
                <p className="text-md">{variant === 'solo' ? 'Solo Trip' : 'Group Tour'}</p>
            </div>
            <img src={trip.picture_url ? trip.picture_url : "https://picsum.photos/200"}/>
            <h2> {title} </h2>
            <p className="text-lg m-2"> {description} </p>
            <div className="flex justify-center">
                <div className="trip-date border-solid border-2 bg-gray-500 border-gray-500 rounded-lg text-white">
                    {`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}.`}
                </div>
                <div
                    className="flex justify-center trip-transport bg-gray-500 border-solid border-2 border-gray-500 rounded-lg text-white">
                    {
                        transport.map((t) => {
                            return <p key={t} className="transport-item"> {t} </p>;
                        })
                    }
                </div>
            </div>
            {/*
                Rules:
                Agency can delete any trip, be it solo or organised tour.
                Agency can accept/reject any solo trip proposal. After accept/reject, status changes cannot be made (only deletion of solo trip)
                Traveler can only delete solo trip which he requested, whether it was accepted or not.
                Traveler can check in or check out to any future trip.
            */}
            {
                variant === 'group' && getUserType() === 'traveler' && date >= Date.now() ?
                    <button
                        className="w3-btn w3-round-large w3-margin bg-sky-300 dark:bg-sky-600 text-black dark:text-white"
                        onClick={() => handleCheck(is_registered ? 'cancel' : 'register')}
                    >
                        {/*{checkedIn ? 'Check out' : 'Check in'}*/}
                        {is_registered ? 'Cancel' : 'Check in'}
                    </button> :
                    variant === 'solo' && getUserType() === 'agency' ?
                        status === 'accepted' || status === 'rejected' ?
                            <button
                                className="w3-btn w3-round-large w3-margin bg-sky-300 dark:bg-sky-600 text-black dark:text-white"
                                disabled
                            >
                                {status}
                            </button>
                            :
                            <div className="accept-reject-container">
                                <button
                                    className="accept-reject-button w3-btn w3-round-large w3-margin bg-green-300 dark:bg-green-600 text-black dark:text-white"
                                    onClick={() => changeTripStatus('accepted')}
                                >
                                    Accept
                                </button>
                                <button
                                    className="accept-reject-button w3-btn w3-round-large w3-margin bg-red-300 dark:bg-red-600 text-black dark:text-white"
                                    onClick={() => changeTripStatus('rejected')}
                                >
                                    Reject
                                </button>
                            </div> : null
            }
            {
                getUserType() === 'agency' || (variant === 'solo' && getUserType() === 'traveler') ?
                    <button
                        className="w3-btn w3-round-large w3-margin bg-sky-300 dark:bg-sky-600 text-black dark:text-white"
                        onClick={deleteTrip}
                    >
                        Delete
                    </button> : null
            }
        </div>
    );
}