import { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function CustomMap() {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAaqy3xWgV3AXQiCkloMkoz05O7AYjJf14"
    })

    const [map, setMap] = useState(null)

    const onLoad = (map) => console.log('Aquí haz lo que necesites tras la carga del mapa')
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
            zoom={14}
            onLoad={onLoad}
            center={{ lat: 28.14, lng: -15.436111 }}
            onUnmount={onUnmount}
        >
            <Marker position={{ lat: 28.148969438812053, lng: -15.430323280115442 }} />
            <Marker position={{ lat: 28.14793177827885, lng: -15.429384047852833 }} />
            <Marker position={{ lat: 28.145113879632028, lng: -15.430225659008428 }} />

        </GoogleMap>
    )
}

export default CustomMap