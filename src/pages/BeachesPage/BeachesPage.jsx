import { useContext } from "react"
import BeachesList from "../../components/BeachesList/BeachesList"
import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import Loader from "../../components/Loader/Loader"

const BeachesPage = () => {

  const { loggedUser } = useContext(AuthContext)

  return (
    <div className="BeachesPage">
      {
        loggedUser && loggedUser.role === "admin" &&

        <div className="text-center">
          <Link to='/beaches/new'>
            <Button className="custom-color-button mb-3 mt-3">New Beach</Button>
          </Link>
        </div>
      }
      <BeachesList />
    </div>
  )
}

export default BeachesPage