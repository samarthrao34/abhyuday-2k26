
import { ColorPalette, EventItem, Sponsor, NavItem, Coordinator, GalleryItem, ScheduleEvent } from './types';

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
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" }
];

// TECHNICAL FEST EVENTS
export const TECH_EVENTS: EventItem[] = [
  {
    id: "tech-1",
    title: "Cosmic Code",
    category: "technical",
    description: "Navigate through stellar algorithms in our flagship 24-hour coding marathon. Solve complex problems, optimize solutions, and compete for glory.",
    date: "February 23, 2026",
    time: "10:00 AM - 10:00 AM (Next Day)",
    venue: "Computer Lab Complex, Block A",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
    prize: "₹75,000",
    rules: ["Team of 2-3 members", "Bring your own laptops", "Internet access provided", "Use of AI tools restricted", "Plagiarism leads to disqualification"],
    teamSize: "2-3 members",
    registrationFee: "₹300 per team"
  },
  {
    id: "tech-2",
    title: "RoboWars",
    category: "technical",
    description: "Build, program, and battle your robots in an epic arena showdown. Last bot standing wins!",
    date: "February 23, 2026",
    time: "2:00 PM - 6:00 PM",
    venue: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    prize: "₹60,000",
    rules: ["Robot weight limit: 15kg", "Max dimensions: 50x50x50 cm", "No flame or liquid weapons", "Remote controlled only", "Safety inspection mandatory"],
    teamSize: "3-4 members",
    registrationFee: "₹500 per team"
  },
  {
    id: "tech-3",
    title: "Hack The Future",
    category: "technical",
    description: "48-hour hackathon to build innovative solutions for real-world problems. Theme revealed at start.",
    date: "February 23-24, 2026",
    time: "9:00 AM onwards",
    venue: "Innovation Hub, Block C",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    prize: "₹1,00,000",
    rules: ["Team of 3-5 members", "Original ideas only", "Working prototype required", "Presentation mandatory", "Mentors available 24/7"],
    teamSize: "3-5 members",
    registrationFee: "₹400 per team"
  },
  {
    id: "tech-4",
    title: "Circuit Craft",
    category: "technical",
    description: "Design and build electronic circuits to solve given challenges within time limits.",
    date: "February 24, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Electronics Lab, Block B",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    prize: "₹40,000",
    rules: ["Components provided", "Basic tools allowed", "No pre-built circuits", "Time-based scoring", "Safety first"],
    teamSize: "2 members",
    registrationFee: "₹250 per team"
  },
  {
    id: "tech-5",
    title: "AI Arena",
    category: "technical",
    description: "Build AI models to compete in various challenges - image recognition, NLP, and predictive analytics.",
    date: "February 24, 2026",
    time: "11:00 AM - 5:00 PM",
    venue: "AI Lab, Block A",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    prize: "₹50,000",
    rules: ["Pre-trained models allowed", "Dataset provided on spot", "GPU access available", "Code submission required", "Presentation of approach"],
    teamSize: "2-3 members",
    registrationFee: "₹350 per team"
  },
  {
    id: "tech-6",
    title: "Web Wizards",
    category: "technical",
    description: "Design and develop a complete web application in 6 hours based on the given theme.",
    date: "February 25, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Computer Lab 2, Block A",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    prize: "₹35,000",
    rules: ["Any tech stack allowed", "No templates", "Responsive design mandatory", "Live deployment bonus", "UI/UX judged"],
    teamSize: "2-3 members",
    registrationFee: "₹300 per team"
  }
];

