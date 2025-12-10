import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const members = [
  {
    id: 1,
    name: "Marie Martin",
    email: "marie@example.com",
    phone: "+33 6 12 34 56 78",
    plan: "Premium",
    status: "active",
    joinDate: "15 Jan 2024",
    avatar: null,
  },
  {
    id: 2,
    name: "Pierre Durand",
    email: "pierre@example.com",
    phone: "+33 6 98 76 54 32",
    plan: "Basic",
    status: "active",
    joinDate: "22 Feb 2024",
    avatar: null,
  },
  {
    id: 3,
    name: "Sophie Bernard",
    email: "sophie@example.com",
    phone: "+33 6 11 22 33 44",
    plan: "Premium",
    status: "active",
    joinDate: "10 Mar 2024",
    avatar: null,
  },
  {
    id: 4,
    name: "Lucas Petit",
    email: "lucas@example.com",
    phone: "+33 6 55 66 77 88",
    plan: "Basic",
    status: "expired",
    joinDate: "05 Dec 2023",
    avatar: null,
  },
  {
    id: 5,
    name: "Emma Leroy",
    email: "emma@example.com",
    phone: "+33 6 99 88 77 66",
    plan: "Premium",
    status: "active",
    joinDate: "28 Apr 2024",
    avatar: null,
  },
];

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Membres - GymFlow Pro</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">
              Membres
            </h1>
            <p className="text-muted-foreground">
              Gérez les membres de votre salle de sport
            </p>
          </div>
          <Button variant="hero">
            <Plus size={18} />
            Ajouter un membre
          </Button>
        </div>

        {/* Filters */}
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Rechercher un membre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter size={18} />
                Filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} variant="interactive">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          member.plan === "Premium"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {member.plan}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal size={18} />
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={14} />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={14} />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={14} />
                    <span>Inscrit le {member.joinDate}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span
                    className={`flex items-center gap-1.5 text-sm ${
                      member.status === "active"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        member.status === "active"
                          ? "bg-success"
                          : "bg-destructive"
                      }`}
                    />
                    {member.status === "active" ? "Actif" : "Expiré"}
                  </span>
                  <Button variant="ghost" size="sm">
                    Voir le profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
