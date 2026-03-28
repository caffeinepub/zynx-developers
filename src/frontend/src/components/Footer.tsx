import { Globe, Instagram, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const href = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{
        background: "oklch(0.07 0.01 280)",
        borderTop: "1px solid oklch(0.77 0.155 85 / 0.15)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div>
            <span className="font-display text-2xl font-bold text-gold-gradient block mb-2">
              Zynx Developers
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional website design and Instagram reel editing at the
              lowest prices.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Basic Website Design</li>
              <li>Luxury Business Websites</li>
              <li>High Graphic Websites</li>
              <li>Instagram Reel Editing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Connect</h4>
            <div className="flex gap-4">
              <button
                type="button"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </button>
              <button
                type="button"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Website"
              >
                <Globe size={20} />
              </button>
              <button
                type="button"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground"
          style={{ borderTop: "1px solid oklch(0.77 0.155 85 / 0.1)" }}
        >
          <p>© {year} Zynx Developers. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
