import { RegistryMetadata } from "@/types/registry"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { ComponentItemContent } from "./ComponentItemContent"

export type RegistryInfoProps = {
  registry: RegistryMetadata
  title: string | undefined
  description: string | undefined
}

export function RegistryInfo({
  registry,
  title,
  description,
}: RegistryInfoProps) {
  return (
    <div className="bg-foreground/10 m-4 rounded-md p-3 sm:p-4">
      <article>
        <h2 className="text-foreground text-xl font-bold sm:text-2xl">
          {title}
        </h2>
        <p className="text-sm sm:text-base">{description}</p>
      </article>
      <Accordion type="multiple">
        {registry.items.map((item, i) => (
          <AccordionItem key={i} value={String(i)}>
            <AccordionTrigger>{item.name}</AccordionTrigger>
            <AccordionContent>
              <ComponentItemContent item={item} registry={registry} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
