import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const timeSlots = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const classes = [
  { day: 0, start: 7, duration: 1, name: "Yoga Flow", color: "bg-primary/80" },
  { day: 0, start: 18, duration: 1, name: "CrossFit", color: "bg-accent/80" },
  { day: 1, start: 9, duration: 1, name: "Pilates", color: "bg-info/80" },
  { day: 1, start: 17, duration: 1.5, name: "Boxing", color: "bg-warning/80" },
  { day: 2, start: 8, duration: 1, name: "Yoga Flow", color: "bg-primary/80" },
  { day: 2, start: 19, duration: 1, name: "HIIT", color: "bg-destructive/80" },
  { day: 3, start: 10, duration: 1, name: "Spinning", color: "bg-accent/80" },
  { day: 3, start: 18, duration: 1, name: "CrossFit", color: "bg-accent/80" },
  { day: 4, start: 7, duration: 1, name: "Yoga Flow", color: "bg-primary/80" },
  { day: 4, start: 16, duration: 2, name: "Musculation", color: "bg-success/80" },
  { day: 5, start: 9, duration: 1.5, name: "Zumba", color: "bg-warning/80" },
  { day: 6, start: 10, duration: 1, name: "Yoga", color: "bg-primary/80" },
];

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title>Planning - GymFlow Pro</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">
              Planning
            </h1>
            <p className="text-muted-foreground">
              Gérez les cours et réservations de votre salle
            </p>
          </div>
          <Button variant="hero">
            <Plus size={18} />
            Ajouter une classe
          </Button>
        </div>

        {/* Calendar Navigation */}
        <Card variant="default">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft size={18} />
            </Button>
            <CardTitle className="text-lg">Décembre 2024</CardTitle>
            <Button variant="ghost" size="icon">
              <ChevronRight size={18} />
            </Button>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Days Header */}
              <div className="grid grid-cols-8 border-b border-border">
                <div className="p-3 text-sm font-medium text-muted-foreground" />
                {days.map((day, index) => (
                  <div
                    key={day}
                    className="p-3 text-center border-l border-border"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {day}
                    </span>
                    <p className="text-lg font-bold">{9 + index}</p>
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              <div className="relative">
                {timeSlots.map((time, timeIndex) => (
                  <div
                    key={time}
                    className="grid grid-cols-8 border-b border-border/50"
                  >
                    <div className="p-2 text-xs text-muted-foreground text-right pr-3">
                      {time}
                    </div>
                    {days.map((_, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="h-12 border-l border-border/50 relative"
                      />
                    ))}
                  </div>
                ))}

                {/* Classes Overlay */}
                {classes.map((cls, index) => {
                  const topOffset = (cls.start - 6) * 48 + 8;
                  const height = cls.duration * 48 - 4;
                  const leftOffset = (cls.day + 1) * 12.5;

                  return (
                    <div
                      key={index}
                      className={`absolute rounded-lg ${cls.color} text-primary-foreground p-2 cursor-pointer hover:opacity-90 transition-opacity`}
                      style={{
                        top: `${topOffset}px`,
                        height: `${height}px`,
                        left: `${leftOffset}%`,
                        width: "calc(12.5% - 4px)",
                      }}
                    >
                      <p className="text-xs font-semibold truncate">{cls.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap gap-4">
          {[
            { name: "Yoga", color: "bg-primary" },
            { name: "CrossFit", color: "bg-accent" },
            { name: "Pilates", color: "bg-info" },
            { name: "Boxing", color: "bg-warning" },
            { name: "HIIT", color: "bg-destructive" },
            { name: "Musculation", color: "bg-success" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${item.color}`} />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
