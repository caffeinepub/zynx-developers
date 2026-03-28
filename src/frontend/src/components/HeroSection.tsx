import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const scrollToInquiry = () => {
    document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `url('/assets/generated/hero-bg.dim_1920x1080.jpg') center/cover no-repeat`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.07 0.015 280 / 0.92), oklch(0.10 0.01 270 / 0.85))",
        }}
      />

      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "oklch(0.77 0.155 85)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl"
        style={{ background: "oklch(0.72 0.14 82)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <span
            className="shimmer-badge px-4 py-1.5 rounded-full text-sm font-semibold text-gold-light"
            data-ocid="hero.badge.1"
          >
            T&amp;C APPROVED ✅
          </span>
          <span
            className="shimmer-badge px-4 py-1.5 rounded-full text-sm font-semibold text-gold-light"
            data-ocid="hero.badge.2"
          >
            TRUSTED BY 2L CLIENTS 🫶
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-foreground">We Build</span>{" "}
          <span className="text-gold-gradient">Premium Websites</span>
          <br />
          <span className="text-foreground">at the</span>{" "}
          <span className="text-gold-gradient">Lowest Cost.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          High-quality, professional websites designed to{" "}
          <span className="text-gold font-semibold">
            grow your business — without breaking the bank.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToInquiry}
            className="bg-gold text-background hover:bg-gold-light font-semibold px-8 py-3 text-base gold-glow transition-all duration-300 hover:scale-105"
            data-ocid="hero.primary_button"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Get Your Website Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-gold/40 text-gold hover:bg-gold/10 hover:border-gold px-8 py-3 text-base transition-all duration-300"
            data-ocid="hero.secondary_button"
          >
            View Plans
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-muted-foreground hover:text-gold transition-colors float-anim"
          >
            <ArrowDown size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
