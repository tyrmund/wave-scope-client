import { Link } from "react-router-dom"
import MarineLifeList from "../../components/MarineLifeList/MarineLifeList"
import { Button, Container } from "react-bootstrap"

const MarineLifePage = () => {


  return (
    <div className="MarineLifePage">
      <Container className="mt-3 text-center">
        <Link to={'/marine-life/new'}>
          <Button>Add a new specimen!</Button>
        </Link>
        <MarineLifeList />
      </Container>
    </div>
  )
}

export default MarineLifePage