'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight } from 'lucide-react';

const detailsSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  age: z.coerce.number().min(12, 'You must be at least 12 years old.').max(100),
  district: z.string().min(2, 'District is required.'),
  state: z.string().min(2, 'State is required.'),
  mobileNumber: z.string().min(10, 'A valid mobile number is required.'),
  education: z.string().min(2, 'Education level is required.'),
  occupation: z.string().min(2, 'Occupation is required.'),
  area: z.enum(['Urban', 'Rural']),
  maritalStatus: z.enum(['Married', 'Unmarried']),
  reproductiveStatus: z.enum(['Menstruating', 'Irregular', 'Menopause']),
});

export default function DetailsPage() {
  const { isAuthenticated, user, updateUserDetails, updateDemographics } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const form = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      ...user.details,
      ...user.demographics,
    },
  });

  function onSubmit(values: z.infer<typeof detailsSchema>) {
    const { fullName, age, district, state, mobileNumber, education, occupation, ...demographics } = values;
    const userDetails = { fullName, age, district, state, mobileNumber, education, occupation };
    
    updateUserDetails(userDetails);
    updateDemographics(demographics);
    router.push('/problem');
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Tell Us About Yourself</CardTitle>
          <CardDescription>This information helps us personalize your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" placeholder="e.g., 35" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="district" render={({ field }) => (
                    <FormItem><FormLabel>District</FormLabel><FormControl><Input placeholder="e.g., Mumbai" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="e.g., Maharashtra" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                    <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input placeholder="e.g., 9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="education" render={({ field }) => (
                    <FormItem><FormLabel>Education</FormLabel><FormControl><Input placeholder="e.g., Graduate" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="occupation" render={({ field }) => (
                    <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input placeholder="e.g., Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Demographics</h3>
                  <FormField control={form.control} name="area" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>Area</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Urban" /></FormControl><FormLabel className="font-normal">Urban</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Rural" /></FormControl><FormLabel className="font-normal">Rural</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>Marital Status</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Married" /></FormControl><FormLabel className="font-normal">Married</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Unmarried" /></FormControl><FormLabel className="font-normal">Unmarried</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="reproductiveStatus" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>Reproductive Status</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Menstruating" /></FormControl><FormLabel className="font-normal">Menstruating</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Irregular" /></FormControl><FormLabel className="font-normal">Irregular</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Menopause" /></FormControl><FormLabel className="font-normal">Menopause</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
