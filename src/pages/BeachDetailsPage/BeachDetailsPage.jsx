import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import beachServices from "../../services/beach.services"

const BeachDetailsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [beach, setBeach] = useState({})
  const { beachId } = useParams()

  useEffect(() => {
    loadBeachDetails()
  }, [])

  const loadBeachDetails = () => {

    beachServices
      .getOneBeach(beachId)
      .then(({ data }) => setBeach(data))
      .catch(err => console.log(err))

    setIsLoading(false)
  }

  return (


    <div className="BeachDetailsPage">
      {isLoading ?
        <h1>LOADING...</h1> :
        <h1>ONE OF MY BEACHESSSSSSSSSSSSS named ${beach.name}</h1>}
    </div>
  )
}

export default BeachDetailsPage