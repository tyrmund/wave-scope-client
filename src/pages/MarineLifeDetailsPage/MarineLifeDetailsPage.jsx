import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import specimenServices from "../../services/specimen.services"

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
    <div className="SpecimenDetailsPage">
      {
        isLoading
          ?
          <h1>Spinner</h1>
          :
          <Container>
            <p>{` Mi nombre es ${specimen.commonName}`}</p>
          </Container>

      }
    </div>
  )
}

export default MarineLifeDetailsPage