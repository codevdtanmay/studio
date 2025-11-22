'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { yogaModules } from '@/lib/data';
import BottomNav from '@/components/BottomNav';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function YogaPage() {
  const { user } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const modules = useMemo(() => {
    const stage = user.stage || 'Reproductive'; // Default to a stage if none is selected
    return yogaModules[stage] || [];
  }, [user.stage]);

  const handleStartSession = (moduleName: string) => {
    toast({
      title: 'Session Started',
      description: `Starting your ${moduleName} session.`,
    });
  };

  const handleTrackProgress = () => {
    router.push('/dashboard');
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold">Your Yoga Modules</h1>
          <p className="text-muted-foreground mt-2">Based on your selection of the <span className="font-semibold text-primary">{user.stage || 'Reproductive'} Stage</span>.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {modules.map((module) => {
            const placeholder = PlaceHolderImages.find(p => p.id === module.videoUrlId);
            return (
              <Card key={module.name} className="overflow-hidden flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">{module.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  {placeholder && (
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                       <Image
                          src={placeholder.imageUrl}
                          alt={placeholder.description}
                          fill
                          className="object-cover"
                          data-ai-hint={placeholder.imageHint}
                       />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                      <p><span className="font-semibold">Duration:</span> {module.duration}</p>
                      <p><span className="font-semibold">Frequency:</span> {module.frequency}</p>
                  </div>
                  <CardDescription>{module.instructions}</CardDescription>
                </CardContent>
                <CardFooter className="flex gap-4 bg-muted/50 p-4">
                  <Button className="flex-1" onClick={() => handleStartSession(module.name)}>
                    <PlayCircle className="mr-2 h-4 w-4" /> Start Session
                  </Button>
                  <Button variant="secondary" className="flex-1" onClick={handleTrackProgress}>
                    <BarChart className="mr-2 h-4 w-4" /> Track Progress
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
