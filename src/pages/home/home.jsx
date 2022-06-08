import './home.css';

// Leaflet
import L from 'leaflet';
import defaultIcon from 'leaflet/dist/images/marker-icon.png'; // important: https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css'; // important: https://stackoverflow.com/questions/40365440/react-leaflet-map-not-correctly-displayed
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet'

// Custom components
import {Navbar} from "../../components/Navbar/Navbar";
import {MapDropdown} from "../../components/MapDropdown/MapDropdown";
import {useState} from "react";
import useToken from "../../hooks/useToken";
import {SoloTripModal} from "../../components/Modals/SoloTripModal/SoloTripModal";
import {GroupTourModal} from "../../components/Modals/GruopTourModal/GroupTourModal";
import axios from "axios";
import {useEffect} from "react";


let DefaultIcon = L.icon({
    iconUrl: defaultIcon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

var greenIcon = new L.Icon({ // https://github.com/pointhi/leaflet-color-markers
    iconUrl: 'marker-icon-green.png',
    shadowUrl: 'marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var violetIcon = new L.Icon({
    iconUrl: 'marker-icon-violet.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

var BlueIcon = new L.Icon({
    iconUrl: 'marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

export const Home = () => {

    const {token, getUserType} = useToken();
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recentTrips, setRecentTrips] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [finishedTrips, setFinishedTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchTrips = async (type) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${type === 'recent' ? 'get-recent-trips' : 'get-my-trips'}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        return response;
    }

    const unpackTrips = (response) => {
        let trips = JSON.parse(response.data);
        let tripsFields = [];
        for (let t of trips) {
            tripsFields.push({id: t.pk, ...t.fields});
        }
        return tripsFields;
    }

    useEffect(() => {
        Promise.all([
            fetchTrips('finished'), fetchTrips('recent')
        ])
            .then(([response1, response2]) => {
                let finishedT = unpackTrips(response1), recentT = unpackTrips(response2);
                setFinishedTrips(finishedT);
                setRecentTrips(recentT);
                let dropdown = []
                for (let t of finishedT) {
                    dropdown.push({value: t.id, label: t.title});
                }
                setDropdownOptions(dropdown);
            }).catch((err) => {
            console.log(err);
            setError("Error fetching data!");
        }).finally(() => {
            setLoading(false);
        })
    }, []);


    const NewTripMarker = () => {

        useMapEvents({
            click(e) {
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
            },
        })

        return (
            selectedPosition ?
                <Marker
                    key={selectedPosition[0]}
                    position={selectedPosition}
                    icon={greenIcon}
                    eventHandlers={{
                        click: () => {
                            setIsModalOpen(true)
                        },
                    }}
                >
                </Marker>
                : null
        )
    }

    return (
        <>
            {loading ? <div>Loading</div> : error ? <p className="text-red-700 m-2"> {error} </p> :
                <div>
                    {isModalOpen ?
                        getUserType() == 'traveler' ?
                            <SoloTripModal
                                closeModal={() => setIsModalOpen(false)}
                                page="home"
                                refreshData={() => {
                                }}
                                location={selectedPosition}
                            /> :
                            <GroupTourModal
                                closeModal={() => setIsModalOpen(false)}
                                page="home"
                                refreshData={() => {
                                }}
                                location={selectedPosition}
                            /> : null
                    }
                    <Navbar/>
                    <MapContainer
                        className="map-container"
                        center={[51.505, -0.09]}
                        zoom={2}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapDropdown options={dropdownOptions} trips={finishedTrips}/>
                        <NewTripMarker/>
                        <div className="trip-markers">
                            {
                                recentTrips?.length ? recentTrips?.map(({id, title, lat, lng, datetime}) => {
                                    return (
                                        <div key={`${id}_${datetime}}`}>
                                            <Marker position={[lat, lng]} icon={violetIcon}>
                                                <Popup>
                                                    {title}
                                                </Popup>
                                            </Marker>
                                        </div>
                                    )
                                }) : null
                            }
                            {
                                finishedTrips?.length ? finishedTrips?.map(({id, title, lat, lng, datetime}) => {
                                    return (
                                        <div key={`${id}_${datetime}}`}>
                                            <Marker position={[lat, lng]} icon={BlueIcon}>
                                                <Popup>
                                                    {title}
                                                </Popup>
                                            </Marker>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                    </MapContainer>

                    <div className="map-instructions">
                        <p> Recent tours, organised in the past 30 days, are represented on the map with <img
                            className="instructions-marker-image"
                            src="marker-icon-violet.png"/></p>

                        <p> Your past trips, shown in the dropdown menu, are represented on the map with <img
                            className="instructions-marker-image"
                            src="marker-icon-blue.png"/></p>
                        <p> Click on a map to generate <img
                            className="instructions-marker-image"
                            src="marker-icon-green.png"/>.
                            Click on it
                            to {getUserType() == 'traveler' ? 'request new solo trip' : 'create new group tour'} on that
                            location. </p>
                    </div>
                </div>}
        </>
    );
}