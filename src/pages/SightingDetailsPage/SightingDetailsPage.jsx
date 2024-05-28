import { Accordion, Container, Spinner } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import sightingServices from '../../services/sighting.services'

const SightingDetailsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [sighting, setSighting] = useState({})
  const { sightingId } = useParams()

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

  console.log(sighting)

  return (
    <div className="SightingDetailsPage">
      {
        isLoading
          ?
          <Spinner animation="grow" variant="dark" />
          :
          <Container>
            <Accordion defaultActiveKey="0" className="mt-5">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Species Info</Accordion.Header>
                <Accordion.Body>
                  <img className="rounded" src={sighting.specimen.images[0]} />
                  <h1 className="fs-5 ">{sighting.specimen.commonName} <i>({sighting.specimen.scientificName})</i></h1>
                  <p>Average Size: {sighting.specimen.mediumSize}</p>
                  <p>Endemic to this region: {sighting.specimen.isEndemic}</p>
                  <p>Habitat: {sighting.specimen.habitat}</p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Region Info</Accordion.Header>
                <Accordion.Body>
                  <img className="rounded" src={sighting.beach.images[0]} />
                  <h1 className="fs-5 mt-3">{sighting.beach.name}</h1>
                  <hr />
                  <p>Length: {sighting.beach.length} m</p>
                  <p>Soil composition: {sighting.beach.composition}</p>
                  <p>Nearby Bus Stops: {sighting.beach.nearBusStops.length}</p>
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
            </Accordion>
          </Container>
      }
    </div>
  )
}

export default SightingDetailsPage