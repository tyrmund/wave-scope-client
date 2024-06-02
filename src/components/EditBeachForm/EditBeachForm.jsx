import { Form, Row, Col, InputGroup, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import beachServices from "../../services/beach.services"
import { BEACH_COMPOSITION } from "../../data/lists.data"
import BusStopGroup from "../NewBeachForm/BusStopGroup"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../Loader/Loader"


const EditBeachForm = () => {

    const { beachId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        loadFormData()
    }, [])

    const loadFormData = () => {
        beachServices
            .getOneBeach(beachId)
            .then(({ data }) => {
                setBusStops(data.nearBusStops.map(elm => ({
                    name: elm.name,
                    latitude: elm.coordinates[1],
                    longitude: elm.coordinates[0],
                    lines: elm.lines
                })))
                setBeachData({
                    ...data,
                    latitude: data.location.coordinates[1],
                    longitude: data.location.coordinates[0],
                })
                setIsloading(false)
            })
            .catch(err => console.log(err))
    }

    const [beachData, setBeachData] = useState({
        name: '',
        latitude: 0,
        longitude: 0,
        description: '',
        length: 1,
        composition: '',
        sectors: 1
    })

    const [busStops, setBusStops] = useState([
        {}
    ])

    const handleBusStopChange = (idx, busStopInfo) => {
        const busStopsCopy = [...busStops]
        busStopsCopy[idx] = busStopInfo
        setBusStops(busStopsCopy)
    }

    const addNewBusStop = () => {
        const newStop = {}
        const newBusStops = [...busStops, newStop]
        setBusStops(newBusStops)
    }

    const deleteBusStop = (index) => {
        const updatedBusStops = [...busStops]
        if (updatedBusStops.length > 1) {
            updatedBusStops.splice(index, 1)
            setBusStops(updatedBusStops)
        }
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setBeachData({ ...beachData, [name]: value })
    }

    const handleBeachFormSubmit = e => {

        e.preventDefault()
        console.log(beachData)

        beachData.longitude = Number(beachData.longitude)
        beachData.latitude = Number(beachData.latitude)
        beachData.length = Number(beachData.length)
        beachData.sectors = Number(beachData.sectors)
        beachData.nearBusStops = busStops

        if (!beachData.name || !beachData.composition || beachData.composition === "Choose a composition" || !beachData.description) {
            handleModalShow()
            return
        }

        // beachServices
        //     .editBeach(beachData)
        //     .then(() => {
        //         navigate('/beaches')
        //     })
        //     .catch(err => console.log(err))
    }


    return (
        <div>
            {
                isLoading
                    ?
                    <Loader />
                    :

                    <Form className="NewBeachForm" onSubmit={handleBeachFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="h3">Beach Name</Form.Label>
                            <Form.Control placeholder="Ex. Las Canteras" name="name" value={beachData.name} onChange={handleInputChange} required />
                        </Form.Group>
                        <br />

                        <Form.Group className="mb-3">
                            <Form.Label className="h4">Coordinates</Form.Label>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label className="h6">Latitude</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="latitude"
                                        placeholder="Ex. 28.0000001"
                                        value={beachData.latitude}
                                        onChange={handleInputChange}
                                    />
                                    <br />
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label className="h6">Longitude</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="longitude"
                                        placeholder="Ex. -15.0000001"
                                        value={beachData.longitude}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Row>
                        </Form.Group>
                        <br />

                        <Form.Group className="mb-3">
                            <Form.Label className="h4">General Info</Form.Label>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label className="h6">Length</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="length"
                                        placeholder="Length"
                                        value={beachData.length}
                                        onChange={handleInputChange}
                                    />
                                    <br />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label className="h6">Composition</Form.Label>
                                    <Form.Select
                                        value={beachData.composition}
                                        name="composition"
                                        onChange={handleInputChange}
                                        aria-label="Default select example">
                                        <option>Choose a composition</option>
                                        {
                                            BEACH_COMPOSITION.map((elm, index) => <option key={index} value={elm}>{elm}</option>)
                                        }
                                    </Form.Select>
                                    <br />
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label className="h6">Sectors</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Number of sectors"
                                        name="sectors"
                                        min={1}
                                        max={299}
                                        value={beachData.sectors}
                                        onChange={handleInputChange}
                                    />
                                    <br />
                                    <br />
                                </Form.Group>
                            </Row>
                        </Form.Group>

                        <br />

                        <Form.Label className="h4">Nearest Bus Stops</Form.Label>

                        {
                            busStops.map((elm, idx) => <BusStopGroup
                                key={idx}
                                index={idx}
                                {...elm}
                                handleBusStopChange={handleBusStopChange}
                                deleteBusStop={deleteBusStop} />)
                        }
                        <br />
                        <Button className="custom-color-button mb-3" size="sm" onClick={addNewBusStop}>Add more stops</Button>
                        <br />

                        <Form.Label className="h4">Description</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>Description</InputGroup.Text>
                            <Form.Control as="textarea"
                                name="description"
                                aria-label="With textarea"
                                value={beachData.description}
                                onChange={handleInputChange}
                                required />
                        </InputGroup>
                        <br />

                        <Form.Group controlId="ImagesGallery" className="mb-3">
                            <Form.Label>Images</Form.Label>
                        </Form.Group>
                        <Button className="custom-color-button mb-3" size="sm" variant="dark" type='submit'>Add the new beach</Button>
                    </Form>
            }
        </div>
    )
}


export default EditBeachForm