import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { wasItAddedToday } from "../../utils/sightings.data"

const SightingCard = ({ _id, image, name, createdAt }) => {

    return (
        <div className="SightingCard">
            <Card className="m-3" style={{ border: 'none', maxHeight: '500px' }}>
                <Link to={`/sightings/${_id}`}>
                    <Card.Img style={{ height: '300px', objectFit: 'cover' }} variant="top" src={image} alt={name} />
                </Link>
                <Card.Body>
                    <Card.Title className="d-inline">{name}</Card.Title> {wasItAddedToday(createdAt) && <Card.Text className="d-inline" style={{ color: 'green', fontStyle: 'italic' }}>(New!)</Card.Text>}
                    <Card.Text>Time of sighting: {createdAt.substring(8, 10)}/{createdAt.substring(5, 7)}/{createdAt.substring(0, 4)}</Card.Text>
                    <Link style={{ textDecoration: 'none' }} to={`/sightings/${_id}`}>
                        <Button className="custom-color-button" variant="secondary">Details</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )

}

export default SightingCard