'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserStage } from '@/lib/types';

const stages = [
  {
    title: 'Reproductive Stage',
    age: '~13-35',
    value: 'Reproductive' as UserStage,
  },
  {
    title: 'Perimenopausal Stage',
    age: '~36-55',
    value: 'Perimenopausal' as UserStage,
  },
  {
    title: 'Postmenopausal Stage',
    age: '~56-65',
    value: 'Postmenopausal' as UserStage,
  },
];

export default function StagePage() {
  const { isAuthenticated, updateStage, completeOnboarding } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleStageSelect = (stage: UserStage) => {
    updateStage(stage);
    completeOnboarding();
    router.push('/yoga');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Select Your Current Stage</h1>
        <p className="text-muted-foreground mt-2">This helps us tailor the yoga modules specifically for you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {stages.map((stage, index) => (
          <div
            key={stage.value}
          >
            <Card
              onClick={() => handleStageSelect(stage.value)}
              className="h-full flex flex-col justify-center items-center text-center p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary hover:-translate-y-2"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-headline">{stage.title}</CardTitle>
                <CardDescription className="text-lg mt-2">({stage.age})</CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
