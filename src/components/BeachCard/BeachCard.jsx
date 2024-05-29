import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import './BeachCard.css'


const BeachCard = ({ name, images, description, length, composition, _id }) => {

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
                    <Card.Text >
                        {length} m
                    </Card.Text>
                    <Card.Text >
                        {composition}
                    </Card.Text>
                    <Link to={`/beaches/${_id}`}>
                        <Button variant="dark" size="md" >
                            More info
                        </Button>
                    </Link>
                </Card.Body>
            </Card>

        </div>
    )
}

export default BeachCard