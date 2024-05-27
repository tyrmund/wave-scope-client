import axios from 'axios'

class SightingServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/api/sightings`
        })
    }

    getAllSightings() {
        return this.axiosApp.get('/')
    }

    getOneSighting(sightingId) {
        return this.axiosApp.get(`/${sightingId}`)
    }

    newSighting(sightingData) {
        return this.axiosApp.post('/', sightingData)
    }

    editSighting(sightingId, sightingData) {
        return this.axiosApp.put(`/${sightingId}`, sightingData)
    }

    deleteSighting(sightingId) {
        return this.axiosApp.delete(`/${sightingId}`)
    }
}

const sightingServices = new SightingServices()

export default SightingServices