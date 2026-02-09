
import { ColorPalette, EventItem, Sponsor, NavItem } from './types';

export const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Deep Space",
    primary: "#ffffff",
    secondary: "#1e3a8a",
    accent: "#60a5fa",
    background: "#030014",
    text: "#F8FAFC"
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Proshow", href: "#proshow" },
  { label: "Contact", href: "#contact" }
];

export const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Cosmic Code",
    category: "technical",
    description: "Navigate through stellar algorithms in our flagship coding marathon.",
    date: "March 12, 2026",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80",
    prize: "₹75,000"
  },
  {
    id: "2",
    title: "Celestial Beats",
    category: "cultural",
    description: "The music festival that echoes across the galaxy.",
    date: "March 13, 2026",
    image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=800&q=80",
    prize: "₹50,000"
  },
  {
    id: "3",
    title: "Nebula Narratives",
    category: "literary",
    description: "Storytelling and poetry from the farthest reaches of imagination.",
    date: "March 14, 2026",
    image: "https://images.unsplash.com/photo-1464802686167-b939a67e06a1?auto=format&fit=crop&w=800&q=80",
    prize: "₹25,000"
  }
];

export const SPONSORS: Sponsor[] = [
  { name: "SpaceX", tier: "platinum", logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/SpaceX-Logo.svg", website: "#" },
  { name: "NASA", tier: "platinum", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg", website: "#" }
];
