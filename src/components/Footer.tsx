import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

const footerLinks = {
  Produit: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Intégrations", href: "#" },
    { label: "API", href: "#" },
  ],
  Entreprise: [
    { label: "À propos", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Ressources: [
    { label: "Documentation", href: "#" },
    { label: "Tutoriels", href: "#" },
    { label: "Support", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Légal: [
    { label: "Confidentialité", href: "#" },
    { label: "CGU", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "RGPD", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              La plateforme tout-en-un pour gérer votre salle de sport comme un pro.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 GymFlow Pro. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Conforme RGPD • PCI DSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
