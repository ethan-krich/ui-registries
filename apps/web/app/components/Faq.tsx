import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faq() {
  return (
    <Accordion type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is UI Registries?</AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">
            UI Registries is a complete list of every shadcn/ui registry on
            Github updated daily. It is a place to browse for your next UI
            library or component.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How are the registries updated?</AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">
            Every day the list is updated with the latest registries from
            Github. It uses the Github API to search for all files called
            registry.json. It ensures that the file is valid and there are no
            duplicates and then adds it to the list.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          How can I add my registry to the list?
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">
            Unlike the official shadcn/ui registry, UI Registries does not
            require you to create a pull request to add your registry. In fact
            your registry is probaly already in the list. The requirments are
            simple: <b>It should follow the shadcn/ui registry format</b> and{" "}
            <b>be public on Github</b>. If you meet these requirements, your
            registry will be added to the list within 24 hours.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
