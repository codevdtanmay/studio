'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';
import BottomNav from '@/components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const { isAuthenticated, user, logout } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-headline font-bold">Your Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your personal information and settings.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
             <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>Your personal and contact information.</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                        <p>{user.details.fullName || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Age</p>
                        <p>{user.details.age || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                        <p>{user.details.mobileNumber || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p>{user.details.district && user.details.state ? `${user.details.district}, ${user.details.state}`: 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Education</p>
                        <p>{user.details.education || 'N/A'}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Occupation</p>
                        <p>{user.details.occupation || 'N/A'}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                     <div>
                        <CardTitle>Health Profile</CardTitle>
                        <CardDescription>Your selected health concerns and stage.</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Problem Type</p>
                        <p>{user.problem.problemType || 'N/A'}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Symptoms</p>
                        <div className="flex flex-wrap gap-2">
                          {user.problem.symptoms.length > 0 ? user.problem.symptoms.map(symptom => (
                            <Badge key={symptom} variant="secondary">{symptom}</Badge>
                          )) : <p>N/A</p>}
                        </div>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Life Stage</p>
                        <p>{user.stage || 'N/A'}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
