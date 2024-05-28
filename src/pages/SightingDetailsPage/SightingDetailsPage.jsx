import { Container, Spinner } from "react-bootstrap"
import sightingServices from '../../services/sighting.services'

const SightingDetailsPage = () => {

  // const [isLoading, setIsLoading] = useState(true)
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
        //   setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      {
        // isLoading
        //   ?
        //   <Spinner animation="grow" variant="dark" />
        //   :
        <Container>
          <p>{` ¿Lo he visto? ${sighting.confirmation}`}</p>
        </Container>
      }
    </div>
  )
}

export default SightingDetailsPage