import fs from "fs"
import path from "path"
import { Octokit } from "@octokit/core"
import dotenv from "dotenv"
import { getLinkPreview } from "link-preview-js"

dotenv.config()

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const main = async () => {
  const octokit = new Octokit({
    auth: process.env.REGISTRY_GITHUB_TOKEN,
  })

  try {
    const searchQuery =
      'filename:registry.json language:json "$schema": "https://ui.shadcn.com/schema/registry.json"'

    console.log("Searching for registry.json files with shadcn schema...")

    let allItems: any[] = []
    let page = 1
    let hasMorePages = true
    let totalCount = 0

    while (hasMorePages) {
      console.log(`Requesting page ${page}...`)

      const { data } = await octokit.request("GET /search/code", {
        q: searchQuery,
        per_page: 100,
        page: page,
      })

      if (page === 1) {
        totalCount = data.total_count
        console.log(`Found ${totalCount} files total`)
      }

      console.log(`Fetching page ${page}: ${data.items.length} items`)
      allItems = allItems.concat(data.items)
      console.log(`Total items collected so far: ${allItems.length}`)

      const shouldStop =
        data.items.length === 0 || allItems.length >= totalCount

      if (shouldStop) {
        hasMorePages = false
        console.log(`Stopping pagination. Final count: ${allItems.length}`)
      } else {
        page++
        // Add a small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    console.log(`Retrieved ${allItems.length} files in total`)

    const registryFiles = await Promise.all(
      allItems.map(async (item) => {
        try {
          const contentResponse = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            {
              owner: item.repository.owner.login,
              repo: item.repository.name,
              path: item.path,
            }
          )
          if (
            Array.isArray(contentResponse.data) ||
            !("content" in contentResponse.data)
          ) {
            console.warn(
              `Skipping ${item.repository.full_name}/${item.path}: Not a file`
            )
            return null
          }

          const content = Buffer.from(
            contentResponse.data.content,
            "base64"
          ).toString("utf-8")
          const jsonContent = JSON.parse(content)

          return {
            repository: `${item.repository.owner.login}/${item.repository.name}`,
            path: item.path,
            url: item.html_url,
            content: jsonContent,
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error)
          console.error(
            `Error fetching ${item.repository.full_name}/${item.path}:`,
            errorMessage
          )
          return null
        }
      })
    )

    const validRegistries = registryFiles.filter((r) => r !== null)
    const newRegistriesFile: any = {}
    const seenRegistryNames = new Set<string>()

    const uniqueRegistries = validRegistries.filter((registry) => {
      const registryName = registry.content.name
      if (registryName && !seenRegistryNames.has(registryName)) {
        seenRegistryNames.add(registryName)
        return true
      }
      return false
    })

    const imagePreviews = await Promise.all(
      uniqueRegistries.map(async (registry) => {
        if (!isValidUrl(registry.content.homepage)) {
          return "/placeholder.png"
        }
        try {
          const preview = await getLinkPreview(registry.content.homepage)
          const imagePreview =
            "images" in preview && preview.images?.[0]
              ? preview.images[0]
              : "/placeholder.png"
          console.log(imagePreview)
          return imagePreview
        } catch (error) {
          return "/placeholder.png"
        }
      })
    )

    const registryMetadata = uniqueRegistries.map((registry, index) => ({
      ...registry.content,
      github: registry.repository,
      imagePreview: imagePreviews[index],
    }))

    for (const registry of validRegistries) {
      let registryUrl = registry.content.homepage
      if (registryUrl && !registryUrl.endsWith("/")) {
        registryUrl += "/"
      }
      registryUrl = registryUrl + "r/{name}.json"

      try {
        const url = new URL(registryUrl)
        if (!url.protocol.startsWith("http")) {
          continue
        }
        const hostname = url.hostname.toLowerCase()
        if (
          hostname === "localhost" ||
          hostname === "127.0.0.1" ||
          hostname === "::1" ||
          hostname === "0.0.0.0" ||
          hostname.startsWith("localhost")
        ) {
          continue
        }
      } catch (error) {
        continue
      }

      const ownerRaw = registry.repository.split("/")[0]
      const registryOwner =
        "@" +
        ownerRaw
          .replace(/[^a-zA-Z0-9]/g, "") // remove all special characters including spaces
          .replace(/([a-zA-Z])([0-9])/g, "$1-$2") // separate letters followed by numbers with hyphen
          .replace(/([0-9])([a-zA-Z])/g, "$1-$2") // separate numbers followed by letters with hyphen
          .toLowerCase()

      newRegistriesFile[registryOwner] = registryUrl
    }

    console.log("Adding", Object.keys(newRegistriesFile).length, "registries")
    fs.writeFileSync(
      path.join(process.cwd(), "apps/web/public/r/registries.json"),
      JSON.stringify(newRegistriesFile, null, 2)
    )
    fs.writeFileSync(
      path.join(process.cwd(), "apps/web/public/r/registries-metadata.json"),
      JSON.stringify(registryMetadata, null, 2)
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("Error during search:", errorMessage)
    throw error
  }
}

main()
