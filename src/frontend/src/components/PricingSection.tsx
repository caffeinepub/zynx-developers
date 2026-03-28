import { Button } from "@/components/ui/button";
import { Check, Crown, Star, Zap } from "lucide-react";
import { motion } from "motion/react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  icon: React.ReactNode;
  featured?: boolean;
  badge?: string;
}

const plans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic & Clean Website",
    price: "₹4,500",
    priceNote: "+ domain if needed",
    icon: <Zap className="h-6 w-6" />,
    features: [
      "Professional clean design",
      "Mobile responsive layout",
      "Up to 5 pages",
      "Contact form integration",
      "Basic SEO setup",
      "24/7 service support",
    ],
  },
  {
    id: "luxury",
    name: "Large Business Luxury Website",
    price: "₹7,500",
    priceNote: "+ domain if needed",
    icon: <Crown className="h-6 w-6" />,
    featured: true,
    badge: "Most Popular",
    features: [
      "Premium luxury design",
      "Up to 15 pages",
      "Advanced animations",
      "E-commerce ready",
      "Advanced SEO optimization",
      "Social media integration",
      "24/7 dedicated support",
    ],
  },
  {
    id: "highGraphic",
    name: "High Graphic Website",
    price: "₹11,500",
    priceNote: "+ FREE domain included",
    icon: <Star className="h-6 w-6" />,
    features: [
      "Cinematic transitions & effects",
      "Custom MP4 video integration",
      "Unlimited pages",
      "Bespoke graphic design",
      "Full SEO + analytics setup",
      "Instagram management",
      "Priority 24/7 support",
      "Free domain for 1 year",
    ],
  },
];

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="py-24 px-4 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.09 0.012 280), oklch(0.11 0.016 275))",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-3 block">
            Transparent Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient mb-4">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Affordable, professional web design packages tailored to your
            business needs.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl p-6 lg:p-8 flex flex-col h-full ${
                plan.featured
                  ? "glass-card-featured md:-mt-4 md:mb-4"
                  : "glass-card"
              }`}
              data-ocid={`pricing.card.${i + 1}`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold text-background"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.77 0.155 85), oklch(0.68 0.14 70))",
                    }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${plan.featured ? "bg-gold/20 text-gold" : "bg-gold/10 text-gold"}`}
              >
                {plan.icon}
              </div>

              {/* Name */}
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-1">
                <span className="text-4xl font-bold text-gold-gradient">
                  {plan.price}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                {plan.priceNote}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() => onSelectPlan(plan.id)}
                className={
                  plan.featured
                    ? "w-full bg-gold text-background hover:bg-gold-light font-semibold gold-glow transition-all duration-300 hover:scale-105"
                    : "w-full border-gold/40 text-gold hover:bg-gold/10 hover:border-gold bg-transparent border"
                }
                data-ocid={`pricing.get_started.button.${i + 1}`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
