import './home.css';

// Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png'; // important: https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css'; // important: https://stackoverflow.com/questions/40365440/react-leaflet-map-not-correctly-displayed
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

// Custom components
import {Navbar} from "../../components/Navbar/Navbar";
import {MapDropdown} from "../../components/MapDropdown/MapDropdown";


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const mockTrips = [
        {
            id:1,
            title:'Paris nights 2021',
            // image: '',
            city: {
                name:'Paris',
                lat: 48.864716,
                lng: 2.349014
            },
            description: 'Visit city of love this summer',
            date: new Date(2021,11,4),
            transport: ['plane'],
        },
        {
            id:2,
            title:'London 2022',
            // image: '',
            city: {
                name:'London',
                lat: 51.505,
                lng: -0.09
            },
            description: 'Visit London cheap',
            date: new Date(2022,5,4),
            transport: ['plane'],
        },
    ]

const options = [
  { value: 1, label: mockTrips[0].title },
  { value: 2, label: mockTrips[1].title },
];

export const Home = () => {
    return (
    <>
    <Navbar/>
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
    <div className="trip-markers">
    {
        mockTrips.map(({city,title})=>{
            return(
                <>
                    <Marker position={[city.lat,city.lng]}>
                    <Popup>
                        {title}
                    </Popup>
                    </Marker>
                </>
            )
        })
    }
    </div>

    </MapContainer>
    </>
  );
}