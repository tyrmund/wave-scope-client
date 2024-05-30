import { Card, Carousel, Image } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import specimenServices from "../../services/specimen.services"
import Loader from "../../components/Loader/Loader"
import './MarineLifeDetailsPage.css'

const MarineLifeDetailsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [specimen, setSpecimen] = useState({})
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
          <div className="SpecimenDetailsPage">
            <Carousel className="specimen-carousel">
              {specimen.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img className="carousel-image" src={image}
                    alt={specimen.commonName} />
                </Carousel.Item>
              ))}

            </Carousel>

            <div className="specimenDetails-titular mt-3">
              <h1>{specimen.commonName}</h1>
              <h2>{specimen.scientificName}</h2>

            </div>
          </div>


        // <Card style={{ width: '18rem' }}>
        //   <Card.Body >
        //     <Image src={specimen.images[0]} />
        //     <Card.Title className="text-center mt-3">{specimen.commonName}</Card.Title>
        //     <Card.Subtitle className="mb-2 text-muted text-center">{specimen.scientificName}</Card.Subtitle>
        //     <Card.Text className="mt-5">
        //       {specimen.description}
        //     </Card.Text>
        //   </Card.Body>
        // </Card>

      }
    </>
  )
}


export default MarineLifeDetailsPage