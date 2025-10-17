"use client"

import { CopyBlock, dracula } from "react-code-blocks"

import { RegistryMetadata } from "@/types/registry"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InstallTabs({
  registry,
  item,
}: {
  registry: RegistryMetadata
  item: RegistryMetadata["items"][0]
}) {
  const owner = registry.github.split("/")[0]
  return (
    <Tabs defaultValue="ui-registries" className="mt-2">
      <TabsList>
        <TabsTrigger value="ui-registries">UI Registries CLI</TabsTrigger>
        <TabsTrigger value="shadcn">Shadcn CLI</TabsTrigger>
      </TabsList>
      <TabsContent value="ui-registries">
        <CopyBlock
          text={`npx ui-registries@latest add @${owner}/${item.name}`}
          language="bash"
          showLineNumbers={false}
          theme={dracula}
          codeBlock
        />
      </TabsContent>
      <TabsContent value="shadcn">
        <CopyBlock
          text={`npx shadcn@latest add ${registry.homepage}/r/${item.name}.json`}
          language="bash"
          showLineNumbers={false}
          theme={dracula}
          codeBlock
        />
      </TabsContent>
    </Tabs>
  )
}
