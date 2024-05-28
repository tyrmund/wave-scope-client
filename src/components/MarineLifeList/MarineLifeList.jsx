import { Col, Row } from "react-bootstrap"
import SpecimenCard from "../SpecimenCard/SpecimenCard"
import { useEffect, useState } from "react"
import specimenServices from "../../services/specimen.services"
import { Link } from "react-router-dom"
import Loader from "./../Loader/Loader"


const MarineLifeList = () => {

  const [specimens, setSpecimens] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAllSpecimens()
  }, [])

  const loadAllSpecimens = () => {

    specimenServices
      .getAllSpecimens()
      .then(({ data }) => {
        setSpecimens(data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="MarineLifeList">
      {
        isLoading ? <Loader /> :
          <Row>
            {
              specimens.map(specimen => {

                return (

                  <Col key={specimen._id} sm={{ span: 8, offset: 2 }}>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={`/marine-life/${specimens._id}`}
                    >
                      <SpecimenCard {...specimen} />
                    </Link>
                  </Col>
                )
              }
              )
            }
          </Row>
      }
    </div>
  )
}

export default MarineLifeList