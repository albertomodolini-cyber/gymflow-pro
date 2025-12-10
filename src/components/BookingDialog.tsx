import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, User, Calendar, Bell, AlertTriangle } from "lucide-react";
import { GymClass } from "@/hooks/useBookings";

interface BookingDialogProps {
  classItem: GymClass | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
  onCancel: () => void;
  isBooked: boolean;
  isOnWaitlist: boolean;
  availableSpots: number;
}

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export function BookingDialog({
  classItem,
  isOpen,
  onClose,
  onBook,
  onCancel,
  isBooked,
  isOnWaitlist,
  availableSpots,
}: BookingDialogProps) {
  if (!classItem) return null;

  const isFull = availableSpots <= 0;
  const occupancyRate = (classItem.currentBookings / classItem.maxCapacity) * 100;
  const formatTime = (hour: number) => `${Math.floor(hour).toString().padStart(2, '0')}:${hour % 1 === 0 ? '00' : '30'}`;
  const endTime = classItem.start + classItem.duration;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${classItem.color.replace('/80', '')}`} />
            <DialogTitle className="text-xl">{classItem.name}</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            {classItem.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Class Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-muted-foreground" />
              <span>{days[classItem.day]}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} className="text-muted-foreground" />
              <span>{formatTime(classItem.start)} - {formatTime(endTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User size={16} className="text-muted-foreground" />
              <span>{classItem.instructor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} className="text-muted-foreground" />
              <span>{classItem.currentBookings}/{classItem.maxCapacity} places</span>
            </div>
          </div>

          {/* Capacity Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remplissage</span>
              <span className={isFull ? "text-destructive" : availableSpots <= 3 ? "text-warning" : "text-success"}>
                {isFull ? "Complet" : `${availableSpots} places disponibles`}
              </span>
            </div>
            <Progress 
              value={occupancyRate} 
              className="h-2"
            />
          </div>

          {/* Waitlist Info */}
          {classItem.waitlist.length > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <AlertTriangle size={16} className="text-warning" />
              <span className="text-sm">
                {classItem.waitlist.length} personne{classItem.waitlist.length > 1 ? 's' : ''} en liste d'attente
              </span>
            </div>
          )}

          {/* User Status */}
          {(isBooked || isOnWaitlist) && (
            <div className="flex items-center gap-2">
              <Badge variant={isBooked ? "default" : "secondary"}>
                {isBooked ? "✓ Réservé" : `En attente (position ${classItem.waitlist.indexOf("current-user") + 1})`}
              </Badge>
            </div>
          )}

          {/* Email Reminder Note */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
            <Bell size={16} className="text-primary mt-0.5" />
            <span className="text-muted-foreground">
              Un rappel vous sera envoyé 24h avant le cours
            </span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {isBooked || isOnWaitlist ? (
            <>
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
              <Button variant="destructive" onClick={onCancel}>
                Annuler ma réservation
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button variant="hero" onClick={onBook}>
                {isFull ? "Rejoindre la liste d'attente" : "Réserver"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
