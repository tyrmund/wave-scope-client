import { Button, Container } from "react-bootstrap"
import { useState } from "react"
import { useEffect } from "react"
import Loader from '../../components/Loader/Loader'
import beachServices from '../../services/beach.services'
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"


const WelcomePage = () => {

    const [isLoading, setIsloading] = useState(true)
    const [beaches, setBeaches] = useState([])

    useEffect(() => {
        loadBeaches()
    }, [])

    const { loggedUser, logout } = useContext(AuthContext)

    const loadBeaches = () => {
        beachServices
            .getAllBeaches('/beaches')
            .then(({ data }) => {
                setBeaches(data)
                setIsloading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="WelcomePage mt-3" >

            <div>
                <h2>{`Welcome ${loggedUser.username}!`}</h2>
                <br />
                <h3>Choose a beach in the Wave Scope</h3>
                {

                }
            </div>

            <h2>Your Sightings</h2>



        </Container>
    )
}

export default WelcomePage