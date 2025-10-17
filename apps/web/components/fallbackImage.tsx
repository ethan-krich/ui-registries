"use client"

import React, { useState } from "react"
import Image, { ImageProps } from "next/image"

const ImageWithFallback = (props: ImageProps & { fallbackSrc: string }) => {
  const { src, alt, fallbackSrc, ...rest } = props
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}

export default ImageWithFallback
