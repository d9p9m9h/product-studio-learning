'use client'
import { useState } from "react"
import { Button } from "./button"


export function LikeButton() {
  const [like, setLike] = useState(99)

  function handleClick() {
    setLike(prev => prev + 1)
  }

  return (
    <Button variant={'destructive'} onClick={handleClick}>
      like {like}
    </Button>
  )
}
