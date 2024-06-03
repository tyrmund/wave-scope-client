import { Accordion, Container, Spinner, Carousel, Row, Col, Badge, Button } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import sightingServices from '../../services/sighting.services'
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm"
import './SightingDetailsPage.css'

const SightingDetailsPage = () => {

  const { loggedUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [sighting, setSighting] = useState({})
  const [modalShow, setModalShow] = useState(false)
  const { sightingId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadSightingDetails()
  }, [])

  const loadSightingDetails = () => {

    sightingServices
      .getOneSighting(sightingId)
      .then(({ data }) => {
        setSighting(data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  const handleModalClose = () => setModalShow(false)
  const handleModalShow = () => setModalShow(true)

  const deleteSighting = () => {

    sightingServices
      .deleteSighting(sighting._id)
      .then(navigate('/sightings'))
      .catch(err => console.log(err))

  }

  return (
    <div className="SightingDetailsPage">
      {
        isLoading
          ?
          <Spinner animation="grow" variant="dark" />
          :
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Container>
                  <Carousel>
                    {sighting.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100 img-fluid mt-5 rounded"
                          style={{ height: 450, objectFit: "cover", objectPosition: "center top" }}
                          src={image}
                          alt={sighting.specimen.scientificName} />
                      </Carousel.Item>
                    )
                    )}
                  </Carousel>
                  <h1 className="text-center mt-3 fs-6">
                    Sighting date: {sighting.createdAt.substring(8, 10)}/{sighting.createdAt.substring(5, 7)}/{sighting.createdAt.substring(0, 4)}</h1>
                  <h1 className="text-center fs-6">
                    At {sighting.location.coordinates[0].toString().substring(0, 10)}, {sighting.location.coordinates[1].toString().substring(0, 9)}</h1>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Accordion className="mt-3 mb-5 shadow-lg sand-colored">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{sighting.specimen.commonName}&nbsp;<i>({sighting.specimen.scientificName})</i></Accordion.Header>
                    <Accordion.Body>
                      <Link to={`/marine-life/${sighting.specimen._id}`}>
                        <img className="rounded" src={sighting.specimen.images[0]} />
                      </Link>
                      <p className="mt-3">Average Size: {sighting.specimen.mediumSize}</p>
                      <p>Endemic to this region: {sighting.specimen.isEndemic}</p>
                      <p>Usual Habitat: {sighting.specimen.habitat}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Region Info</Accordion.Header>
                    <Accordion.Body>
                      <Link to={`/beaches/${sighting.beach._id}`}>
                        <img className="rounded" src={sighting.beach.images[0]} />
                      </Link>
                      <h1 className="fs-5 mt-3">{sighting.beach.name}</h1>
                      <hr />
                      <p>Coast Length: {sighting.beach.length} m</p>
                      <p>Soil Composition: {sighting.beach.composition}</p>
                      <h2 className="fs-6">Nearby Bus Stops</h2>
                      {sighting.beach.nearBusStops.map((busStop, index) =>
                        <div key={busStop._id}>
                          <h3 className="fs-6 mt-3">• {busStop.name}</h3>
                          {busStop.lines.map((line, index) =>
                            <Badge key={index} bg="info">{line}</Badge>
                          )}
                        </div>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>User Input</Accordion.Header>
                    <Accordion.Body>
                      <i className="mb-3">{sighting.comment}</i>
                      <hr />
                      <p>Confirmations: {sighting.confirmations}</p>
                      <p>Rejections: {sighting.rejections}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                  {loggedUser._id === sighting.user._id &&
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Options</Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col md={{ span: 2 }}>
                            <Link to={`/sightings/edit/${sighting._id}`}>
                              <Button className="custom-color-button">Edit</Button>
                            </Link>
                          </Col>
                          <Col md={{ span: 2, offset: 1 }}>
                            <Button
                              className="delete-color-button"
                              onClick={handleModalShow}>
                              Delete</Button>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  }
                </Accordion>
              </Col>
            </Row>
            <ModalConfirm
              show={modalShow}
              handleClose={handleModalClose}
              handleConfirm={deleteSighting}
              titleMessage={'Confirm deletion'}
              bodyMessage={'This will remove the current sighting.'}
              buttonMessage={'Confirm'} />
          </Container>
      }
    </div>
  )
}

export default SightingDetailsPage