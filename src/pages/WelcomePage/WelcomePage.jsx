
import { Container, Row, Col } from "react-bootstrap"
import SightingUserList from "../../components/SightingUserList/SightingUserList"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { useState, useEffect } from "react"
import Loader from "../../components/Loader/Loader"
import sightingServices from "../../services/sighting.services"
import SightingCard from "../../components/SightingCard/SightingCard"



const WelcomePage = () => {
  const { loggedUser } = useContext(AuthContext)

  const [sightings, setSightings] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAllSightings()
  }, [])

  const loadAllSightings = () => {

    sightingServices
      .getAllSightings({ totalItems: 3 })
      .then(({ data }) => {
        setSightings(data);
        setIsLoading(false)
      })
      .catch(err => console.log(err))

  }




  return (
    <Container className="WelcomePage mx-auto mt-3" style={{ padding: '0px' }}>
      <h1 style={{ marginTop: '60px', marginLeft: '15px' }}>{`Welcome to the wave, ${loggedUser.username}`}</h1>
      <h3 style={{ marginTop: '60px', marginLeft: '15px' }}>Your Sightings</h3>
      <Row>
        <SightingUserList />
      </Row>
      <h3 className="m-3">Recent Sightings of Wave Scope Community</h3>
      {
        isLoading
          ?
          <Loader />
          :

          <Row className="mt-5 mb-5 mx-auto">

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
      <Row>

      </Row>
    </Container>
  )
}

export default WelcomePage