// CULTURAL FEST EVENTS
export const CULTURAL_EVENTS: EventItem[] = [
  {
    id: "cult-1",
    title: "Celestial Beats",
    category: "cultural",
    description: "The ultimate battle of bands! Rock, classical, fusion - bring your best and own the stage.",
    date: "February 24, 2026",
    time: "6:00 PM - 10:00 PM",
    venue: "Open Air Theatre",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    prize: "₹50,000",
    rules: ["Band of 4-8 members", "15 minutes per performance", "Own instruments required", "Sound check slot provided", "No playback allowed"],
    teamSize: "4-8 members",
    registrationFee: "₹600 per band"
  },
  {
    id: "cult-2",
    title: "Nritya Tarang",
    category: "cultural",
    description: "Classical and folk dance competition celebrating India's rich cultural heritage.",
    date: "February 24, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=800&q=80",
    prize: "₹40,000",
    rules: ["Solo or group (max 12)", "8-12 minutes duration", "Costumes mandatory", "Props allowed", "Own music track required"],
    teamSize: "1-12 members",
    registrationFee: "₹400 per entry"
  },
  {
    id: "cult-3",
    title: "Street Style Showdown",
    category: "cultural",
    description: "Hip-hop, breaking, popping, locking - show your street dance moves and dominate the floor.",
    date: "February 25, 2026",
    time: "3:00 PM - 7:00 PM",
    venue: "Open Air Theatre",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=800&q=80",
    prize: "₹45,000",
    rules: ["Group of 6-15 members", "6-10 minutes performance", "No vulgar moves", "Props allowed", "Costume change permitted"],
    teamSize: "6-15 members",
    registrationFee: "₹500 per team"
  },
  {
    id: "cult-4",
    title: "Sur Sangam",
    category: "cultural",
    description: "Solo singing competition across genres - classical, Bollywood, Western, and indie.",
    date: "February 23, 2026",
    time: "11:00 AM - 3:00 PM",
    venue: "Seminar Hall",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    prize: "₹25,000",
    rules: ["Solo performance only", "5 minutes per song", "Karaoke track allowed", "Live instruments bonus", "No lip-syncing"],
    teamSize: "Individual",
    registrationFee: "₹150 per person"
  },
  {
    id: "cult-5",
    title: "Fashion Cosmos",
    category: "cultural",
    description: "Walk the ramp with style! Theme-based fashion show showcasing creativity and confidence.",
    date: "February 25, 2026",
    time: "7:00 PM - 10:00 PM",
    venue: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    prize: "₹55,000",
    rules: ["Team of 10-16 models", "Theme: Futuristic Traditions", "15-20 minutes duration", "Original designs preferred", "Background score required"],
    teamSize: "10-16 members",
    registrationFee: "₹800 per team"
  },
  {
    id: "cult-6",
    title: "Nukkad Natak",
    category: "cultural",
    description: "Street play competition highlighting social issues. Powerful performances, impactful messages.",
    date: "February 24, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Central Lawn",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80",
    prize: "₹30,000",
    rules: ["Team of 8-15 members", "15-25 minutes duration", "Social theme mandatory", "Minimal props", "No mics - natural projection"],
    teamSize: "8-15 members",
    registrationFee: "₹350 per team"
  }
];

