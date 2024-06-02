import BeachesList from "../../components/BeachesList/BeachesList"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const BeachesPage = () => {

  return (
    <div className="BeachesPage text-center">
      <Link to='/beaches/new'>
        <Button className="custom-color-button mb-3 mt-3">New Beach</Button>
      </Link>
      <BeachesList />
    </div>
  )
}

export default BeachesPage