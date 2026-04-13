import { useReveal } from "@/hooks/useReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How do I place an order?", a: "Browse our shop, select your items and sizes, add them to cart, and proceed to checkout. You'll pay via M-Pesa and receive an order confirmation." },
  { q: "What payment methods do you accept?", a: "We currently accept M-Pesa (Lipa Na M-Pesa). Simply enter your M-Pesa phone number at checkout and confirm the STK push on your phone." },
  { q: "How long does delivery take?", a: "Delivery within Nairobi takes 1–3 business days. Other towns in Kenya take 3–7 business days depending on your location." },
  { q: "Do you deliver outside Nairobi?", a: "Yes! We deliver countrywide across Kenya. Delivery fees and timelines vary by location." },
  { q: "Can I track my order?", a: "Absolutely. Once your order is confirmed, you'll receive an order number. Use it on our Track Order page to check your order status in real-time." },
  { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for unworn items in original condition with tags attached. Visit our Returns page for full details." },
  { q: "Are your thrift items used?", a: "Yes, thrift items are pre-owned but carefully curated and inspected for quality. Each item is cleaned and vetted before listing." },
  { q: "How do I know my size?", a: "Each product page includes available sizes. If you're unsure, reach out to us on WhatsApp and we'll help you find the perfect fit." },
  { q: "Can I cancel my order?", a: "Orders can be cancelled within 1 hour of placement. After that, the order enters processing and cannot be cancelled. Contact us on WhatsApp for urgent requests." },
  { q: "Do you restock sold-out items?", a: "Brand-new items are restocked regularly. Thrift items are one-of-a-kind, so once they're gone, they're gone. Follow us on Instagram for drop alerts!" },
];

export default function FAQ() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="min-h-screen bg-background">
      <div className="section-padding py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <div className="reveal">
            <h1 className="font-display text-4xl md:text-5xl tracking-display mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground mb-12">
              Everything you need to know about shopping with CoZy 3Fts.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
