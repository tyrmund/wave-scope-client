import { Form, Row, Col, InputGroup, Button } from "react-bootstrap"
import './NewBeachForm.css'
import { useState } from "react"
import beachServices from "../../services/beach.services"
import { BEACH_COMPOSITION } from "../../data/lists.data"
import BusStopGroup from "./BusStopGroup"

const NewBeachForm = () => {

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

    const handleInputChange = event => {
        const { name, value } = event.target
        setBeachData({ ...beachData, [name]: value })
    }

    const handleBeachFormSubmit = e => {

        e.preventDefault()

        beachServices
            .newBeach(beachData)
            .then(() => {
                navigate('/beaches')
            })
            .catch(err => console.log(err))
    }


    return (

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
                            placeholder="Ex. 28.0000001"
                            value={beachData.location}
                            onChange={handleInputChange}
                        />
                        <br />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label className="h6">Longitude</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Ex. -15.0000001"
                            value={beachData.location}
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
                            onChange={handleInputChange}>
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
                busStops.map((elm, idx) => <BusStopGroup key={idx} index={idx} handleBusStopChange={handleBusStopChange} />)
            }

            <Button size="sm" onClick={addNewBusStop}>Add more stops</Button>

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
                {/* 
                {
                    aircraftData.images_url.map((eachField, idx) => {
                        return (
                            <Form.Control
                                className="mb-3"
                                type="url"
                                placeholder={`Place your image here`}
                                value={aircraftData.images_url[idx]}
                                onChange={event => handleGalleryChange(event, idx)} />
                        )
                    })
                }
                <Button size="sm" variant="dark" onClick={addNewImageField}>Add more</Button> */}
            </Form.Group>
            <Button size="sm" variant="dark" type='submit'>Add the new beach</Button>
        </Form>


    )
}


export default NewBeachForm