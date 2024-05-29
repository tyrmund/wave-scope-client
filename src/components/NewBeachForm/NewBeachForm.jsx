import { Form, Row, Col, Container, InputGroup, Button } from "react-bootstrap"
import './NewBeachForm.css'
import { useState } from "react"
import beachServices from "../../services/beach.services"

const NewBeachForm = () => {

    const [beachData, setBeachData] = useState({
        name: '',
        location: [0, 0],
        description: '',
        length: 0,
        composition: '',
        sectors: 0,
        nearBusStops: [{}]
    })


    return (

        <Container>
            <Form.Group className="mb-3">
                <Form.Label className="h3">Beach Name</Form.Label>
                <Form.Control placeholder="Beach name" value={beachData.name} required />
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
                            placeholder="Latitude"
                            defaultValue="Mark"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label className="h6">Longitude</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Longitude"
                            defaultValue="Mark"
                        />
                    </Form.Group>
                </Row>
            </Form.Group>
            <br />

            <Form.Group className="mb-3">
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label className="h6">Length</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Length"
                            defaultValue="Mark"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label className="h6">Composition</Form.Label>

                        <Form.Select >
                            <option>Sand</option>
                            <option>Rock</option>
                            <option>Gravel</option>
                            <option>Shell</option>
                            <option>Sand & Rock</option>
                            <option>Sand & Gravel</option>
                            <option>Sand & Shell</option>
                            <option>Rock & Gravel</option>
                            <option>Rock & Shell</option>
                            <option>Gravel & Shell</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label className="h6">Sectors</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Number of sectors"
                            defaultValue="Mark"
                        />
                    </Form.Group>
                </Row>
            </Form.Group>
            <br />


            <InputGroup>
                <InputGroup.Text>Description</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" required />
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
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Can't check this" disabled />
            </Form.Group>
            <Button size="sm" variant="dark" type='submit'>Add the new beach</Button>
        </Container>


    )
}


export default NewBeachForm