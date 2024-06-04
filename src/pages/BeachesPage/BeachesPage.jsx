import { useContext } from "react"
import BeachesList from "../../components/BeachesList/BeachesList"
import { Button, } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import Search from "../../components/Search/Search"
import Loader from "../../components/Loader/Loader"

const BeachesPage = () => {

  const { loggedUser } = useContext(AuthContext)

  return (
    <div className="BeachesPage">
      <Search />
      <h2 className="mt-3 text-center"> Beaches</h2>
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