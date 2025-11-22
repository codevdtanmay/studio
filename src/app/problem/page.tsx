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
import { ArrowRight } from 'lucide-react';

const problemSchema = z.object({
  problemType: z.string().min(1, 'Please select a problem type.'),
  symptoms: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one symptom.',
  }),
});

export default function ProblemPage() {
  const { isAuthenticated, user, updateProblem } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const form = useForm<z.infer<typeof problemSchema>>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      problemType: user.problem.problemType || '',
      symptoms: user.problem.symptoms || [],
    },
  });

  function onSubmit(values: z.infer<typeof problemSchema>) {
    updateProblem(values as any);
    router.push('/stage');
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Problem & Symptoms</CardTitle>
          <CardDescription>Select the primary problem and any symptoms you are experiencing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <FormField
                  control={form.control}
                  name="problemType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                        return checked
                                          ? field.onChange([...field.value, item])
                                          : field.onChange(field.value?.filter((value) => value !== item));
                                      }}
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
