import { Button, Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const SpecimenCard = ({ images, commonName, scientificName, _id }) => {

  return (
    <Container className="SpecimenCard mt-3 mb-3" >

      <Card style={{ border: '0px' }}>

        <Link to={`/marine-life/${_id}`}>
          <Card.Img
            variant="top"
            src={images.length !== 0 ? images[0] : "https://res.cloudinary.com/dc7ycwd1u/image/upload/v1717428275/Anadir_un_titulo_2_zruph6.png"}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </Link>

        <Card.Body>
          <Card.Title className="mt-3" style={{ color: '#023047' }}>{commonName}</Card.Title>
          <Card.Subtitle className="text-muted" style={{ color: '#023047' }}>{scientificName}</Card.Subtitle>
          <Link to={`/marine-life/${_id}`}>
            <Button className="custom-color-button mt-3">More info</Button>
          </Link>
        </Card.Body>

      </Card>
    </Container>
  )
}

export default SpecimenCard