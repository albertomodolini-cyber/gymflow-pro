import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "29",
    description: "Parfait pour les petites salles",
    features: [
      "Jusqu'à 100 membres",
      "Gestion des abonnements",
      "Calendrier de réservations",
      "Support email",
      "1 admin",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "79",
    description: "Pour les salles en croissance",
    features: [
      "Jusqu'à 500 membres",
      "Toutes les fonctionnalités Starter",
      "Paiements automatisés Stripe",
      "Analytics avancés",
      "Notifications push & SMS",
      "5 admins",
      "Support prioritaire",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "199",
    description: "Pour les franchises et groupes",
    features: [
      "Membres illimités",
      "Toutes les fonctionnalités Pro",
      "Multi-sites / Multi-tenant",
      "API personnalisée",
      "Intégrations sur mesure",
      "Admins illimités",
      "Account manager dédié",
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-lg text-muted-foreground">
            Choisissez le plan qui correspond à vos besoins. 
            Pas de frais cachés, annulez quand vous voulez.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              variant={plan.popular ? "gradient" : "default"}
              className={`relative ${plan.popular ? "border-primary/50 shadow-xl shadow-primary/10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    Le plus populaire
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-display font-bold">{plan.price}€</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check size={12} className="text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full mt-6"
                  asChild
                >
                  <Link to="/auth?mode=signup">
                    Commencer
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
