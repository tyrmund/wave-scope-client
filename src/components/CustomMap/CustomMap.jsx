import { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function CustomMap({ zoom, center, markers, type }) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    })

    const [map, setMap] = useState(null)

    const onLoad = (map) => {
        //console.log('Aquí haz lo que necesites tras la carga del mapa')

    }
    const onUnmount = () => setMap(null)

    return isLoaded && (
        <GoogleMap
            mapContainerStyle={{
                marginTop: '20px',
                marginBottom: '20px',
                height: '400px',
                width: '600px',
                left: 'calc(50% - 300px)'
            }}
            zoom={zoom}
            onLoad={onLoad}
            center={{ lat: center.coordinates[1], lng: center.coordinates[0] }}
            onUnmount={onUnmount}
        >

            {type === "sighting" && <Marker position={{ lat: markers.coordinates[1], lng: markers.coordinates[0] }} icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'} />}
            {type === "beach" &&
                <>
                    <Marker position={{ lat: center.coordinates[1], lng: center.coordinates[0] }} icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'} />
                    {markers.map((stop, index) =>
                        <Marker key={index} position={{ lat: Number(stop.latitude), lng: Number(stop.longitude) }} icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'} title={stop.name} />
                    )}
                </>
            }
            {type === 'beaches' &&
                <>
                    {markers.map((beach, index) =>
                        <Marker key={index} position={{ lat: beach.location.coordinates[1], lng: beach.location.coordinates[0] }} icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'} title={'loool'} />
                    )}
                </>}

        </GoogleMap>
    )
}

export default CustomMap