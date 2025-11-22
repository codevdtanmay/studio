'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, BarChart3, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/dashboard', label: 'Data', icon: BarChart3 },
  { href: '/yoga', label: 'Yoga', icon: HeartPulse },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t z-50">
      <nav className="h-full">
        <ul className="flex justify-around items-center h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link href={item.href} className="flex flex-col items-center justify-center w-16">
                  <item.icon className={cn('h-6 w-6 mb-1 transition-colors', isActive ? 'text-primary' : 'text-muted-foreground')} />
                  <span className={cn('text-xs font-medium transition-colors', isActive ? 'text-primary' : 'text-muted-foreground')}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
