export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export type FestCategory = 'technical' | 'cultural' | 'literary';

export interface EventItem {
  id: string;
  title: string;
  category: FestCategory;
  department: string;  // e.g. CSE, ECE, MBA, B.Pharm, etc.
  description: string;
  date: string;       // YYYY-MM-DD
  time: string;       // e.g. 10:00 AM – 12:00 PM
  venue: string;
  image: string;
  prize: string;
  rules: string[];
  teamSize: string;   // e.g. Solo / 2–4 / 5–8
  registrationFee: string; // e.g. Free / ₹200 per team
}

export interface Coordinator {
  id: string;
  name: string;
  role: string;
  type: 'student' | 'faculty';
  department: string;
  email: string;
  phone: string;
  image: string;
  festCategory?: FestCategory | 'overall';
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: FestCategory | 'highlights';
  year?: string;
}

export interface ScheduleEvent {
  id: string;
  eventId: string;
  title: string;
  category: FestCategory;
  date: string;       // YYYY-MM-DD
  startTime: string;  // 24h e.g. 10:00
  endTime: string;    // 24h e.g. 12:00
  venue: string;
  day: 1 | 2 | 3;
}

export interface Sponsor {
  name: string;
  tier: 'platinum' | 'gold' | 'silver';
  logo: string;
  website: string;
}

export interface NavItem {
  label: string;
  href: string;
}