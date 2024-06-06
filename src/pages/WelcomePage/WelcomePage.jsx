
import { Container, Row, Col, Card } from "react-bootstrap"
import SightingUserList from "../../components/SightingUserList/SightingUserList"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { useState, useEffect } from "react"
import Loader from "../../components/Loader/Loader"
import sightingServices from "../../services/sighting.services"
import SightingCard from "../../components/SightingCard/SightingCard"
import beachServices from "../../services/beach.services"
import CustomMap from "../../components/CustomMap/CustomMap"
import './WelcomePage.css'



const WelcomePage = () => {
  const { loggedUser } = useContext(AuthContext)

  const [sightings, setSightings] = useState()
  const [isSightingsLoading, setSightingsLoading] = useState(true)
  const [isBeachesLoading, setBeachesLoading] = useState(true)
  const [beaches, setBeaches] = useState([])

  useEffect(() => {
    loadAllSightings()
    loadBeaches()
  }, [])

  const loadAllSightings = () => {

    sightingServices
      .getAllSightings({ totalItems: 3 })
      .then(({ data }) => {
        setSightings(data);
        setSightingsLoading(false)
      })
      .catch(err => console.log(err))

  }


  const loadBeaches = () => {
    beachServices
      .getAllBeaches('/beaches')
      .then(({ data }) => {
        setBeaches(data)
        setBeachesLoading(false)
      })
      .catch(err => console.log(err))
  }


  return (
    <Container className="WelcomePage mx-auto mt-3">
      <h1 className="m-5">{`Welcome to the wave, ${loggedUser.username}`}</h1>
      <Row>
        <h3>Your Sightings</h3>
        <SightingUserList />
      </Row>

      <Row>
        <Card.Body className="p-2 MapCard" >
          <Card.Title className="m-5">
            <h2> Your visited coastal sites</h2>
          </Card.Title>
          {
            isBeachesLoading
              ?
              <Loader />
              :
              <CustomMap
                zoom={3}
                center={beaches[0].location}
                markers={beaches}
                type={'beaches'}
              />
          }
        </Card.Body>
      </Row>

      <h3 className="mt-5">Recent Sightings of Wave Scope Community</h3>
      {
        isSightingsLoading
          ?
          <Loader />
          :
          <Row>
            {
              sightings.map(sighting =>
                <Col
                  key={sighting._id}
                  xs={{ span: 12 }}
                  md={{ span: 6 }}
                  lg={{ span: 4 }}
                >
                  <SightingCard
                    name={sighting.specimen.commonName}
                    username={sighting.user.username}
                    {...sighting} />
                </Col>
              )
            }
          </Row>
      }

    </Container >
  )
}

export default WelcomePage