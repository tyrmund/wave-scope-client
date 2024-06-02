import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Container, Button } from "react-bootstrap"
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

    return (
        <div className="SightingsList">
            {isLoading ? <Loader /> :
                <Container>
                    <Link to={'/sightings/new'} style={{ textDecoration: 'none' }}>
                        <Button className="custom-color-button d-block mx-auto">Add your own</Button>
                    </Link>
                    <Row className="mt-5 mb-3">
                        {sightings.map(sighting =>
                            <Col key={sighting._id} md={{ span: 6 }} lg={{ span: 4 }} >
                                <SightingCard
                                    name={sighting.specimen.commonName}
                                    {...sighting} />
                            </Col>
                        )}
                    </Row>
                </Container>
            }
        </div>
    )

}

export default SightingsList