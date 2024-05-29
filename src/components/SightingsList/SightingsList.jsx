import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"
import sightingServices from "../../services/sighting.services"
import SightingCard from "../SightingCard/SightingCard"

const SightingsList = () => {

    const [sightings, setSightings] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadAllSightings()
    }, [])

    const loadAllSightings = () => {

        sightingServices
            .getAllSightings()
            .then(({ data }) => {
                setSightings(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }

    console.log(sightings)

    return (
        <div className="SightingsList">
            {isLoading ? <Loader /> :
                <Row>
                    {sightings.map(sighting =>
                        <Col key={sighting._id} md={{ span: 4 }}>
                            <SightingCard
                                name={sighting.specimen.commonName}
                                {...sighting} />
                        </Col>
                    )}
                </Row>
            }
        </div >
    )

}

export default SightingsList