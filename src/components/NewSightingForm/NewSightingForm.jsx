import { useEffect, useState, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from "react-router-dom"

import beachServices from "../../services/beach.services"
import specimenServices from "../../services/specimen.services"
import sightingServices from "../../services/sighting.services"
import Loader from "../Loader/Loader"

const NewSightingForm = () => {

    const [beachesLoading, setBeachesLoading] = useState(true)
    const [specimensLoading, setSpecimensLoading] = useState(true)
    const [beaches, setBeaches] = useState()
    const [specimens, setSpecimens] = useState()
    const [onSite, setOnsite] = useState(false)
    const navigate = useNavigate()

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

    const handleFormChange = e => {
        const { name, value } = e.target
        setNewSighting({ ...newSighting, [name]: value })
    }

    const handleSwitchChange = e => {
        setOnsite(!onSite)
    }

    const showErr = err => {

        console.log("GetCurrentPosition couldn't retrieve data:", err)
    }

    const showPos = (pos) => {

        newSighting.latitude = pos.coords.latitude
        newSighting.longitude = pos.coords.longitude
    }

    const handleSubmitSightingForm = e => {

        e.preventDefault()

        if (onSite) {

            navigator.geolocation.getCurrentPosition(showPos, showErr)

        } else {

            const selectedBeach = beaches.find(beach => beach._id = newSighting.beach)
            newSighting.latitude = selectedBeach.location.coordinates[0]
            newSighting.longitude = selectedBeach.location.coordinates[1]

        }

        sightingServices
            .newSighting({ newSighting })
            .then(navigate('/sightings'))
            .catch(err => console.log(err))

    }

    return (
        <div className="NewSightingForm">
            {(beachesLoading || specimensLoading) ? <Loader /> :
                <Form onSubmit={handleSubmitSightingForm} className="mt-5 mb-5">
                    <Row>
                        <Form.Group as={Col} xs={{ span: 6, offset: 3 }} md={{ span: 5 }} className="m-3">
                            <Form.Label>Select sighting place</Form.Label>
                            <Form.Select
                                required
                                name="beach"
                                value={newSighting.beach}
                                onChange={handleFormChange}
                                aria-label="Default select example">
                                <option>Beaches</option>
                                {beaches.map(beach =>
                                    <option key={beach._id} value={beach._id}>{beach.name}</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} xs={{ span: 6, offset: 3 }} md={{ span: 5 }} className="m-3">
                            <Form.Label>Select creature sighted</Form.Label>
                            <Form.Select
                                required
                                name="specimen"
                                value={newSighting.specimen}
                                onChange={handleFormChange}
                                aria-label="Default select example">
                                <option>Specimens</option>
                                {specimens.map(specimen =>
                                    <option key={specimen._id} value={specimen._id}>{specimen.commonName}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Check
                        className="m-3"
                        type="switch"
                        id="custom-switch"
                        label="I'm reporting on site"
                        onChange={handleSwitchChange}
                    />

                    <Row>
                        <Form.Group as={Col} xs={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} className="m-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={newSighting.image}
                                onChange={handleFormChange}
                                placeholder="http://www.example.com" />
                        </Form.Group>
                    </Row>

                    <Form.Group className="m-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="5"
                            name="comment"
                            type="text"
                            value={newSighting.comment}
                            onChange={handleFormChange}
                            placeholder="Cero trolleo por aquí, gracias" />
                    </Form.Group>

                    <Button className="m-5 d-block mx-auto custom-color-button" variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            }
        </div>
    )

}

export default NewSightingForm