import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isAfter, parseISO } from 'date-fns';

export interface Countdown {
  id: string;
  name: string;
  targetDate: string;
  createdAt: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const calculateTimeRemaining = (targetDate: string): CountdownTime => {
  const now = new Date();
  const target = parseISO(targetDate);
  
  if (!isAfter(target, now)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const totalSeconds = differenceInSeconds(target, now);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isExpired: false };
};

export const getCountdowns = (): Countdown[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('countdowns');
  return stored ? JSON.parse(stored) : [];
};

export const saveCountdowns = (countdowns: Countdown[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('countdowns', JSON.stringify(countdowns));
};

export const addCountdown = (countdown: Omit<Countdown, 'id' | 'createdAt'>): Countdown => {
  const countdowns = getCountdowns();
  if (countdowns.length >= 10) {
    throw new Error('Maximum 10 countdowns allowed');
  }
  
  const newCountdown: Countdown = {
    ...countdown,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
  
  const updatedCountdowns = [...countdowns, newCountdown];
  saveCountdowns(updatedCountdowns);
  return newCountdown;
};

export const updateCountdown = (id: string, updates: Partial<Countdown>): void => {
  const countdowns = getCountdowns();
  const index = countdowns.findIndex(c => c.id === id);
  if (index === -1) return;
  
  countdowns[index] = { ...countdowns[index], ...updates };
  saveCountdowns(countdowns);
};

export const deleteCountdown = (id: string): void => {
  const countdowns = getCountdowns();
  const filtered = countdowns.filter(c => c.id !== id);
  saveCountdowns(filtered);
};

export const validateFutureDate = (dateString: string): boolean => {
  const date = parseISO(dateString);
  return isAfter(date, new Date());
};