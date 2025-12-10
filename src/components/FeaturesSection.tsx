import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  Bell,
  Image,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Gestion des membres",
    description: "Gérez facilement vos membres, leurs abonnements et leur historique. QR codes pour check-in rapide.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Calendar,
    title: "Planification intelligente",
    description: "Calendrier interactif pour classes et sessions privées. Réservations en ligne avec listes d'attente.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: CreditCard,
    title: "Paiements automatisés",
    description: "Intégration Stripe pour paiements récurrents. Factures automatiques et rappels de paiement.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: BarChart3,
    title: "Analytics avancés",
    description: "Tableaux de bord en temps réel. Suivez votre chiffre d'affaires, taux d'occupation et rétention.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    icon: Bell,
    title: "Notifications push",
    description: "Rappels automatiques pour les cours, paiements et promotions. Email, SMS et push.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Image,
    title: "Galerie & Médias",
    description: "Upload et gestion d'images. Galeries pour classes, équipements et événements.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Sécurité GDPR",
    description: "Protection des données santé. Conformité RGPD et chiffrement bout-en-bout.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Zap,
    title: "Multi-tenant",
    description: "Chaque salle a son espace isolé. Parfait pour franchises et groupes de gyms.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Globe,
    title: "Multilingue",
    description: "Interface en français et anglais. Ajoutez d'autres langues facilement.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-lg text-muted-foreground">
            Une plateforme complète pour gérer votre salle de sport de A à Z.
            Des fonctionnalités pensées pour vous simplifier la vie.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="interactive"
              className="group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} mb-2 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={24} className={feature.color} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
