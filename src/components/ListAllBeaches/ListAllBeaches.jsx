import { Row, Col, Container } from "react-bootstrap"
import BeachCard from "../BeachCard/BeachCard"
import Loader from "../Loader/Loader"
import { useEffect, useState } from "react"
import beachServices from "../../services/beach.services"


const ListAllBeaches = () => {

    const [beaches, setBeaches] = useState([])
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        loadBeaches()
    }, [])

    const loadBeaches = () => {
        beachServices
            .getAllBeaches('/beaches')
            .then(({ data }) => {
                setBeaches(data)
                setIsloading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {
                isLoading
                    ?
                    <Loader />
                    :
                    <Container className="mt-5">
                        <Row>
                            {beaches.map(beach => {

                                return (
                                    <Col md={{ span: 6 }} className="mb-5" key={beach._id}>

                                        <BeachCard {...beach} />

                                    </Col>
                                )
                            })
                            }
                        </Row>
                    </Container>
            }
        </div>
    )
}

export default ListAllBeaches