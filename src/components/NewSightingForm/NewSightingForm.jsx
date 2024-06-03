import { useEffect, useState } from "react"
import { Form, Button, Image, Row, Col, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import Loader from "../Loader/Loader"
import ModalConfirm from "../ModalConfirm/ModalConfirm"
import beachServices from "../../services/beach.services"
import specimenServices from "../../services/specimen.services"
import sightingServices from "../../services/sighting.services"
import uploadServices from "../../services/upload.services"

const NewSightingForm = () => {

    const [beachesLoading, setBeachesLoading] = useState(true)
    const [specimensLoading, setSpecimensLoading] = useState(true)
    const [loadingImage, setLoadingImage] = useState(false)
    const [beaches, setBeaches] = useState()
    const [specimens, setSpecimens] = useState()
    const [onSite, setOnsite] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const navigate = useNavigate()

    const [newSighting, setNewSighting] = useState({
        images: [],
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

    }

    const handleFormChange = e => {
        const { name, value } = e.target
        setNewSighting({ ...newSighting, [name]: value })
    }

    const handleSwitchChange = e => {
        setOnsite(!onSite)
    }

    const handleFileUpload = e => {

        setLoadingImage(true)
        const formData = new FormData()

        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('imageData', e.target.files[i])
        }

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => {
                setNewSighting({ ...newSighting, images: data.cloudinary_urls })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })

    }

    const handleModalClose = () => setModalShow(false)
    const handleModalShow = () => setModalShow(true)

    const showErr = err => {

        console.log("GetCurrentPosition couldn't retrieve data:", err)
    }

    const showPos = (pos) => {

        newSighting.latitude = pos.coords.latitude
        newSighting.longitude = pos.coords.longitude
    }

    const handleSubmitSightingForm = e => {

        e.preventDefault()

        if (!newSighting.beach ||
            !newSighting.specimen ||
            newSighting.beach === 'Beaches' ||
            newSighting.specimen === 'Specimens') {
            handleModalShow()
            return
        }

        if (onSite) {

            navigator.geolocation.getCurrentPosition(showPos, showErr)

        } else {

            const selectedBeach = beaches.find(beach => beach._id = newSighting.beach)
            newSighting.latitude = selectedBeach.location.coordinates[0]
            newSighting.longitude = selectedBeach.location.coordinates[1]

        }

        sightingServices
            .newSighting(newSighting)
            .then(navigate('/sightings'))
            .catch(err => console.log(err))

    }

    return (
        <div className="NewSightingForm">
            {(beachesLoading || specimensLoading) ? <Loader /> :
                <Container>
                    <Form onSubmit={handleSubmitSightingForm} className="mt-5 mb-5">
                        <Row>
                            <Form.Group as={Col} xs={{ span: 6, offset: 3 }} md={{ span: 5 }} className="m-3">
                                <Form.Label>Select sighting place</Form.Label>
                                <Form.Select
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
                            <Form.Group
                                as={Col}
                                xs={{ span: 8, offset: 2 }}
                                md={{ span: 10, offset: 1 }}
                                className="m-3">
                                <Form.Label>Upload pictures</Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload} />
                            </Form.Group>
                        </Row>

                        <Row className="p-3 d-flex align-items-start">
                            {
                                newSighting.images.length > 0 &&
                                newSighting.images.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={image}
                                        style={{
                                            height: '50px',
                                            width: 'auto',
                                            objectFit: 'cover'
                                        }} />
                                ))
                            }
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
                                placeholder="Add a brief description or additional info" />
                        </Form.Group>

                        <Button
                            className="m-5 d-block mx-auto custom-color-button"
                            disabled={loadingImage}
                            variant="primary"
                            type="submit">
                            {loadingImage ? 'Loading image...' : 'Create new sighting'}
                        </Button>

                        <ModalConfirm
                            show={modalShow}
                            handleClose={handleModalClose}
                            handleConfirm={handleModalClose}
                            titleMessage={'Required fields incomplete'}
                            bodyMessage={'Please choose both a beach and a specimen.'}
                            buttonMessage={'Ok'} />
                    </Form>
                </Container>
            }
        </div>
    )

}

export default NewSightingForm