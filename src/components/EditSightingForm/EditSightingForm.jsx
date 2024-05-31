import { useEffect, useState, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

import beachServices from "../../services/beach.services"
import specimenServices from "../../services/specimen.services"
import sightingServices from "../../services/sighting.services"
import Loader from "../Loader/Loader"

const EditSightingForm = () => {

    const [beachesLoading, setBeachesLoading] = useState(true)
    const [specimensLoading, setSpecimensLoading] = useState(true)
    const [sightingLoading, setSightingLoading] = useState(true)

    const [beaches, setBeaches] = useState()
    const [specimens, setSpecimens] = useState()
    const [onSite, setOnsite] = useState(false)

    const { sightingId } = useParams()
    const navigate = useNavigate()

    const [sightingData, setSightingData] = useState({
        image: '',
        latitude: 0,
        longitude: 0,
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

        sightingServices
            .getOneSighting(sightingId)
            .then(({ data }) => {
                setSightingData({
                    image: data.image,
                    latitude: data.location.coordinates[1],
                    longitude: data.location.coordinates[0],
                    beach: data.beach._id,
                    specimen: data.specimen._id,
                    user: data.user._id,
                    comment: data.comment,
                    confirmations: data.confirmations,
                    rejections: data.rejections
                })
                console.log(data)
                setSightingLoading(false)
            })
            .catch(err => console.log(err))

    }

    const handleFormChange = e => {
        const { name, value } = e.target
        setSightingData({ ...sightingData, [name]: value })
    }

    const handleSwitchChange = e => {
        setOnsite(!onSite)
    }

    const showErr = err => {

        console.log("GetCurrentPosition couldn't retrieve data:", err)
    }

    const showPos = (pos) => {

        sightingData.latitude = pos.coords.latitude
        sightingData.longitude = pos.coords.longitude
    }

    const handleSubmitSightingForm = e => {

        e.preventDefault()

        if (onSite) {

            navigator.geolocation.getCurrentPosition(showPos, showErr)

        } else {

            const selectedBeach = beaches.find(beach => beach._id = sightingData.beach)
            sightingData.latitude = selectedBeach.location.coordinates[0]
            sightingData.longitude = selectedBeach.location.coordinates[1]

        }

        sightingServices
            .editSighting(sightingId, sightingData)
            .then(navigate('/sightings'))
            .catch(err => console.log(err))

    }

    return (
        <div className="EditSightingForm">
            {(beachesLoading || specimensLoading || sightingLoading) ? <Loader /> :
                <Form onSubmit={handleSubmitSightingForm} className="mt-5 mb-5">
                    <Row>
                        <Form.Group as={Col} xs={{ span: 6, offset: 3 }} md={{ span: 5 }} className="m-3">
                            <Form.Label>Select sighting place</Form.Label>
                            <Form.Select
                                required
                                name="beach"
                                value={sightingData.beach}
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
                                value={sightingData.specimen}
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
                                value={sightingData.image}
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
                            value={sightingData.comment}
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

export default EditSightingForm