import { useContext, useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import specimenServices from "../../services/specimen.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"

const NewSpecimenForm = () => {

  const [specimenFormData, setSpecimenFormData] = useState({
    images: [''],
    commonName: '',
    scientificName: '',
    mediumSize: '',
    isEndemic: '',
    habitat: '',
    description: ''
  })

  const navigate = useNavigate()

  const { authenticateUser } = useContext(AuthContext)

  const handleInputChange = e => {
    const { value, name } = e.target
    setSpecimenFormData({ [name]: value })
  }

  const handleSubmit = e => {

    e.preventDefault()

    specimenServices
      .newSpecimen(specimenFormData)
      .then(() => navigate('/marine-life'))
      .catch(err => console.log(err))
  }


  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Common Name</Form.Label>
        <Form.Control type="text" value={specimenFormData.commonName} onChange={handleInputChange} placeholder="Enter the common name of specimen" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Scientific Name</Form.Label>
        <Form.Control type="text" value={specimenFormData.scientificName} onChange={handleInputChange} placeholder="Enter the scientific name of specimen" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Medium size of specimen</Form.Label>
        <Form.Control type="text" value={specimenFormData.mediumSize} onChange={handleInputChange} placeholder="Enter the medium size of specimen" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Is the species endemic to the area?</Form.Label>
        <Form.Select value={specimenFormData.isEndemic} onChange={handleInputChange} placeholder="Endemic" >
          <option>Yes</option>
          <option>No</option>
          <option>Not sure</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Select the type of habitat of the specimen</Form.Label>
        <Form.Select value={specimenFormData.habitat} onChange={handleInputChange} placeholder="Endemic" >
          <option>Air</option>
          <option>Earth</option>
          <option>Water</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

  )
}

export default NewSpecimenForm