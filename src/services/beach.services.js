import axios from 'axios'

class BeachServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/api/beaches`
        })
    }

    getAllBeaches() {
        return this.axiosApp.get('/')
    }

    getOneBeach(beachId) {
        return this.axiosApp.get(`/${beachId}`)
    }

    newBeach(beachData) {
        return this.axiosApp.post('/', beachData)
    }

    editBeach(beachId, beachData) {
        return this.axiosApp.put(`/${beachId}`, beachData)
    }

    deleteBeach(beachId) {
        return this.axiosApp.delete(`/${beachId}`)
    }
}

const beachServices = new BeachServices()

export default beachServices