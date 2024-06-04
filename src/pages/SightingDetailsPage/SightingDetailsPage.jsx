import { Accordion, Container, Spinner, Carousel, Row, Col, Badge, Button } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import sightingServices from '../../services/sighting.services'

import CustomMap from "../../components/CustomMap/CustomMap"
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm"
import LikeButton from "../../ReactIcons/LikeButton"
import DislikeButton from "../../ReactIcons/DislikeButton"
import './SightingDetailsPage.css'

const SightingDetailsPage = () => {

  const { loggedUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [sighting, setSighting] = useState({})
  const [modalShow, setModalShow] = useState(false)
  const { sightingId } = useParams()
  const navigate = useNavigate()

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false)

  useEffect(() => {
    loadSightingDetails()
  }, [])

  const handleClickLike = () => {
    setLiked(!liked)
  }

  const handleClickDislike = () => {
    setDisliked(!disliked)
  }

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
    <div>
      {
        isLoading
          ?
          <Spinner animation="grow" variant="dark" />
          :
          <Container className="SightingDetailsPage">
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Container>

                  <Carousel>
                    {sighting.images.length !== 0 ?
                      sighting.images.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100 img-fluid mt-5 rounded"
                            style={{ height: 450, objectFit: "cover", objectPosition: "center top" }}
                            src={image}
                            alt={sighting.specimen.scientificName} />
                        </Carousel.Item>
                      ))
                      :
                      <Carousel.Item>
                        <img
                          className="d-block w-100 img-fluid mt-5 rounded"
                          style={{ height: 450, objectFit: "cover", objectPosition: "center top" }}
                          src="https://res.cloudinary.com/dc7ycwd1u/image/upload/v1717428275/Anadir_un_titulo_2_zruph6.png"
                          alt="pic-not-provided" />
                      </Carousel.Item>
                    }
                  </Carousel>

                  <CustomMap zoom={16} center={sighting.location} markers={sighting.location} type={'sighting'} />

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
                      "{sighting.comment}"
                      <br />
                      <i className="mb-3">by {sighting.user.username}</i>
                      <br />
                      <h1 className="text-center mt-3 fs-6">
                        Sighting date: {sighting.createdAt.substring(8, 10)}/{sighting.createdAt.substring(5, 7)}/{sighting.createdAt.substring(0, 4)}</h1>
                      <hr />
                      <Row className="Confirmations-Row mb-3">
                        <Col>
                          <p>Confirmations: {sighting.confirmations}</p>
                        </Col>
                        <Col>
                          <LikeButton handleClick={handleClickLike} />
                        </Col>
                      </Row>
                      <Row className="Rejections-Row">
                        <Col>
                          <p>Rejections: {sighting.rejections}</p>
                        </Col>
                        <Col>
                          <DislikeButton handleClick={handleClickDislike} />
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  {(loggedUser._id === sighting.user._id || loggedUser.role === 'admin') &&
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Options</Accordion.Header>
                      <Accordion.Body>

                        <Row>
                          <Col
                            xs={{ span: 3, offset: 3 }}
                            md={{ span: 4 }}
                            lg={{ span: 4 }}>
                            <Link to={`/sightings/edit/${sighting._id}`}>
                              <Button className="custom-color-button button-margin mt-2 mb-2">Edit</Button>
                            </Link>
                          </Col>
                          <Col
                            xs={{ span: 3 }}
                            md={{ span: 4 }}
                            lg={{ span: 4 }}>
                            <Button
                              className="delete-color-button mt-2 mb-2"
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