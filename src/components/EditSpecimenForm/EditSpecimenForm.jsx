import { useContext, useEffect, useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import specimenServices from "../../services/specimen.services"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import { SPECIMEN_HABITAT, SPECIMEN_ISENDEMIC } from "../../data/lists.data"
import uploadServices from "../../services/upload.services"


const EditSpecimenForm = () => {


  const { specimenId } = useParams()
  const navigate = useNavigate()
  const [loadingImage, setLoadingImage] = useState(true)

  const [editSpecimenData, setEditSpecimenData] = useState({
    commonName: '',
    scientificName: '',
    mediumSize: '',
    isEndemic: '',
    habitat: '',
    description: '',
    images: []
  })

  useEffect(() => {
    loadSpecimenData()
    loadImagesData()
  }, [])

  const loadSpecimenData = () => {

    specimenServices
      .getOneSpecimen(specimenId)
      .then(({ data }) => {
        console.log(data)
        setEditSpecimenData({
          ...data,
          isEndemic: data.isEndemic,
          habitat: data.habitat
        })
        setLoadingImage(false)
      })
      .catch(err => console.log(err))
  }

  const loadImagesData = () => {

    uploadServices
      .getImages()
  }


  const handleInputChange = e => {
    const { value, name } = e.target
    setEditSpecimenData({ ...editSpecimenData, [name]: value })
  }

  const handleFileUpload = (e) => {

    setLoadingImage(true)

    //creando un formulario en la memoria del equipo con new FormData() y puede tener todos los campos que quiera
    //en esta línea estamos creando un nuevo campo de este nuevo formulario y le estamos dando como target del evento la primera de las files, los inputs de tipo file tienen una propiedad .files dentro de su target (un array con imágenes seleccionadas)

    const formData = new FormData()

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('imageData', e.target.files[i])
    }

    uploadServices
      .uploadImage(formData)                              //le mandamos un formulario que no es real pero que está guardado en memoria con un campo que lleva la imagen y lo mandamos al servicio de subida
      .then(({ data }) => {
        setEditSpecimenData({ ...editSpecimenData, images: data.cloudinary_urls })
        setLoadingImage(false)
      })
      .catch(err => {
        console.log(err)
        setLoadingImage(false)
      })

  }

  const handleSubmit = e => {

    e.preventDefault()

    const fullSpecimen = {
      ...setEditSpecimenData
    }

    specimenServices
      .editSpecimen(fullSpecimen)
      .then(() => navigate('/marine-life'))
      .catch(err => console.log(err))
  }

  return (

    <Container className="NewSpecimenForm">

      <Form onSubmit={handleSubmit}>
        <Form.Group className="" >
          <Form.Label className="mb-3 h5">Common Name</Form.Label>
          <Form.Control type="text" value={editSpecimenData.commonName} onChange={handleInputChange} name='commonName' placeholder="Ex: Correlimos tridáctilo" />
          <br />
        </Form.Group>

        <Form.Group className="" >
          <Form.Label className="mb-3 h5">Scientific Name</Form.Label>
          <Form.Control type="text" value={editSpecimenData.scientificName} onChange={handleInputChange} name='scientificName' placeholder="Ex: Calidris alba" />
          <br />
        </Form.Group>

        <Form.Group className="" >
          <Form.Label className="mb-3 h5">Medium size of specimen</Form.Label>
          <Form.Control type="text" value={editSpecimenData.mediumSize} onChange={handleInputChange} name='mediumSize' placeholder="Enter the medium size of the specimen" />
          <br />
        </Form.Group>

        <Row>
          <Col >

            <Form.Group  >
              <Form.Label className="mb-3 h5">Is the specimen endemic to the area?</Form.Label>
              <Form.Select
                value={editSpecimenData.isEndemic}
                name='isEndemic'
                onChange={handleInputChange} >
                {
                  SPECIMEN_ISENDEMIC.map((elm, index) => <option key={index} value={elm}>{elm}</option>)
                }
              </Form.Select>
              <br />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group  >
              <Form.Label className="mb-3 h5">Select the type of habitat of the specimen</Form.Label>
              <Form.Select
                value={editSpecimenData.habitat}
                name='habitat'
                onChange={handleInputChange} >

                {
                  SPECIMEN_HABITAT.map((elm, index) => <option key={index} value={elm}>{elm}</option>)
                }
              </Form.Select>
              <br />
            </Form.Group>
          </Col>

        </Row>

        <Form.Group  >
          <Form.Label className="mb-3 h5">Give a small description of the specimen and its characteristics</Form.Label>
          <Form.Control type="text" as='textarea' rows='5' value={editSpecimenData.description} onChange={handleInputChange} name='description' placeholder="Description of the specimen" />
          <br />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Add a set of pictures of the specimen</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileUpload} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-5 custom-color-button" disabled={loadingImage}>
          {loadingImage ? 'Loading image...' : 'Create new specimen'}
        </Button>


      </Form>
    </Container>
  )
}

export default EditSpecimenForm