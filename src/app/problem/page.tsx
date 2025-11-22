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
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { problemTypes, symptoms as symptomsList } from '@/lib/data';
import { ArrowRight, Mic } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const problemSchema = z.object({
  problemType: z.string().optional(),
  symptoms: z.array(z.string()).optional(),
  otherDescription: z.string().optional(),
}).superRefine((data, ctx) => {
  const problemSelected = data.problemType && data.symptoms && data.symptoms.length > 0;
  const otherDescribed = data.otherDescription && data.otherDescription.trim().length > 2;

  if (problemSelected && otherDescribed) {
    // Both are filled, which is fine, but we can prioritize one.
    // Or we could clear one. Let's allow both for now, but not require both.
  } else if (!problemSelected && !otherDescribed) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please either select a problem and symptoms, or describe your problem in detail.',
      path: ['problemType'], 
    });
  } else if (!problemSelected && otherDescribed) {
      // Clear any validation errors on the main selection if other is being used
  } else if (problemSelected && !otherDescribed) {
    if (!data.problemType) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please select a problem type.',
            path: ['problemType'],
        });
    }
    if (!data.symptoms || data.symptoms.length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'You have to select at least one symptom.',
            path: ['symptoms'],
        });
    }
  }
});


export default function ProblemPage() {
  const { user, updateProblem } = useAppContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof problemSchema>>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      problemType: user.problem.problemType || '',
      symptoms: user.problem.symptoms || [],
      otherDescription: user.problem.otherDescription || '',
    },
    mode: 'onChange',
  });
  
  const problemType = form.watch('problemType');
  const otherDescription = form.watch('otherDescription');

  function onSubmit(values: z.infer<typeof problemSchema>) {
    updateProblem(values);
    router.push('/stage');
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Problem & Symptoms</CardTitle>
          <CardDescription>Select the primary problem and any symptoms you are experiencing, OR describe your problem below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className={cn("space-y-8 p-4 rounded-md border", otherDescription && otherDescription.length > 0 ? 'opacity-50' : 'opacity-100')}>
                 <FormField
                    control={form.control}
                    name="problemType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Problem Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!otherDescription && otherDescription.length > 0}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a problem type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {problemTypes.map(problem => (
                              <SelectItem key={problem} value={problem}>{problem}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={() => (
                      <FormItem>
                        <FormLabel>Symptoms</FormLabel>
                        <div className="space-y-2">
                          {symptomsList.map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="symptoms"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          const isEnabled = !otherDescription || otherDescription.length === 0;
                                          if (isEnabled) {
                                              return checked
                                              ? field.onChange([...(field.value || []), item])
                                              : field.onChange((field.value || []).filter((value) => value !== item));
                                          }
                                        }}
                                        disabled={!!otherDescription && otherDescription.length > 0}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item}</FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              <div className="relative flex items-center justify-center">
                <Separator className="w-full" />
                <span className="absolute bg-background px-4 text-sm text-muted-foreground">OR</span>
              </div>
                
              <div className={cn("space-y-6 p-4 rounded-md border", problemType && problemType.length > 0 ? 'opacity-50' : 'opacity-100')}>
                  <h3 className="text-lg font-semibold text-foreground">Other</h3>
                  <FormField
                      control={form.control}
                      name="otherDescription"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Describe your problem</FormLabel>
                              <FormControl>
                                  <Textarea
                                      placeholder="If your problem isn't listed, please describe it here..."
                                      className="resize-none"
                                      {...field}
                                      disabled={!!problemType && problemType.length > 0}
                                  />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <div className="space-y-2">
                      <FormLabel>Send a voice message</FormLabel>
                      <Button variant="outline" className="w-full" disabled={!!problemType && problemType.length > 0}>
                          <Mic className="mr-2 h-4 w-4" />
                          Start Recording
                      </Button>
                      <p className="text-xs text-muted-foreground">Click the button to record a voice message describing your symptoms.</p>
                  </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg">
                  Submit Problem <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
