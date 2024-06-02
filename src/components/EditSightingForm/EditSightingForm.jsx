import { useEffect, useState, useContext } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

import Loader from "../Loader/Loader"
import ModalConfirm from "../ModalConfirm/ModalConfirm"
import beachServices from "../../services/beach.services"
import specimenServices from "../../services/specimen.services"
import sightingServices from "../../services/sighting.services"
import uploadServices from "../../services/upload.services"

const EditSightingForm = () => {

    const [beachesLoading, setBeachesLoading] = useState(true)
    const [specimensLoading, setSpecimensLoading] = useState(true)
    const [sightingLoading, setSightingLoading] = useState(true)
    const [loadingImage, setLoadingImage] = useState(false)
    const [beaches, setBeaches] = useState()
    const [specimens, setSpecimens] = useState()
    const [onSite, setOnsite] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const { sightingId } = useParams()
    const navigate = useNavigate()

    const [sightingData, setSightingData] = useState({
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

        sightingServices
            .getOneSighting(sightingId)
            .then(({ data }) => {
                setSightingData({
                    images: data.images,
                    latitude: data.location.coordinates[1],
                    longitude: data.location.coordinates[0],
                    beach: data.beach._id,
                    specimen: data.specimen._id,
                    user: data.user._id,
                    comment: data.comment,
                    confirmations: data.confirmations,
                    rejections: data.rejections
                })
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

    const handleFileUpload = e => {

        setLoadingImage(true)
        const formData = new FormData()

        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('imageData', e.target.files[i])
        }

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => {
                setSightingData({ ...sightingData, images: data.cloudinary_urls })
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

        sightingData.latitude = pos.coords.latitude
        sightingData.longitude = pos.coords.longitude
    }

    const handleSubmitSightingForm = e => {

        e.preventDefault()

        if (!sightingData.beach ||
            !sightingData.specimen ||
            sightingData.beach === 'Beaches' ||
            sightingData.specimen === 'Specimens') {
            handleModalShow()
            return
        }

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
                <Container className="pb-5">
                    <Form onSubmit={handleSubmitSightingForm} className="mt-3">
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
                            <Form.Group
                                as={Col}
                                xs={{ span: 8, offset: 2 }}
                                md={{ span: 10, offset: 1 }}
                                className="m-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload} />
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

                        <Button
                            className="mt-5 d-block mx-auto custom-color-button"
                            disabled={loadingImage}
                            variant="primary"
                            type="submit">
                            {loadingImage ? 'Loading image...' : 'Edit sighting'}
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

export default EditSightingForm