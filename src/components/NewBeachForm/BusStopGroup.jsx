import { useEffect, useState } from "react"
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap"

const BusStopGroup = ({ index, handleBusStopChange }) => {

    const [busStopData, setBusStopData] = useState({
        name: "",
        latitude: 0,
        longitude: 0
    })

    const [linesData, setLinesData] = useState([''])

    useEffect(() => {                                                           //cuando se actualicen linesData ( las líneas ) o el busStopData ( la información de la parada )
        const fullStopInfo = { ...busStopData, lines: linesData }               //toda la información de ambos estados se combinan en fullStopInfo y se envían al index
        handleBusStopChange(index, fullStopInfo)                                //especificado en el componente superior. Esta función solo se invoca en el componente padre (newBeachForm)
    }, [linesData, busStopData])                                                //por eso sabemos cuál es el índice


    const handleBusStop = e => {
        const { name, value } = e.target
        setBusStopData({
            ...busStopData, [name]: value
        })
    }

    const handleLineInput = (event, index) => {
        const { value } = event.target
        const updatedLines = [...linesData]
        updatedLines[index] = value

        setLinesData(updatedLines)
    }

    const handleDeleteLine = (_, index) => {
        const updatedLines = [...linesData]
        if (updatedLines.length > 1) {
            updatedLines.splice(index, 1)
            setLinesData(updatedLines)
        }
    }

    const handleNewLine = () => {
        const newLine = [...linesData, '']
        setLinesData(newLine)
    }




    return (
        <Form.Group className="mb-3" >
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label className="h6">Name</Form.Label>
                    <Form.Control
                        required
                        type=""
                        name="name"
                        placeholder="Name"
                        value={busStopData.name}
                        onChange={handleBusStop}
                    />
                    <br />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label className="h6">Latitude</Form.Label>
                    <Form.Control
                        required
                        placeholder="Ex. 28.0000001"
                        name="latitude"
                        value={busStopData.latitude}
                        onChange={handleBusStop}
                    />
                    <br />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label className="h6">Longitude</Form.Label>
                    <Form.Control
                        required
                        placeholder="Ex. -15.0000001"
                        name="longitude"
                        value={busStopData.longitude}
                        onChange={handleBusStop}
                    />
                    <br />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label className="h6">Lines</Form.Label>
                    {
                        linesData.map((line, index) => {
                            return (
                                <InputGroup key={index}>
                                    <Button as={Col} size="sm" md="2" className="btn-danger" onClick={(event) => handleDeleteLine(event, index)}>-</Button>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="line"
                                        placeholder="Ex. 25"
                                        value={line}
                                        onChange={(event) => handleLineInput(event, index)}
                                    />
                                </InputGroup>
                            )
                        })
                    }
                    <br />
                    <Button as={Col} onClick={handleNewLine} size="sm" md="2" >+</Button>
                </Form.Group>
            </Row>

        </Form.Group>
    )
}

export default BusStopGroup