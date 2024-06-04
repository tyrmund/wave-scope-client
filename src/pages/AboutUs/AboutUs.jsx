import { Card, Container, Row, Col } from "react-bootstrap"
import './AboutUs.css'
import { Link, useHref } from "react-router-dom"

const AboutUs = () => {




    return (


        <Container className="AboutUs mb-5">

            <Row>
                <Col md={{ span: 4 }}>
                    <Card className="m-5 border-0">
                        <Link to="https://github.com/tyrmund/">
                            <Card.Img className="AboutUsPictures" variant="top" src="https://res.cloudinary.com/du8mlfcf9/image/upload/v1717432575/Rodolfo_obukun.jpg"></Card.Img>
                        </Link>
                        <Card.Body>
                            <Card.Title> Rodolfo Bittkau </Card.Title>
                            <Card.Text>Web Developer</Card.Text>
                            <Link className="GitHubLink fw-bold" to="https://github.com/tyrmund/">GitHub Link</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={{ span: 4 }}>
                    <Card className="m-5 border-0">
                        <Card.Img className="AboutUsPictures" variant="top" src="https://res.cloudinary.com/du8mlfcf9/image/upload/v1717432565/Daniela_y8urf5.jpg"></Card.Img>
                        <Card.Body>
                            <Card.Title> Daniela Astorga </Card.Title>
                            <Card.Text>Web Developer</Card.Text>
                            <Link className="GitHubLink fw-bold" to="https://github.com/Drialis">GitHub Link</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="m-5 border-0">
                        <Link to="https://github.com/Drialis">
                            <Card.Img className="AboutUsPictures" variant="top" src="https://res.cloudinary.com/du8mlfcf9/image/upload/v1717434166/me_jlps1g.jpg"></Card.Img>
                        </Link>
                        <Card.Body>
                            <Card.Title> Paloma Rehecho </Card.Title>
                            <Card.Text>Web Developer</Card.Text>
                            <Link className="GitHubLink fw-bold" to="https://github.com/Drialis">GitHub Link</Link>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>


    )
}

export default AboutUs