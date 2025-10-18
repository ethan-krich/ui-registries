"use client"

import React, { useEffect, useState } from "react"
import Image, { ImageProps } from "next/image"

import { Skeleton } from "./ui/skeleton"

const ImageWithFallback = (
  props: ImageProps & { fallbackSrc: string; isLoading?: boolean }
) => {
  const { src, alt, fallbackSrc, isLoading, ...rest } = props
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return isLoading ? (
    <Skeleton className={`w-[${rest.width}] h-[${rest.height}] min-h-50`} />
  ) : (
    <Image {...rest} alt={alt} src={imgSrc} />
  )
}

export default ImageWithFallback
