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


let DefaultIcon = L.icon({
    iconUrl: defaultIcon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

var greenIcon = new L.Icon({ // https://github.com/pointhi/leaflet-color-markers
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


const mockTrips = [
    {
        id: 1,
        title: 'Paris nights 2021',
        // image: '',
        city: {
            name: 'Paris',
            lat: 48.864716,
            lng: 2.349014
        },
        description: 'Visit city of love this summer',
        date: new Date(2021, 11, 4),
        transport: ['plane'],
    },
    {
        id: 2,
        title: 'London 2022',
        // image: '',
        city: {
            name: 'London',
            lat: 51.505,
            lng: -0.09
        },
        description: 'Visit London cheap',
        date: new Date(2022, 5, 4),
        transport: ['plane'],
    },
]

const options = [
    {value: 1, label: mockTrips[0].title},
    {value: 2, label: mockTrips[1].title},
];


export const Home = () => {

    const {getUserType} = useToken();
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <p className="instructions"> Click on a map to generate green marker. Click on a green marker
                to {getUserType() == 'traveler' ? 'request new solo trip' : 'create new group tour'} on that
                location. </p>
            <MapContainer
                className="map-container"
                center={[51.505, -0.09]}
                zoom={11}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapDropdown options={options} trips={mockTrips}/>
                <NewTripMarker/>
                <div className="trip-markers">
                    {
                        mockTrips.map(({id, city, title}) => {
                            return (
                                <div key={`${id}_${title}}`}>
                                    <Marker position={[city.lat, city.lng]}>
                                        <Popup>
                                            {title}
                                        </Popup>
                                    </Marker>
                                </div>
                            )
                        })
                    }
                </div>

            </MapContainer>
        </>
    );
}