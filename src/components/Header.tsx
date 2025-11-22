import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-headline">Yoga for Her</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/problem" className="transition-colors hover:text-primary text-muted-foreground">Problems</Link>
          <Link href="/stage" className="transition-colors hover:text-primary text-muted-foreground">Phases</Link>
          <Link href="/yoga" className="transition-colors hover:text-primary text-muted-foreground">Yoga Module</Link>
        </nav>
      </div>
    </header>
  );
}
