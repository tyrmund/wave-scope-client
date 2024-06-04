import React, { useState } from 'react'
import { AiFillDislike } from 'react-icons/ai'

const DislikeButton = () => {

  const [disliked, setDisliked] = useState(false)
  const handleClick = () => {
    setDisliked(!disliked)
  }

  if (disliked)
    return (<AiFillDislike
      color="#023047"
      size="25"
      onClick={handleClick} />)
  return (<AiFillDislike
    color="#C7EDFF"
    size="25"
    onClick={handleClick} />)
}

export default DislikeButton