'use client'
import { useState } from "react"


export function LikeButton() {
  const [like, setLike] = useState(99)

  function handleClick() {
    setLike(prev => prev + 1)
  }

  return (
    <button onClick={handleClick}>
      like {like}
    </button>
  )
}
