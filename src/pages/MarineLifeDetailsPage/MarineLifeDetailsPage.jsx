import { Card, Container, Image } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import specimenServices from "../../services/specimen.services"
import Loader from "../../components/Loader/Loader"

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
    <Container className="SpecimenDetailsPage mt-3">
      {
        isLoading
          ?
          <Loader />
          :
          <Card style={{ width: '18rem' }}>
            <Card.Body >
              <Image src={specimen.images[0]} />
              <Card.Title className="text-center mt-3">{specimen.commonName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">{specimen.scientificName}</Card.Subtitle>
              <Card.Text className="mt-5">
                {specimen.description}
              </Card.Text>
            </Card.Body>
          </Card>

      }
    </Container>
  )
}

export default MarineLifeDetailsPage