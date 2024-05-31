import { useContext, useEffect, useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import specimenServices from "../../services/specimen.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import { SPECIMEN_HABITAT, SPECIMEN_ISENDEMIC } from "../../data/lists.data"
import uploadServices from "../../services/upload.services"


const NewSpecimenForm = () => {

  const [specimenFormData, setSpecimenFormData] = useState({
    commonName: '',
    scientificName: '',
    mediumSize: '',
    isEndemic: '',
    habitat: '',
    description: ''
  })

  const [selectedFiles, setSelectedFiles] = useState([])

  const [loadingImage, setLoadingImage] = useState(false)

  const navigate = useNavigate()

  const { authenticateUser } = useContext(AuthContext)

  const handleInputChange = e => {
    const { value, name } = e.target
    setSpecimenFormData({ ...specimenFormData, [name]: value })
  }

  // const handleFileChange = e => {
  //   setSelectedFiles(Array.from(e.target.files))
  // }

  const handleFileUpload = (e) => {

    setLoadingImage(true)

    const formData = new FormData()                        //creando un formulario en la memoria del equipo con new FormData() y puede tener todos los campos que quiera
    //en esta línea estamos creando un nuevo campo de este nuevo formulario y le estamos dando como target del evento la primera de las files, los inputs de tipo file tienen una propiedad .files dentro de su target (un array con imágenes seleccionadas)
    selectedFiles.forEach(eachFile => {
      formData.append('imageData', eachFile)
    })

    uploadServices
      .uploadimage(formData)                                                         //le mandamos un formulario que no es real pero que está guardado en memoria con un campo que lleva la imagen y lo mandamos al servicio de subida
      .then(({ data }) => {

        // console.log(data)
        // const updatedFiles = [...selectedFiles]
        // updatedFiles.push(data.cloudinary_url)
        // setSelectedFiles(updatedFiles)

        setSelectedFiles(data.cloudinary_url)
        console.log(selectedFiles)
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
      ...specimenFormData,
      images: selectedFiles
    }

    console.log(fullSpecimen)
    specimenServices
      .newSpecimen(fullSpecimen)
      .then(() => navigate('/marine-life'))
      .catch(err => console.log(err))
  }


  return (
    <Container className="NewSpecimenForm">

      <Form onSubmit={handleSubmit}>
        <Form.Group className="" >
          <Form.Label className="mb-3 h5">Common Name</Form.Label>
          <Form.Control type="text" value={specimenFormData.commonName} onChange={handleInputChange} name='commonName' placeholder="Ex: Correlimos tridáctilo" />
          <br />
        </Form.Group>

        <Form.Group className="" >
          <Form.Label className="mb-3 h5">Scientific Name</Form.Label>
          <Form.Control type="text" value={specimenFormData.scientificName} onChange={handleInputChange} name='scientificName' placeholder="Ex: Calidris alba" />
          <br />
        </Form.Group>

        <Form.Group className="" >
          <Form.Label className="mb-3 h5">Medium size of specimen</Form.Label>
          <Form.Control type="text" value={specimenFormData.mediumSize} onChange={handleInputChange} name='mediumSize' placeholder="Enter the medium size of the specimen" />
          <br />
        </Form.Group>

        <Row>
          <Col >

            <Form.Group  >
              <Form.Label className="mb-3 h5">Is the specimen endemic to the area?</Form.Label>
              <Form.Select value={specimenFormData.isEndemic} onChange={handleInputChange} name='isEndemic' placeholder="Endemic" >
                {
                  SPECIMEN_ISENDEMIC.map(elm => <option key={elm} value={elm}>{elm}</option>)
                }
              </Form.Select>
              <br />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group  >
              <Form.Label className="mb-3 h5">Select the type of habitat of the specimen</Form.Label>
              <Form.Select value={specimenFormData.habitat} onChange={handleInputChange} name='habitat' placeholder="Habitat" >
                {
                  SPECIMEN_HABITAT.map(elm => <option key={elm} value={elm}>{elm}</option>)
                }
              </Form.Select>
              <br />
            </Form.Group>
          </Col>

        </Row>

        <Form.Group  >
          <Form.Label className="mb-3 h5">Give a small description of the specimen and its characteristics</Form.Label>
          <Form.Control type="text" as='textarea' rows='5' value={specimenFormData.description} onChange={handleInputChange} name='description' placeholder="Description of the specimen" />
          <br />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Add a set of pictures of the specimen</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileUpload} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-5" disabled={loadingImage}>
          {loadingImage ? 'Loading image...' : 'Create new specimen'}
        </Button>


      </Form>
    </Container>

  )
}

export default NewSpecimenForm



// {selectedFiles.length > 0 && (
//   <div className="mb-5">
//     <Container >
//       <Row >
//         {selectedFiles.map((file, index) => (
//           <Col key={index} sm={{ span: 2 }}>
//             <div className="p-2">
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt={file.name}
//                 className="img-thumbnail p-0 m-0"
//                 style={{ width: '110px', height: '110px', objectFit: 'cover' }}
//                 onLoad={() => URL.revokeObjectURL(file)} />
//             </div>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   </div>
// )}