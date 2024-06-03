import { Card, Button, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import { wasItAddedToday } from "../../utils/sightings.data"

const SightingCard = ({ _id, images, name, createdAt }) => {

    return (
        <div className="SightingCard">
            <Card className="m-3" style={{ border: 'none', maxHeight: '500px' }}>
                <Link to={`/sightings/${_id}`}>
                    <Card.Img style={{ height: '300px', objectFit: 'cover' }} variant="top" src={images.length !== 0 ? images[0] : "https://res.cloudinary.com/dc7ycwd1u/image/upload/v1717428275/Anadir_un_titulo_2_zruph6.png"} alt={name} />
                </Link>
                <Card.Body>
                    <div className='mb-2'>
                        <Card.Title className="d-inline">{name}</Card.Title> {wasItAddedToday(createdAt) && <Badge className="d-inline" bg='info'>New!</Badge>}
                    </div>
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