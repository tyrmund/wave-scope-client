import React, { useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import sightingServices from '../services/sighting.services'

const LikeButton = ({ sightingConfirmation, userId, sightingId }) => {

  const [liked, setLiked] = useState(sightingConfirmation.includes(userId))

  const handleClick = () => {

    if (!sightingConfirmation.includes(userId)) {

      sightingServices
        .confirmSighting(sightingId)
        .then(() => setLiked(true))
        .catch(err => console.log(err))

    } else {

      sightingServices
        .removeSightingConfirmation(sightingId)
        .then(() => setLiked(false))
        .catch(err => console.log(err))
    }
  }


  if (liked)
    return (<AiFillLike
      color="#023047"
      size="25"
      onClick={handleClick} />)
  return (<AiFillLike
    color="#C7EDFF"
    size="25"
    onClick={handleClick} />)
}

export default LikeButton