// LITERARY FEST EVENTS
export const LITERARY_EVENTS: EventItem[] = [
  {
    id: "lit-1",
    title: "Nebula Narratives",
    category: "literary",
    description: "Creative writing competition - weave tales that transport readers to other worlds.",
    date: "February 23, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Library Hall",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    prize: "₹25,000",
    rules: ["Individual participation", "Topic given on spot", "1500-2000 words limit", "English or Hindi", "Handwritten submission"],
    teamSize: "Individual",
    registrationFee: "₹100 per person"
  },
  {
    id: "lit-2",
    title: "Debate Dimensions",
    category: "literary",
    description: "Parliamentary-style debate on contemporary issues. Argue, persuade, and win.",
    date: "February 24, 2026",
    time: "9:00 AM - 5:00 PM",
    venue: "Seminar Hall 2",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    prize: "₹30,000",
    rules: ["Team of 2 members", "Topics revealed 30 mins before", "7 minutes per speaker", "English only", "Rebuttals included"],
    teamSize: "2 members",
    registrationFee: "₹200 per team"
  },
  {
    id: "lit-3",
    title: "Poetic Pulse",
    category: "literary",
    description: "Open mic poetry slam - perform your original work and move the audience.",
    date: "February 25, 2026",
    time: "4:00 PM - 7:00 PM",
    venue: "Amphitheatre",
    image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=800&q=80",
    prize: "₹20,000",
    rules: ["Original poems only", "3-5 minutes per performance", "Any language allowed", "Props minimal", "No reading from paper"],
    teamSize: "Individual",
    registrationFee: "₹100 per person"
  },
  {
    id: "lit-4",
    title: "Quiz Quest",
    category: "literary",
    description: "Multi-round quiz covering science, tech, sports, entertainment, and current affairs.",
    date: "February 23, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80",
    prize: "₹35,000",
    rules: ["Team of 3 members", "Prelims + Finals", "No mobile phones", "Buzzer rounds", "Judge's decision final"],
    teamSize: "3 members",
    registrationFee: "₹250 per team"
  },
  {
    id: "lit-5",
    title: "Model United Nations",
    category: "literary",
    description: "Simulate UN proceedings, represent countries, draft resolutions, and shape global policy.",
    date: "February 23-25, 2026",
    time: "9:00 AM - 6:00 PM daily",
    venue: "Conference Hall, Block D",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    prize: "₹40,000",
    rules: ["Individual delegates", "Country allotment via registration", "Formal Western attire", "Position paper mandatory", "3-day commitment required"],
    teamSize: "Individual",
    registrationFee: "₹500 per delegate"
  },
  {
    id: "lit-6",
    title: "JAM Session",
    category: "literary",
    description: "Just A Minute - speak on random topics without hesitation, repetition, or deviation.",
    date: "February 24, 2026",
    time: "3:00 PM - 5:00 PM",
    venue: "Seminar Hall",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    prize: "₹15,000",
    rules: ["Individual participation", "Topics from a bowl", "60 seconds per turn", "Challenges allowed", "English only"],
    teamSize: "Individual",
    registrationFee: "₹80 per person"
  }
];

// Combined events for backward compatibility
export const EVENTS: EventItem[] = [
  ...TECH_EVENTS.slice(0, 2),
  ...CULTURAL_EVENTS.slice(0, 2),
  ...LITERARY_EVENTS.slice(0, 2)
];

// COORDINATORS
export const COORDINATORS: Coordinator[] = [
  // Faculty Coordinators
  {
    id: "fac-1",
    name: "Dr. Rajesh Kumar",
    role: "Chief Coordinator",
    type: "faculty",
    department: "Computer Science",
    email: "rajesh.kumar@aitm.edu",
    phone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    festCategory: "overall"
  },
  {
    id: "fac-2",
    name: "Dr. Priya Sharma",
    role: "Tech Fest Coordinator",
    type: "faculty",
    department: "Electronics & Communication",
    email: "priya.sharma@aitm.edu",
    phone: "+91 98765 43211",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    festCategory: "technical"
  },
  {
    id: "fac-3",
    name: "Prof. Amit Verma",
    role: "Cultural Fest Coordinator",
    type: "faculty",
    department: "Management Studies",
    email: "amit.verma@aitm.edu",
    phone: "+91 98765 43212",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    festCategory: "cultural"
  },
  {
    id: "fac-4",
    name: "Dr. Sunita Gupta",
    role: "Literary Fest Coordinator",
    type: "faculty",
    department: "Humanities",
    email: "sunita.gupta@aitm.edu",
    phone: "+91 98765 43213",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    festCategory: "literary"
  },
  // Student Coordinators
  {
    id: "stu-1",
    name: "Arjun Patel",
    role: "Student President",
    type: "student",
    department: "Computer Science, 4th Year",
    email: "arjun.patel@student.aitm.edu",
    phone: "+91 99887 76655",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    festCategory: "overall"
  },
  {
    id: "stu-2",
    name: "Sneha Reddy",
    role: "Tech Fest Lead",
    type: "student",
    department: "Information Technology, 3rd Year",
    email: "sneha.reddy@student.aitm.edu",
    phone: "+91 99887 76656",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    festCategory: "technical"
  },
  {
    id: "stu-3",
    name: "Vikram Singh",
    role: "Cultural Fest Lead",
    type: "student",
    department: "Mechanical Engineering, 3rd Year",
    email: "vikram.singh@student.aitm.edu",
    phone: "+91 99887 76657",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    festCategory: "cultural"
  },
  {
    id: "stu-4",
    name: "Ananya Krishnan",
    role: "Literary Fest Lead",
    type: "student",
    department: "Electronics, 3rd Year",
    email: "ananya.k@student.aitm.edu",
    phone: "+91 99887 76658",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    festCategory: "literary"
  },
  {
    id: "stu-5",
    name: "Rohan Mehta",
    role: "Sponsorship Head",
    type: "student",
    department: "MBA, 2nd Year",
    email: "rohan.mehta@student.aitm.edu",
    phone: "+91 99887 76659",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    festCategory: "overall"
  },
  {
    id: "stu-6",
    name: "Kavya Nair",
    role: "PR & Media Head",
    type: "student",
    department: "Computer Science, 2nd Year",
    email: "kavya.nair@student.aitm.edu",
    phone: "+91 99887 76660",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    festCategory: "overall"
  }
];

