import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface NavbarProps {
  onAdminClick: () => void;
}

export function Navbar({ onAdminClick }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "oklch(0.09 0.012 280 / 0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid oklch(0.77 0.155 85 / 0.15)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-bold text-gold-gradient">
              Zynx Developers
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full shimmer-badge text-gold-light font-medium">
              PREMIUM
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              type="button"
              onClick={() => scrollTo("pricing")}
              className="text-sm text-muted-foreground hover:text-gold transition-colors"
              data-ocid="nav.link"
            >
              Plans
            </button>
            <button
              type="button"
              onClick={() => scrollTo("small-business")}
              className="text-sm text-muted-foreground hover:text-gold transition-colors"
              data-ocid="nav.link"
            >
              Small Business
            </button>
            <button
              type="button"
              onClick={() => scrollTo("inquiry")}
              className="text-sm text-muted-foreground hover:text-gold transition-colors"
              data-ocid="nav.link"
            >
              Contact
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={onAdminClick}
              className="border-gold/40 text-gold hover:bg-gold/10 hover:border-gold"
              data-ocid="nav.admin.button"
            >
              Admin
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setOpen(!open)}
            data-ocid="nav.mobile.toggle"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-4 pb-4 space-y-2"
            style={{ background: "oklch(0.09 0.012 280 / 0.98)" }}
          >
            <button
              type="button"
              onClick={() => scrollTo("pricing")}
              className="block w-full text-left py-2 text-muted-foreground hover:text-gold transition-colors"
              data-ocid="nav.mobile.link"
            >
              Plans
            </button>
            <button
              type="button"
              onClick={() => scrollTo("small-business")}
              className="block w-full text-left py-2 text-muted-foreground hover:text-gold transition-colors"
              data-ocid="nav.mobile.link"
            >
              Small Business
            </button>
            <button
              type="button"
              onClick={() => scrollTo("inquiry")}
              className="block w-full text-left py-2 text-muted-foreground hover:text-gold transition-colors"
              data-ocid="nav.mobile.link"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => {
                onAdminClick();
                setOpen(false);
              }}
              className="block w-full text-left py-2 text-gold hover:text-gold-light transition-colors"
              data-ocid="nav.mobile.admin.button"
            >
              Admin Panel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
