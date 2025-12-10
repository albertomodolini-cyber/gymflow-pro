import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  CreditCard,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const stats = [
  {
    title: "Membres actifs",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Revenus du mois",
    value: "€45,231",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Réservations",
    value: "1,234",
    change: "+23.1%",
    trend: "up",
    icon: Calendar,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Taux de rétention",
    value: "87.3%",
    change: "-2.4%",
    trend: "down",
    icon: TrendingUp,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const recentMembers = [
  { name: "Marie Martin", email: "marie@example.com", plan: "Premium", date: "Il y a 2h" },
  { name: "Pierre Durand", email: "pierre@example.com", plan: "Basic", date: "Il y a 5h" },
  { name: "Sophie Bernard", email: "sophie@example.com", plan: "Premium", date: "Il y a 1j" },
  { name: "Lucas Petit", email: "lucas@example.com", plan: "Basic", date: "Il y a 2j" },
];

const upcomingClasses = [
  { name: "Yoga Flow", instructor: "Emma L.", time: "09:00", spots: "8/15" },
  { name: "CrossFit HIIT", instructor: "Marc D.", time: "10:30", spots: "12/20" },
  { name: "Pilates Core", instructor: "Julie R.", time: "14:00", spots: "5/12" },
  { name: "Boxing Fitness", instructor: "Thomas B.", time: "18:00", spots: "15/15" },
];

export default function DashboardHome() {
  return (
    <>
      <Helmet>
        <title>Tableau de bord - GymFlow Pro</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">
              Bonjour, Jean 👋
            </h1>
            <p className="text-muted-foreground">
              Voici ce qui se passe dans votre salle aujourd'hui.
            </p>
          </div>
          <Button variant="hero">
            Ajouter un membre
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} variant="default" className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold font-display">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Members */}
          <Card variant="default">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Nouveaux membres</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={18} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center font-bold text-sm">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          member.plan === "Premium"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {member.plan}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{member.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Classes */}
          <Card variant="default">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Classes aujourd'hui</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={18} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((cls, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                        <Calendar size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{cls.name}</p>
                        <p className="text-sm text-muted-foreground">{cls.instructor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{cls.time}</p>
                      <p
                        className={`text-xs ${
                          cls.spots === "15/15"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cls.spots} places
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
