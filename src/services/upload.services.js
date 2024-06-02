import axios from 'axios'

class UploadServices {

  constructor() {

    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/upload`
    })
  }

  getImages(imageForm) {
    return this.api.get('/image', imageForm)
  }

  uploadImage(imageForm) {
    return this.api.post('/image', imageForm)
  }

  reloadImages(imageForm) {
    return this.api.put('/image', imageForm)
  }
}

const uploadServices = new UploadServices()

export default uploadServices