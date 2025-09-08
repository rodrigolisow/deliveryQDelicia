import { TimeSlot } from '../types';

export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  
  // Generate slots from 08:00 to 10:00 in 10-minute intervals
  for (let hour = 8; hour < 10; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      slots.push({
        time: timeString,
        available: true,
        capacity: 10,
        booked: Math.floor(Math.random() * 5) // Random booking simulation
      });
    }
  }
  
  return slots;
}

export function isSlotAvailable(slot: TimeSlot): boolean {
  return slot.available && slot.booked < slot.capacity;
}
