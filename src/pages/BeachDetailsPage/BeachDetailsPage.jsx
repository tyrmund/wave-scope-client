import { Button, Card, Carousel, CardBody, Badge, Container, Row, Col } from 'react-bootstrap'
import './BeachDetailsPage.css'
import { useState, useEffect } from 'react'
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Loader from "../../components/Loader/Loader"
import beachServices from "../../services/beach.services"


const BeachDetailsPage = () => {


  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const showConfirmModal = () => setShow(true)

  const [isLoading, setIsLoading] = useState(true)
  const [beach, setBeach] = useState({})
  const { beachId } = useParams()

  useEffect(() => {
    loadBeachDetails()
  }, [])

  const loadBeachDetails = () => {

    beachServices
      .getOneBeach(beachId)
      .then(({ data }) => {
        setBeach(data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  const navigate = useNavigate()

  const deleteThisBeach = () => {

    beachServices
      .deleteBeach(beachId)
      .then(() => {
        handleClose()
        navigate(`/beaches`)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Container className='BeachDetailsPage mt-5'>

      <div>
        {
          isLoading
            ?
            <Loader />
            :
            <>
              <Card className="BeachDetailsCard">
                <Card.Body>

                  <Carousel>
                    {beach.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img className="d-block w-100 img-fluid" style={{ height: 450, objectFit: "cover", objectPosition: "center bottom" }}
                          src={image}
                          alt={beach.name} />
                      </Carousel.Item>
                    )
                    )}
                  </Carousel>
                </Card.Body>
                <Card.Body>
                  <Card.Title>{`${beach.name}`}</Card.Title>
                  <Card.Text>
                    {`Location: ${beach.location.coordinates[0]}, ${beach.location.coordinates[1]} `}
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Text className="Description">
                    {beach.description}
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Text className='h6'>
                    Nearest Bus Stops
                  </Card.Text>

                  {beach.nearBusStops.map((busStop, index) =>
                    <div key={busStop._id}>
                      <h3 className="fs-6 mt-3">• {busStop.name}</h3>
                      {busStop.lines.map((line, index) =>
                        <Badge key={index} bg="info">{line}</Badge>
                      )}
                    </div>
                  )}

                </Card.Body>

                <Card.Body>
                  <Link to='/beaches'>
                    <Button className="custom-color-button mb-3">Nearest beaches</Button>
                  </Link>
                  <Link to='/'>
                    <Button className="custom-color-button">The fauna today</Button>
                  </Link>
                </Card.Body>
              </Card>
              <Row className='mx-auto'>
                <Col md={{ span: 6 }} className='m-5'>
                  <Button className='delete-color-button button-margin' onClick={showConfirmModal}> Delete this beach</Button>
                  <Link to={`/beaches/edit/${beachId}`}>
                    <Button className="custom-color-button">Edit this beach </Button>
                  </Link>
                </Col>
              </Row>
              <ModalConfirm show={show}
                handleClose={handleClose}
                handleConfirm={deleteThisBeach}
                bodyMessage={'You will delete this beach'}
                buttonMessage={'Confirm'} />
            </>
        }
      </div>
    </Container>
  )
}

export default BeachDetailsPage