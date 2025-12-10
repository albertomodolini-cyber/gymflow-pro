import { useState, useCallback } from 'react';

export interface GymClass {
  id: string;
  day: number;
  start: number;
  duration: number;
  name: string;
  color: string;
  instructor: string;
  maxCapacity: number;
  currentBookings: number;
  waitlist: string[];
  description: string;
}

export interface Booking {
  id: string;
  classId: string;
  userId: string;
  userName: string;
  status: 'confirmed' | 'waitlist' | 'cancelled';
  bookedAt: Date;
}

const initialClasses: GymClass[] = [
  { id: '1', day: 0, start: 7, duration: 1, name: "Yoga Flow", color: "bg-primary/80", instructor: "Marie L.", maxCapacity: 15, currentBookings: 12, waitlist: [], description: "Séance de yoga dynamique pour tous niveaux" },
  { id: '2', day: 0, start: 18, duration: 1, name: "CrossFit", color: "bg-accent/80", instructor: "Thomas B.", maxCapacity: 20, currentBookings: 20, waitlist: ["user1", "user2"], description: "Entraînement haute intensité" },
  { id: '3', day: 1, start: 9, duration: 1, name: "Pilates", color: "bg-info/80", instructor: "Sophie M.", maxCapacity: 12, currentBookings: 8, waitlist: [], description: "Renforcement musculaire profond" },
  { id: '4', day: 1, start: 17, duration: 1.5, name: "Boxing", color: "bg-warning/80", instructor: "Lucas D.", maxCapacity: 16, currentBookings: 14, waitlist: [], description: "Boxe cardio et technique" },
  { id: '5', day: 2, start: 8, duration: 1, name: "Yoga Flow", color: "bg-primary/80", instructor: "Marie L.", maxCapacity: 15, currentBookings: 15, waitlist: ["user3"], description: "Séance de yoga dynamique pour tous niveaux" },
  { id: '6', day: 2, start: 19, duration: 1, name: "HIIT", color: "bg-destructive/80", instructor: "Emma R.", maxCapacity: 25, currentBookings: 18, waitlist: [], description: "Intervalles haute intensité" },
  { id: '7', day: 3, start: 10, duration: 1, name: "Spinning", color: "bg-accent/80", instructor: "Paul V.", maxCapacity: 20, currentBookings: 16, waitlist: [], description: "Cycling en musique" },
  { id: '8', day: 3, start: 18, duration: 1, name: "CrossFit", color: "bg-accent/80", instructor: "Thomas B.", maxCapacity: 20, currentBookings: 19, waitlist: [], description: "Entraînement haute intensité" },
  { id: '9', day: 4, start: 7, duration: 1, name: "Yoga Flow", color: "bg-primary/80", instructor: "Marie L.", maxCapacity: 15, currentBookings: 10, waitlist: [], description: "Séance de yoga dynamique pour tous niveaux" },
  { id: '10', day: 4, start: 16, duration: 2, name: "Musculation", color: "bg-success/80", instructor: "Kevin P.", maxCapacity: 30, currentBookings: 22, waitlist: [], description: "Session guidée musculation" },
  { id: '11', day: 5, start: 9, duration: 1.5, name: "Zumba", color: "bg-warning/80", instructor: "Clara S.", maxCapacity: 25, currentBookings: 25, waitlist: ["user4", "user5", "user6"], description: "Danse fitness latino" },
  { id: '12', day: 6, start: 10, duration: 1, name: "Yoga", color: "bg-primary/80", instructor: "Marie L.", maxCapacity: 15, currentBookings: 6, waitlist: [], description: "Yoga relaxation dimanche" },
];

export function useBookings() {
  const [classes, setClasses] = useState<GymClass[]>(initialClasses);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const currentUserId = "current-user"; // Mock user

  const getAvailableSpots = useCallback((classItem: GymClass) => {
    return classItem.maxCapacity - classItem.currentBookings;
  }, []);

  const isClassFull = useCallback((classItem: GymClass) => {
    return classItem.currentBookings >= classItem.maxCapacity;
  }, []);

  const isUserBooked = useCallback((classId: string) => {
    return userBookings.some(b => b.classId === classId && b.status !== 'cancelled');
  }, [userBookings]);

  const isUserOnWaitlist = useCallback((classId: string) => {
    const classItem = classes.find(c => c.id === classId);
    return classItem?.waitlist.includes(currentUserId) || false;
  }, [classes]);

  const bookClass = useCallback((classId: string, userName: string = "Utilisateur") => {
    const classItem = classes.find(c => c.id === classId);
    if (!classItem) return { success: false, message: "Cours introuvable" };

    if (isUserBooked(classId)) {
      return { success: false, message: "Vous êtes déjà inscrit à ce cours" };
    }

    if (isClassFull(classItem)) {
      // Add to waitlist
      setClasses(prev => prev.map(c => 
        c.id === classId 
          ? { ...c, waitlist: [...c.waitlist, currentUserId] }
          : c
      ));
      
      const booking: Booking = {
        id: `booking-${Date.now()}`,
        classId,
        userId: currentUserId,
        userName,
        status: 'waitlist',
        bookedAt: new Date(),
      };
      setUserBookings(prev => [...prev, booking]);
      
      return { 
        success: true, 
        message: `Cours complet ! Vous êtes en position ${classItem.waitlist.length + 1} sur la liste d'attente`,
        status: 'waitlist' as const,
        position: classItem.waitlist.length + 1
      };
    }

    // Book normally
    setClasses(prev => prev.map(c => 
      c.id === classId 
        ? { ...c, currentBookings: c.currentBookings + 1 }
        : c
    ));

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      classId,
      userId: currentUserId,
      userName,
      status: 'confirmed',
      bookedAt: new Date(),
    };
    setUserBookings(prev => [...prev, booking]);

    return { success: true, message: "Réservation confirmée !", status: 'confirmed' as const };
  }, [classes, isUserBooked, isClassFull]);

  const cancelBooking = useCallback((classId: string) => {
    const booking = userBookings.find(b => b.classId === classId && b.status !== 'cancelled');
    if (!booking) return { success: false, message: "Réservation introuvable" };

    const classItem = classes.find(c => c.id === classId);
    if (!classItem) return { success: false, message: "Cours introuvable" };

    if (booking.status === 'waitlist') {
      setClasses(prev => prev.map(c => 
        c.id === classId 
          ? { ...c, waitlist: c.waitlist.filter(id => id !== currentUserId) }
          : c
      ));
    } else {
      // Move first person from waitlist if exists
      if (classItem.waitlist.length > 0) {
        setClasses(prev => prev.map(c => 
          c.id === classId 
            ? { ...c, waitlist: c.waitlist.slice(1) }
            : c
        ));
      } else {
        setClasses(prev => prev.map(c => 
          c.id === classId 
            ? { ...c, currentBookings: c.currentBookings - 1 }
            : c
        ));
      }
    }

    setUserBookings(prev => prev.map(b => 
      b.id === booking.id ? { ...b, status: 'cancelled' } : b
    ));

    return { success: true, message: "Réservation annulée" };
  }, [userBookings, classes]);

  return {
    classes,
    userBookings: userBookings.filter(b => b.status !== 'cancelled'),
    getAvailableSpots,
    isClassFull,
    isUserBooked,
    isUserOnWaitlist,
    bookClass,
    cancelBooking,
  };
}
