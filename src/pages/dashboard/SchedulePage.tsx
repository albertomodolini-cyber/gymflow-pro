import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronLeft, ChevronRight, Users, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useBookings } from "@/hooks/useBookings";
import { BookingDialog } from "@/components/BookingDialog";
import { useToast } from "@/hooks/use-toast";
import type { GymClass } from "@/hooks/useBookings";

const timeSlots = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function SchedulePage() {
  const { toast } = useToast();
  const {
    classes,
    getAvailableSpots,
    isClassFull,
    isUserBooked,
    isUserOnWaitlist,
    bookClass,
    cancelBooking,
  } = useBookings();

  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClassClick = (classItem: GymClass) => {
    setSelectedClass(classItem);
    setIsDialogOpen(true);
  };

  const handleBook = () => {
    if (!selectedClass) return;
    
    const result = bookClass(selectedClass.id);
    
    if (result.success) {
      toast({
        title: result.status === 'waitlist' ? "Liste d'attente" : "Réservation confirmée !",
        description: result.message,
        variant: result.status === 'waitlist' ? "default" : "default",
      });
    } else {
      toast({
        title: "Erreur",
        description: result.message,
        variant: "destructive",
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    if (!selectedClass) return;
    
    const result = cancelBooking(selectedClass.id);
    
    toast({
      title: result.success ? "Annulation confirmée" : "Erreur",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });
    
    setIsDialogOpen(false);
  };

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
              Réservez vos cours et gérez vos inscriptions
            </p>
          </div>
          <Button variant="hero">
            <Plus size={18} />
            Ajouter une classe
          </Button>
        </div>

        {/* User Bookings Summary */}
        <div className="flex flex-wrap gap-2">
          {classes.filter(c => isUserBooked(c.id)).map(c => (
            <Badge key={c.id} variant="default" className="cursor-pointer" onClick={() => handleClassClick(c)}>
              {c.name} - {days[c.day]}
            </Badge>
          ))}
          {classes.filter(c => isUserOnWaitlist(c.id)).map(c => (
            <Badge key={c.id} variant="secondary" className="cursor-pointer" onClick={() => handleClassClick(c)}>
              {c.name} (attente)
            </Badge>
          ))}
        </div>

        {/* Calendar */}
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
                {timeSlots.map((time) => (
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
                {classes.map((cls) => {
                  const topOffset = (cls.start - 6) * 48 + 8;
                  const height = cls.duration * 48 - 4;
                  const leftOffset = (cls.day + 1) * 12.5;
                  const isFull = isClassFull(cls);
                  const booked = isUserBooked(cls.id);
                  const onWaitlist = isUserOnWaitlist(cls.id);
                  const spots = getAvailableSpots(cls);

                  return (
                    <div
                      key={cls.id}
                      className={`absolute rounded-lg ${cls.color} text-primary-foreground p-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${booked ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''} ${onWaitlist ? 'ring-2 ring-warning ring-offset-2 ring-offset-background' : ''}`}
                      style={{
                        top: `${topOffset}px`,
                        height: `${height}px`,
                        left: `${leftOffset}%`,
                        width: "calc(12.5% - 4px)",
                      }}
                      onClick={() => handleClassClick(cls)}
                    >
                      <p className="text-xs font-semibold truncate">{cls.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Users size={10} />
                        <span className="text-[10px]">
                          {isFull ? "Complet" : `${spots} places`}
                        </span>
                      </div>
                      {cls.waitlist.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full flex items-center justify-center">
                          <span className="text-[8px] font-bold text-warning-foreground">{cls.waitlist.length}</span>
                        </div>
                      )}
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
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
            <div className="w-3 h-3 rounded ring-2 ring-primary" />
            <span className="text-sm text-muted-foreground">Réservé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded ring-2 ring-warning" />
            <span className="text-sm text-muted-foreground">Liste d'attente</span>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <BookingDialog
        classItem={selectedClass}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onBook={handleBook}
        onCancel={handleCancel}
        isBooked={selectedClass ? isUserBooked(selectedClass.id) : false}
        isOnWaitlist={selectedClass ? isUserOnWaitlist(selectedClass.id) : false}
        availableSpots={selectedClass ? getAvailableSpots(selectedClass) : 0}
      />
    </>
  );
}
