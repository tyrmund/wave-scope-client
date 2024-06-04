import { Button, Container, Row, Col } from "react-bootstrap"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth.context"
import Loader from "../../components/Loader/Loader"
import beachServices from "../../services/beach.services"
import BeachCard from "../../components/BeachCard/BeachCard"

const WelcomePage = () => {
    const [beaches, setBeaches] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        loadBeaches()
    }, [])

    const loadBeaches = () => {
        beachServices
            .getOneBeach('/beaches')
            .then(({ data }) => {
                setBeaches(data)
                setIsloading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="WelcomePage mt-3" >
            <div>
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        <Row>
                            {beaches.map(beach => {

                                return (
                                    <Col md={{ span: 4 }} className="mb-5" key={beach._id}>

                                        <BeachCard {...beach} />

                                    </Col>
                                )
                            })
                            }
                        </Row>

                }
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        <Row>
                            {beaches.map(beach => {

                                return (
                                    <Col md={{ span: 12 }} className="mb-5" key={beach._id}>

                                        <BeachCard {...beach} />

                                    </Col>
                                )
                            })
                            }
                        </Row>

                }
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        <Row>
                            {beaches.map(beach => {

                                return (
                                    <Col md={{ span: 12 }} className="mb-5" key={beach._id}>

                                        <BeachCard {...beach} />

                                    </Col>
                                )
                            })
                            }
                        </Row>

                }

            </div>
        </Container>
    )
}

export default WelcomePage