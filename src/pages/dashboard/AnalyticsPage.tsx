import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Users, CreditCard, Calendar, Activity } from "lucide-react";
import { Helmet } from "react-helmet-async";

const monthlyData = [
  { month: "Jan", revenue: 32000, members: 1850 },
  { month: "Fév", revenue: 35000, members: 1920 },
  { month: "Mar", revenue: 38000, members: 2100 },
  { month: "Avr", revenue: 42000, members: 2350 },
  { month: "Mai", revenue: 45000, members: 2500 },
  { month: "Juin", revenue: 48000, members: 2650 },
  { month: "Juil", revenue: 52000, members: 2750 },
  { month: "Août", revenue: 49000, members: 2700 },
  { month: "Sep", revenue: 51000, members: 2800 },
  { month: "Oct", revenue: 54000, members: 2850 },
  { month: "Nov", revenue: 56000, members: 2900 },
  { month: "Déc", revenue: 58000, members: 2950 },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

export default function AnalyticsPage() {
  return (
    <>
      <Helmet>
        <title>Analytics - GymFlow Pro</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">
              Analytics
            </h1>
            <p className="text-muted-foreground">
              Analysez les performances de votre salle
            </p>
          </div>
          <Button variant="outline">
            <Download size={18} />
            Exporter rapport
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <CreditCard size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenu annuel</p>
                  <p className="text-2xl font-bold font-display">€560K</p>
                  <div className="flex items-center gap-1 text-xs text-success mt-1">
                    <TrendingUp size={12} />
                    +24% vs année dernière
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/20">
                  <Users size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Croissance membres</p>
                  <p className="text-2xl font-bold font-display">+59%</p>
                  <div className="flex items-center gap-1 text-xs text-success mt-1">
                    <TrendingUp size={12} />
                    +1,100 nouveaux membres
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/20">
                  <Activity size={24} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taux de rétention</p>
                  <p className="text-2xl font-bold font-display">87.3%</p>
                  <div className="flex items-center gap-1 text-xs text-destructive mt-1">
                    <TrendingDown size={12} />
                    -2.4% vs mois dernier
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/20">
                  <Calendar size={24} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taux d'occupation</p>
                  <p className="text-2xl font-bold font-display">78%</p>
                  <div className="flex items-center gap-1 text-xs text-success mt-1">
                    <TrendingUp size={12} />
                    +5% vs mois dernier
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Revenus mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-md transition-all hover:opacity-80"
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Classes */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Classes populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "CrossFit HIIT", bookings: 456, percentage: 95 },
                  { name: "Yoga Flow", bookings: 412, percentage: 87 },
                  { name: "Boxing Fitness", bookings: 389, percentage: 82 },
                  { name: "Pilates Core", bookings: 321, percentage: 68 },
                  { name: "Spinning", bookings: 287, percentage: 61 },
                ].map((cls, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{cls.name}</span>
                      <span className="text-sm text-muted-foreground">{cls.bookings} réservations</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                        style={{ width: `${cls.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Member Demographics */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Répartition des membres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "18-25 ans", value: 28, color: "bg-primary" },
                  { label: "26-35 ans", value: 35, color: "bg-accent" },
                  { label: "36-45 ans", value: 22, color: "bg-success" },
                  { label: "46+ ans", value: 15, color: "bg-warning" },
                ].map((demo, index) => (
                  <div key={index} className="p-4 rounded-xl bg-secondary/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${demo.color}`} />
                      <span className="text-sm text-muted-foreground">{demo.label}</span>
                    </div>
                    <p className="text-2xl font-bold font-display">{demo.value}%</p>
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
