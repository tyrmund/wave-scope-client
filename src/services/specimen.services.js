import axios from 'axios'

class SpecimenServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/api/specimens`
        })
    }

    getAllSpecimens() {
        return this.axiosApp.get('/')
    }

    getOneSpecimen(specimenId) {
        return this.axiosApp.get(`/${specimenId}`)
    }

    newSpecimen(specimenData) {
        return this.axiosApp.post('/', specimenData)
    }

    editSpecimen(specimenId, specimenData) {
        return this.axiosApp.put(`/${specimenId}`, specimenData)
    }

    deleteSpecimen(specimenId) {
        return this.axiosApp.delete(`/${specimenId}`)
    }
}

const specimenServices = new SpecimenServices()

export default SpecimenServices