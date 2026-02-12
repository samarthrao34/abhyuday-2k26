
export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'technical' | 'cultural' | 'literary';
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  prize: string;
  rules: string[];
  teamSize: string;
  registrationFee: string;
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
  festCategory?: 'technical' | 'cultural' | 'literary' | 'overall';
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'technical' | 'cultural' | 'literary' | 'highlights';
  year?: string;
}

export interface ScheduleEvent {
  id: string;
  eventId: string;
  title: string;
  category: 'technical' | 'cultural' | 'literary';
  date: string;
  startTime: string;
  endTime: string;
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
