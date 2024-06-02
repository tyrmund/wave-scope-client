import { useContext } from "react"
import { Container, Card, Image, Row, Col } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"


const UserProfilePage = () => {

  const { loggedUser } = useContext(AuthContext)

  console.log(loggedUser)

  return (
    <Container className="UserProfilePage mt-3">

      <Card style={{ backgroundColor: '#F7F0D3' }}>
        <Row style={{ marginBottom: '30px' }}>
          <Col xs={6} md={4}>
            <Image src='https://res.cloudinary.com/dtetsfefb/image/upload/v1715846542/amelie_poster_kctasw.jpg' style={{ objectFit: 'cover' }} roundedCircle />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>Username</Card.Title>
              <Card.Text>{loggedUser.username}</Card.Text>
              <Card.Title>Email</Card.Title>
              <Card.Text>{loggedUser.email}</Card.Text>
              <Card.Title>Country</Card.Title>
              <Card.Text>{loggedUser.country}</Card.Text>
              <Card.Title>Postal Code</Card.Title>
              <Card.Text>{loggedUser.postalCode}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

    </Container>
  )
}

export default UserProfilePage