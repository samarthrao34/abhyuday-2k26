
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
  image: string;
  prize: string;
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
