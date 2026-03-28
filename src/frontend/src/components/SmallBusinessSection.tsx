import { Button } from "@/components/ui/button";
import { BarChart2, Clock, PlayCircle, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Luxury Starting at ₹7,999",
    desc: "Premium web design that makes your small business look like a Fortune 500 company.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Support",
    desc: "Round-the-clock assistance so your business never misses a beat.",
  },
  {
    icon: <PlayCircle className="h-6 w-6" />,
    title: "Instagram & YouTube Reels",
    desc: "Professional reel editing to boost your social media presence and reach more customers.",
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "More Sales Growth",
    desc: "Conversion-focused design strategies to turn visitors into paying customers.",
  },
];

export function SmallBusinessSection() {
  return (
    <section
      id="small-business"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.11 0.016 275), oklch(0.14 0.022 265), oklch(0.11 0.016 275))",
        }}
      />
      {/* Gold accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.77 0.155 85), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.77 0.155 85), transparent)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-background mb-4"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.77 0.155 85), oklch(0.68 0.14 70))",
            }}
          >
            🏪 SMALL BUSINESS SPECIAL
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient mb-4">
            Grow Your Small Business Online
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tailored packages designed to give small businesses a powerful
            online presence without breaking the bank.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center hover:gold-border-glow transition-all duration-300"
              data-ocid={`small_business.feature.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mx-auto mb-4">
                {f.icon}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 rounded-2xl p-8 sm:p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.16 0.025 280 / 0.9), oklch(0.14 0.022 265 / 0.9))",
            border: "1px solid oklch(0.77 0.155 85 / 0.3)",
            boxShadow: "0 0 40px oklch(0.77 0.155 85 / 0.08)",
          }}
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Ready to take your business{" "}
            <span className="text-gold-gradient">to the next level?</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            Join 200,000+ satisfied clients who trusted us with their online
            presence.
          </p>
          <Button
            onClick={() =>
              document
                .getElementById("inquiry")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gold text-background hover:bg-gold-light font-semibold px-8 gold-glow transition-all duration-300 hover:scale-105"
            data-ocid="small_business.primary_button"
          >
            Start Today — Get a Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
