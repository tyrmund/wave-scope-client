import { useEffect, useState } from "react"
import sightingServices from "../../services/sighting.services"
import Loader from "../Loader/Loader"
import { Container, Row, Col } from "react-bootstrap"
import SightingCard from "../SightingCard/SightingCard"


const RecentSightings = ({ beach }) => {

    const [sightings, setSightings] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        loadSightingUserList();
    }, [beach])
    console.log(beach)

    const loadSightingUserList = () => {
        sightingServices
            .getAllSightings()
            .then(({ data }) => {
                console.log(data)
                const sightingsByBeach = data.filter(elm => elm.beach.name)
                setSightings(sightingsByBeach)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="WelcomePage mx-auto mt-3">
            <div >
                <br />
                <h3>Your Sightings</h3>

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

export default RecentSightings