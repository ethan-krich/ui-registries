import { getLinkPreview } from "link-preview-js"

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const getLinkPreviewImage = async (url: string) => {
  const hasValidHomepage = isValidUrl(url)
  let linkPreview: any

  if (hasValidHomepage) {
    try {
      linkPreview = await getLinkPreview(url)
    } catch (error) {
      linkPreview = "/placeholder.png"
    }
  }
  return linkPreview
}
