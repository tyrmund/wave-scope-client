import { useContext } from "react"
import BeachesList from "../../components/BeachesList/BeachesList"
import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"

const BeachesPage = () => {

  const { loggedUser } = useContext(AuthContext)
  console.log(loggedUser)
  return (
    <Container className="BeachesPage mb-5">
      <div >
        {
          loggedUser.role === "admin" &&
          <div className="text-center">

            <Link to='/beaches/new'>
              <Button className="custom-color-button mb-3 mt-3">New Beach</Button>
            </Link>
          </div>
        }
        <BeachesList />
      </div>
    </Container>
  )
}

export default BeachesPage