// GALLERY ITEMS
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", alt: "Tech symposium crowd", category: "technical", year: "2025" },
  { id: "g2", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", alt: "Cultural night performance", category: "cultural", year: "2025" },
  { id: "g3", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80", alt: "Debate competition", category: "literary", year: "2025" },
  { id: "g4", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80", alt: "Opening ceremony", category: "highlights", year: "2025" },
  { id: "g5", src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80", alt: "Hackathon winners", category: "technical", year: "2025" },
  { id: "g6", src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80", alt: "Battle of bands", category: "cultural", year: "2025" },
  { id: "g7", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80", alt: "Workshop session", category: "technical", year: "2025" },
  { id: "g8", src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80", alt: "Dance performance", category: "cultural", year: "2025" },
  { id: "g9", src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=800&q=80", alt: "Poetry session", category: "literary", year: "2025" },
  { id: "g10", src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80", alt: "Award ceremony", category: "highlights", year: "2025" },
  { id: "g11", src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", alt: "Robotics showcase", category: "technical", year: "2025" },
  { id: "g12", src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80", alt: "DJ night", category: "cultural", year: "2025" }
];

// SCHEDULE EVENTS
export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  // Day 1 - February 23
  { id: "s1", eventId: "tech-1", title: "Cosmic Code (Starts)", category: "technical", date: "February 23, 2026", startTime: "10:00", endTime: "22:00", venue: "Computer Lab Complex", day: 1 },
  { id: "s2", eventId: "tech-2", title: "RoboWars", category: "technical", date: "February 23, 2026", startTime: "14:00", endTime: "18:00", venue: "Main Auditorium", day: 1 },
  { id: "s3", eventId: "cult-4", title: "Sur Sangam", category: "cultural", date: "February 23, 2026", startTime: "11:00", endTime: "15:00", venue: "Seminar Hall", day: 1 },
  { id: "s4", eventId: "lit-1", title: "Nebula Narratives", category: "literary", date: "February 23, 2026", startTime: "10:00", endTime: "13:00", venue: "Library Hall", day: 1 },
  { id: "s5", eventId: "lit-4", title: "Quiz Quest", category: "literary", date: "February 23, 2026", startTime: "14:00", endTime: "17:00", venue: "Main Auditorium", day: 1 },
  { id: "s6", eventId: "tech-3", title: "Hack The Future (Starts)", category: "technical", date: "February 23, 2026", startTime: "09:00", endTime: "23:59", venue: "Innovation Hub", day: 1 },
  { id: "s7", eventId: "lit-5", title: "Model UN - Day 1", category: "literary", date: "February 23, 2026", startTime: "09:00", endTime: "18:00", venue: "Conference Hall", day: 1 },
  
  // Day 2 - February 24
  { id: "s8", eventId: "tech-3", title: "Hack The Future (Continues)", category: "technical", date: "February 24, 2026", startTime: "00:00", endTime: "17:00", venue: "Innovation Hub", day: 2 },
  { id: "s9", eventId: "tech-4", title: "Circuit Craft", category: "technical", date: "February 24, 2026", startTime: "10:00", endTime: "16:00", venue: "Electronics Lab", day: 2 },
  { id: "s10", eventId: "tech-5", title: "AI Arena", category: "technical", date: "February 24, 2026", startTime: "11:00", endTime: "17:00", venue: "AI Lab", day: 2 },
  { id: "s11", eventId: "cult-1", title: "Celestial Beats", category: "cultural", date: "February 24, 2026", startTime: "18:00", endTime: "22:00", venue: "Open Air Theatre", day: 2 },
  { id: "s12", eventId: "cult-2", title: "Nritya Tarang", category: "cultural", date: "February 24, 2026", startTime: "14:00", endTime: "17:00", venue: "Main Auditorium", day: 2 },
  { id: "s13", eventId: "cult-6", title: "Nukkad Natak", category: "cultural", date: "February 24, 2026", startTime: "10:00", endTime: "13:00", venue: "Central Lawn", day: 2 },
  { id: "s14", eventId: "lit-2", title: "Debate Dimensions", category: "literary", date: "February 24, 2026", startTime: "09:00", endTime: "17:00", venue: "Seminar Hall 2", day: 2 },
  { id: "s15", eventId: "lit-6", title: "JAM Session", category: "literary", date: "February 24, 2026", startTime: "15:00", endTime: "17:00", venue: "Seminar Hall", day: 2 },
  { id: "s16", eventId: "lit-5", title: "Model UN - Day 2", category: "literary", date: "February 24, 2026", startTime: "09:00", endTime: "18:00", venue: "Conference Hall", day: 2 },
  
  // Day 3 - February 25
  { id: "s17", eventId: "tech-6", title: "Web Wizards", category: "technical", date: "February 25, 2026", startTime: "10:00", endTime: "16:00", venue: "Computer Lab 2", day: 3 },
  { id: "s18", eventId: "cult-3", title: "Street Style Showdown", category: "cultural", date: "February 25, 2026", startTime: "15:00", endTime: "19:00", venue: "Open Air Theatre", day: 3 },
  { id: "s19", eventId: "cult-5", title: "Fashion Cosmos", category: "cultural", date: "February 25, 2026", startTime: "19:00", endTime: "22:00", venue: "Main Auditorium", day: 3 },
  { id: "s20", eventId: "lit-3", title: "Poetic Pulse", category: "literary", date: "February 25, 2026", startTime: "16:00", endTime: "19:00", venue: "Amphitheatre", day: 3 },
  { id: "s21", eventId: "lit-5", title: "Model UN - Day 3 & Closing", category: "literary", date: "February 25, 2026", startTime: "09:00", endTime: "18:00", venue: "Conference Hall", day: 3 }
];

export const SPONSORS: Sponsor[] = [
  { name: "TechCorp", tier: "platinum", logo: "https://via.placeholder.com/200x80?text=TechCorp", website: "#" },
  { name: "InnovateTech", tier: "platinum", logo: "https://via.placeholder.com/200x80?text=InnovateTech", website: "#" },
  { name: "DevHub", tier: "gold", logo: "https://via.placeholder.com/200x80?text=DevHub", website: "#" },
  { name: "CodeBase", tier: "gold", logo: "https://via.placeholder.com/200x80?text=CodeBase", website: "#" },
  { name: "StartupX", tier: "silver", logo: "https://via.placeholder.com/200x80?text=StartupX", website: "#" }
];
