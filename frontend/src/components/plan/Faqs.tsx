import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-7 border-y py-7 mb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-500">FAQS</h1>
        <p className="text-gray-800">Have questions for us?</p>
        <p className="text-gray-800">
          Here are some of the most frequently asked questions
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-96"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How long is the free trial for paid plans?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes,
            </p>
            <p>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I switch plans?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes,
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes,
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you offer a student discount</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, p
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, p
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faqs;
