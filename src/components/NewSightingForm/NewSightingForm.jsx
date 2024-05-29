import { useEffect, useState, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import beachServices from "../../services/beach.services"
import specimenServices from "../../services/specimen.services"
import Loader from "../Loader/Loader"

const NewSightingForm = () => {

    const [beachesLoading, setBeachesLoading] = useState(true)
    const [specimensLoading, setSpecimensLoading] = useState(true)
    const [beaches, setBeaches] = useState()
    const [specimens, setSpecimens] = useState()

    const { authenticateUser } = useContext(AuthContext)

    const [newSighting, setNewSighting] = useState({
        image: '',
        latitude: '',
        longitude: '',
        beach: '',
        specimen: '',
        user: '',
        comment: '',
        confirmations: 0,
        rejections: 0
    })

    useEffect(() => {
        loadAllData()
    }, [])

    const loadAllData = () => {

        beachServices
            .getAllBeaches()
            .then(({ data }) => {
                setBeaches(data)
                setBeachesLoading(false)
            })
            .catch(err => console.log(err))

        specimenServices
            .getAllSpecimens()
            .then(({ data }) => {
                setSpecimens(data)
                setSpecimensLoading(false)
            })
            .catch(err => console.log(err))

    }

    const handleSubmitSightingForm = e => {

        e.preventDefault()

    }

    return (
        <div className="NewSightingForm">
            {(beachesLoading || specimensLoading) ? <Loader /> :
                <Form className="mt-5 mb-5">
                    <Row>
                        <Form.Group as={Col} md={{ span: 4, offset: 2 }} className="mb-3">
                            <Form.Label>Select sighting place</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Beaches</option>
                                {beaches.map(beach =>
                                    <option key={beach._id} value={beach._id}>{beach.name}</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} md={{ span: 4 }} className="mb-3">
                            <Form.Label>Select creature sighted</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Specimens</option>
                                {specimens.map(specimen =>
                                    <option key={specimen._id} value={specimen._id}>{specimen.commonName}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group className="m-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="http://www.example.com" />
                    </Form.Group>

                    <Form.Group className="m-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="5"
                            type="text"
                            placeholder="Cero trolleo por aquí, gracias" />
                    </Form.Group>

                    <Button className="m-5 d-block mx-auto" variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            }
        </div>
    )

}

export default NewSightingForm