import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does it take to get approved?",
    answer: "Approval typically takes just a few minutes after submitting your application."
  },
  {
    question: "What types of aircraft can I finance?",
    answer: "We offer financing for fixed-wing aircraft, helicopters, drones, and more."
  },
  {
    question: "Do I need a high credit score to qualify?",
    answer: "Not necessarily. We consider multiple factors to offer flexible financing options."
  },
  {
    question: "Is refinancing available?",
    answer: "Yes, we provide refinancing options for existing aircraft loans."
  },
  {
    question: "What types of drones do you finance?",
    answer: "We primarily finance commercial drones used for business purposes, such as aerial photography, surveying, agriculture, and industrial inspections."
  },
]

export function FAQSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8 sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

