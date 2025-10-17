"use client"

import React from "react"
import { useRouter } from "next/navigation"

export default function RegistryPage() {
  const router = useRouter()
  router.push("/")
  return null
}
