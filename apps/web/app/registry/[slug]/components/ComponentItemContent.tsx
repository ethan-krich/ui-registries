import { RegistryItem, RegistryMetadata } from "@/types/registry"

import { InstallTabs } from "../../components/InstallTabs"
import { DependencyList } from "./DependencyList"
import { RegistryDependencyList } from "./RegistryDependencyList"

export type ComponentItemContentProps = {
  item: RegistryItem
  registry: RegistryMetadata
}

export function ComponentItemContent({
  item,
  registry,
}: ComponentItemContentProps) {
  return (
    <div className="text-foreground">
      {item.description && <p>{item.description}</p>}
      {!!item.description && <br />}
      {item.author && (
        <>
          <b>Author:</b> {item.author}
          <br />
        </>
      )}
      <div className="text-foreground my-4">
        <b>Add to your project:</b>
        <InstallTabs registry={registry} item={item} />
      </div>
      <DependencyList dependencies={item.dependencies || []} />
      <RegistryDependencyList
        registryDependencies={item.registryDependencies || []}
      />
    </div>
  )
}
