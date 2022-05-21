import './Trip.css'
import {useEffect, useState} from "react";

export const Trip = ({trip}) => {
    let {
        variant, status, title, description, date, transport
    } = trip

    let capacity = trip.capacity ? trip.capacity : 1;
    let statusColor = status === 'accepted' ? 'bg-green-500' : status === 'rejected' ? 'bg-red-500' : status === 'canceled' ? 'bg-orange-500' : status === 'in review' ? 'bg-gray-500' : 'bg-gray-500';

    let [checkedIn, setCheckedIn] = useState(trip.checkedIn);
    let [currentTravelers, setCurrentTravelers] = useState(trip.currentTravelers ? trip.currentTravelers : 1)
    let [capacityColor, setCapacityColor] = useState('bg-green-500');

    useEffect(() => {
        if (capacity === currentTravelers) setCapacityColor('bg-red-500');
        else setCapacityColor('bg-green-500');
    }, [currentTravelers]);

    const handleCheck = () => {
        // To do: add axios call to add/remove traveler to trip. If success, then:
        if (!checkedIn) setCurrentTravelers(currentTravelers + 1);
        else setCurrentTravelers(currentTravelers - 1);
        setCheckedIn(!checkedIn);
    }

    return (
        <div
            className="trip-card w-1/4 rounded-lg bg-sky-200 dark:bg-sky-900 border-4 border-sky-600 trip-card-container">
            {
                variant === 'solo' ?
                    <div className={`trip-status text-white ${statusColor}`}>
                        <p className="text-md">{status}</p>
                    </div> :
                    <div className={`trip-status text-white ${capacityColor}`}>
                        <p className="text-md">{`${currentTravelers}/${capacity}`}</p>
                    </div>
            }

            <div className="trip-type bg-sky-600 text-white">
                <p className="text-md">{variant === 'solo' ? 'Solo Trip' : 'Group Tour'}</p>
            </div>
            <img src="https://picsum.photos/200"/>
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
                            return <p className="transport-item"> {t} </p>;
                        })
                    }
                </div>
            </div>
            <button
                className="w3-btn w3-round-large w3-margin bg-sky-300 dark:bg-sky-600 text-black dark:text-white"
                onClick={handleCheck}
            >
                {checkedIn ? 'Check out' : 'Check in'}
            </button>

        </div>
    );
}