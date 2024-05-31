import { Button, Card, Carousel, Container, Image } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import specimenServices from "../../services/specimen.services"
import Loader from "../../components/Loader/Loader"
import './MarineLifeDetailsPage.css'

const MarineLifeDetailsPage = () => {


  const [specimen, setSpecimen] = useState({
    commonName: '',
    scientificName: '',
    mediumSize: '',
    isEndemic: '',
    habitat: '',
    description: ''
  })

  const [isLoading, setIsLoading] = useState(true)
  const { specimenId } = useParams()


  useEffect(() => {
    loadSpecimenDetails()
  }, [])

  const loadSpecimenDetails = () => {

    specimenServices
      .getOneSpecimen(specimenId)
      .then(({ data }) => {
        setSpecimen(data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }



  return (
    <>
      {
        isLoading
          ?
          <Loader />
          :
          <Container className="SpecimenDetailsPage mt-3">
            <Carousel className="specimen-carousel">
              {specimen.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img className="carousel-image" src={image}
                    alt={specimen.commonName} />
                </Carousel.Item>
              ))}

            </Carousel>

            <Card className="mb-3" style={{ marginLeft: '10px', marginRight: '10px' }}>
              <Card.Body>
                <Card.Title className="text-center mt-3">{specimen.commonName}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted text-center">{specimen.scientificName}</Card.Subtitle>
                <Card.Text className="Description">Medium size: {specimen.mediumSize} | Endemic: {specimen.isEndemic} | Usual habitat: {specimen.habitat}</Card.Text>

                <Card.Text className="Description">{specimen.description}</Card.Text>
              </Card.Body>
            </Card>

            <Link to={`/marine-life/edit/${specimenId}`}>
              <Button className="custom-color-button mb-5" >Edit this specimen</Button>
            </Link>
          </Container>

      }
    </>
  )
}


export default MarineLifeDetailsPage