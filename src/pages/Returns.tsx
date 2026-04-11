import { useReveal } from "@/hooks/useReveal";
import { ArrowLeftRight, Clock, CheckCircle2, XCircle, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Contact Us",
    desc: "Reach out via WhatsApp (+254 700 327 881) or email (cozy3fts@gmail.com) within 7 days of receiving your order.",
  },
  {
    icon: ArrowLeftRight,
    title: "Ship It Back",
    desc: "We'll provide return instructions. Pack the item securely in its original condition with tags attached.",
  },
  {
    icon: Clock,
    title: "Processing",
    desc: "Once we receive and inspect the item, we'll process your refund or exchange within 3–5 business days.",
  },
  {
    icon: CheckCircle2,
    title: "Refund / Exchange",
    desc: "Refunds are sent back to your M-Pesa number. For exchanges, we'll ship the replacement at no extra cost.",
  },
];

const eligible = [
  "Unworn and unused items",
  "Items with original tags attached",
  "Items returned within 7 days of delivery",
  "Items in original packaging",
];

const notEligible = [
  "Worn, washed, or altered items",
  "Items without original tags",
  "Items returned after 7 days",
  "Thrift items (all thrift sales are final)",
  "Items marked as 'Final Sale'",
];

export default function Returns() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="min-h-screen bg-background">
      <div className="section-padding py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl tracking-display mb-4">
            Returns & Exchanges
          </h1>
          <p className="text-muted-foreground mb-16 max-w-2xl">
            We want you to love your CoZy gear. If something doesn't work out, here's how to return or exchange it.
          </p>

          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {steps.map((step, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Step {i + 1}
                </p>
                <h3 className="font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Eligibility */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-xl mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Eligible for Return
              </h2>
              <ul className="space-y-3">
                {eligible.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl mb-6 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Not Eligible
              </h2>
              <ul className="space-y-3">
                {notEligible.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
