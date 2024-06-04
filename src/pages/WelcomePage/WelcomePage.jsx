import { useEffect, useState } from "react"
import sightingServices from "../../services/sighting.services"
import Loader from "../../components/Loader/Loader"
import { Container, Row, Col } from "react-bootstrap"
import SightingCard from "../../components/SightingCard/SightingCard"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"

const WelcomePage = ({ user }) => {
    const [sightings, setSightings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { loggedUser } = useContext(AuthContext)


    const [sightingData, setSightingData] = useState({
        user: user,
    })

    useEffect(() => {
        if (loggedUser) {
            loadSightingUserList();
        }
    }, [])

    useEffect(() => {
        const fullSightingInfo = { ...sightingData, user: loggedUser }
    }, [sightingData])


    const loadSightingUserList = () => {
        sightingServices
            .getAllSightings()
            .then(({ data }) => {
                const userSightings = data.filter(elm => elm.user === loggedUser._id)
                setSightings(userSightings)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="WelcomePage mx-auto mt-3">

            <div >
                <h2 className="m2-3">{`Welcome to the wave${loggedUser.username}`}</h2>
                <br />
                <h3>Sightings</h3>

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

export default WelcomePage