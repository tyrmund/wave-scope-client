import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"
import './BeachCard.css'


const BeachCard = ({ name, images, length, composition, _id }) => {

    return (
        <div className="BeachCard mx-auto">

            <Card className="shadow-sm border-0 ">
                <Link to={`/beaches/${_id}`}>
                    <Card.Img variant="top"
                        src={images[0]}
                        className="rounded-top equal-aspect-ratio"
                    />
                </Link>
                <Card.Body >
                    <Card.Title>{name}</Card.Title>
                    <Row>
                        <Col md="5" className="mb-5">
                            <Card.Text >
                                Longitude: {length} m
                            </Card.Text>
                        </Col>
                        <Col md="6" className="mb-5">
                            <Card.Text >
                                Texture: {composition}
                            </Card.Text>
                        </Col>
                    </Row>
                    <Link to={`/beaches/${_id}`}>
                        <Button className='custom-color-button' size="md" >
                            More info
                        </Button>
                    </Link>
                </Card.Body>
            </Card>

        </div>
    )
}

export default BeachCard