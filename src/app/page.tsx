'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  identifier: z.string().min(10, 'Please enter a valid number.'),
  otp: z.string().optional(),
});

export default function LoginPage() {
  const { isAuthenticated, login } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      otp: '',
    },
  });

  function handleSendOtp() {
    const identifier = form.getValues('identifier');
    if (identifier.length >= 10) {
      setIsOtpSent(true);
      toast({
        title: 'OTP Sent',
        description: 'An OTP has been sent to your number.',
      });
    } else {
      form.setError('identifier', { message: 'Please enter a valid number.' });
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isOtpSent) {
      handleSendOtp();
      return;
    }
    
    if (!values.otp || values.otp.length < 4) {
      form.setError('otp', { message: 'Please enter a valid OTP.' });
      return;
    }
    
    setIsLoggingIn(true);
    setTimeout(() => {
      login();
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      router.push('/details');
      setIsLoggingIn(false);
    }, 1000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Welcome to NARI</CardTitle>
            <CardDescription>Natural approach to reproduction Integration</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar / Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your 10-digit mobile or 12-digit Aadhaar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isOtpSent && (
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter OTP</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the 4-digit OTP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <CardFooter className="p-0 pt-4">
                  {!isOtpSent ? (
                    <Button type="button" onClick={handleSendOtp} className="w-full">
                      Send OTP
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full" disabled={isLoggingIn}>
                      {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Login
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
