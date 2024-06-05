import { useEffect, useState } from "react"
import sightingServices from "../../services/sighting.services"
import Loader from "../Loader/Loader"
import { Container, Row, Col } from "react-bootstrap"
import SightingCard from "../SightingCard/SightingCard"


const SightingsByBeach = ({ beach }) => {

    const [sightings, setSightings] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        loadSightingsBeachList();
    }, [beach])


    const loadSightingsBeachList = () => {
        sightingServices
            .getAllSightings()
            .then(({ data }) => {
                console.log(data)
                const sightingsByBeach = data.filter(elm => elm.beach._id === beach)
                console.log(beach._id)
                setSightings(sightingsByBeach)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="WelcomePage mx-auto mt-3">
            <div >
                <br />
                <h3>Sightings in this beach</h3>

                {
                    isLoading
                        ?
                        <Loader />
                        :
                        <Container className="SightingsList mb-5">

                            <Row className="mt-5 mb-3">
                                {
                                    sightings.map(sighting =>
                                        <Col
                                            key={sighting._id}
                                            xs={{ span: 12 }}
                                            md={{ span: 6 }}
                                            lg={{ span: 4 }}
                                        >
                                            <SightingCard
                                                name={sighting.specimen.commonName}
                                                username={sighting.user.username}
                                                {...sighting} />
                                        </Col>
                                    )
                                }
                            </Row>
                        </Container>
                }
            </div>
        </Container>
    )
}

export default SightingsByBeach