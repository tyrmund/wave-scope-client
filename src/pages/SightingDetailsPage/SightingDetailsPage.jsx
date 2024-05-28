import { Container } from "react-bootstrap"
import sightingServices from '../../services/sighting.services'

const SightingDetailsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [sighting, setSighting] = useState({})
  const { sightingId } = useParams()

  useEffect(() => {
    loadSightingDetails()
  }, [])

  const loadSightingDetails = () => {

    sightingServices
      .getOneSighting(sightingId)
      .then(({ data }) => setSighting(data))
      .catch(err => console.log(err))

    setIsLoading(false)
  }

  return (
    <div>
      {
        isLoading
          ?
          <h1>Spinner</h1>
          :

          <Container>
            <p>{` ¿Lo he visto? ${sighting.confirmation}`}</p>
          </Container>
      }
    </div>
  )
}

export default SightingDetailsPage