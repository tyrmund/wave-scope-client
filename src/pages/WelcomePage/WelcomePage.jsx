
import { Container, Row, Col } from "react-bootstrap"
import SightingUserList from "../../components/SightingUserList/SightingUserList"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import RecentSightings from "../../components/SightingsByBeach/SightingsByBeach"
import { useState, useEffect } from "react"
import Loader from "../../components/Loader/Loader"
import sightingServices from "../../services/sighting.services"
import SightingCard from "../../components/SightingCard/SightingCard"



const WelcomePage = () => {
    const { loggedUser } = useContext(AuthContext)

    const [sightings, setSightings] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadAllSightings()
    }, [])

    const loadAllSightings = () => {

        sightingServices
            .getAllSightings({ totalItems: 3 })
            .then(({ data }) => {
                setSightings(data);
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }




    return (
        <Container className="WelcomePage mx-auto mt-3">
            <h1 className="m-3">{`Welcome to the wave, ${loggedUser.username}`}</h1>
            <Row>
                <SightingUserList />
            </Row>
            <h3>Recent Sightings</h3>
            {
                isLoading
                    ?
                    <Loader />
                    :
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
            }
            <Row>

            </Row>
        </Container>
    )
}

export default WelcomePage