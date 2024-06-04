import { useContext } from "react"
import { Container, Card, Image, Row, Col } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import WorldIcon from "../../ReactIcons/WorldIcon"
import UserIcon from "../../ReactIcons/UserIcon"
import EmailIcon from "../../ReactIcons/EmailIcon"
import PostalCodeIcon from "../../ReactIcons/PostalCodeIcon"


const UserProfilePage = () => {

  const { loggedUser } = useContext(AuthContext)

  console.log(loggedUser)

  return (
    <Container className="UserProfilePage mt-3 mb-3">

      <Card style={{ backgroundColor: '#F7F0D3' }}>
        <Row style={{ marginBottom: '30px' }}>
          <Col md={{ span: 5 }}>
            <Image className="d-block mx-auto mt-5" src={loggedUser.profilePic} style={{ objectFit: 'cover', width: '250px' }} roundedCircle />
          </Col>
          <Col className="mt-3">
            <Card.Body>
              <Card.Title><UserIcon /> Username</Card.Title>
              <Card.Text>{loggedUser.username}</Card.Text>
              <Card.Title><EmailIcon /> Email</Card.Title>
              <Card.Text>{loggedUser.email}</Card.Text>
              <Card.Title><WorldIcon /> Country</Card.Title>
              <Card.Text>{loggedUser.country}</Card.Text>
              <Card.Title><PostalCodeIcon /> Postal Code</Card.Title>
              <Card.Text>{loggedUser.postalCode}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

    </Container>
  )
}

export default UserProfilePage