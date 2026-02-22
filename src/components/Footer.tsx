import { useData } from '@/contexts/DataContext';

export default function Footer() {
  const { settings } = useData();
  return (
    <footer className="border-t border-border py-8 px-4 text-center">
      <p className="font-display text-sm text-muted-foreground tracking-wider">
        © 2026 {settings.festName} • {settings.collegeName}
      </p>
      <p className="text-xs text-muted-foreground/50 mt-2">Developed by <span className="gradient-text font-semibold">Nivesh Seth</span> & <span className="gradient-text font-semibold">Samarth Rao</span></p>
    </footer>
  );
}
