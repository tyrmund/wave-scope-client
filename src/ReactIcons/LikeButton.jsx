import React, { useState } from 'react'
import { AiFillLike } from 'react-icons/ai'

function LikeButton() {

  const [liked, setLiked] = useState(false)
  const handleClick = () => {
    setLiked(!liked)
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