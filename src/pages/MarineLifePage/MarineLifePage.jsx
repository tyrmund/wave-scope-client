import { Link } from "react-router-dom"
import MarineLifeList from "../../components/MarineLifeList/MarineLifeList"
import { Button, Container } from "react-bootstrap"

const MarineLifePage = () => {


  return (
    <div className="MarineLifePage">
      <Container className="mt-3" >
        <h1 className="mt-3 mb-3 text-center" style={{ fontSize: '60px' }}>Specimens</h1>
        <div className="text-center">
          <Link to={'/marine-life/new'}>
            <Button className="custom-color-button mt-3 mb-5" >Add a new specimen!</Button>
          </Link>
        </div>
        <MarineLifeList />
      </Container>
    </div>
  )
}

export default MarineLifePage