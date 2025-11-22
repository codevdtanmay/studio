'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { yogaModules } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, ArrowLeft } from 'lucide-react';

export default function YogaSessionPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const allModules = Object.values(yogaModules).flat();
  const module = allModules.find(m => m.videoUrlId === slug);
  const placeholder = PlaceHolderImages.find(p => p.id === slug);

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <p className="text-xl text-muted-foreground mb-4">Yoga Module not found.</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Modules
        </Button>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-4xl font-headline">{module.name}</CardTitle>
            <CardDescription>Follow the instructions to complete your session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {placeholder && (
              <div className="aspect-video relative rounded-lg overflow-hidden border">
                 <Image
                    src={placeholder.imageUrl}
                    alt={placeholder.description}
                    fill
                    className="object-cover"
                    data-ai-hint={placeholder.imageHint}
                 />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">[Video Player Placeholder]</p>
                 </div>
              </div>
            )}
            <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Instructions</h3>
                <p className="text-muted-foreground">{module.instructions}</p>
            </div>
            <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                    <Timer className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-bold">{module.duration}</p>
                    </div>
                </div>
                 <Button size="lg">Mark as Complete</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
