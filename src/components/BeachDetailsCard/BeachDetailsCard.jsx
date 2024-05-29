import { Card, Carousel, CardBody, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import beachServices from "../../services/beach.services"
import Loader from "../../components/Loader/Loader"
import './BeachDetailsCard.css'


const BeachDetailsCard = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [beach, setBeach] = useState({})
    const { beachId } = useParams()

    useEffect(() => {
        loadBeachDetails()
    }, [])

    const loadBeachDetails = () => {

        beachServices
            .getOneBeach(beachId)
            .then(({ data }) => {
                setBeach(data)
                setIsLoading(false)
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
                    <Card className="BeachDetailsCard">
                        <Card.Body>

                            <Carousel>
                                {beach.images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img className="d-block w-100 img-fluid" style={{ height: 450, objectFit: "cover", objectPosition: "center bottom" }}
                                            src={image}
                                            alt={beach.name} />
                                    </Carousel.Item>
                                )
                                )}
                            </Carousel>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>{`${beach.name}`}</Card.Title>
                            <Card.Text>
                                {`Location: ${beach.location.coordinates[0]}, ${beach.location.coordinates[1]} `}
                            </Card.Text>
                        </Card.Body>
                        <CardBody>
                            <Card.Text className="Description">
                                {beach.description}
                            </Card.Text>
                        </CardBody>

                        <Card.Body>
                            <Link to='/beaches'>
                                <Button className="custom-color-button">Nearest beaches</Button>
                            </Link>
                            <Link to='/'>
                                <Button className="custom-color-button">The fauna today</Button>
                            </Link>
                        </Card.Body>
                    </Card>
            }
        </div>
    )


}


export default BeachDetailsCard