'use client';

import React,
{
  useEffect
}
from 'react';
import {
  useRouter
}
from 'next/navigation';
import {
  useAppContext
}
from '@/contexts/AppContext';
import BottomNav from '@/components/BottomNav';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
}
from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
}
from 'recharts';
import {
  HeartPulse,
  ClipboardList,
  Target,
  FileText
}
from 'lucide-react';

const chartData = [{
  month: 'Jan',
  qol: 65
}, {
  month: 'Feb',
  qol: 70
}, {
  month: 'Mar',
  qol: 72
}, {
  month: 'Apr',
  qol: 78
}, {
  month: 'May',
  qol: 81
}, {
  month: 'Jun',
  qol: 85
}, ];

export default function DashboardPage() {
  const {
    isAuthenticated,
    user
  } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    } else if (!user.onboardingComplete) {
      router.push('/details');
    }
  }, [isAuthenticated, user.onboardingComplete, router]);

  return ( <
    div className = "bg-background min-h-screen pb-20" >
    <
    div className = "container mx-auto px-4 py-8" >
    <
    div className = "mb-8" >
    <
    h1 className = "text-4xl font-headline font-bold" > Welcome, {
      user.details.fullName || 'User'
    }! < /h1> <
    p className = "text-muted-foreground mt-2" > Here is an overview of your wellness journey. < /p> <
    /div>

    <
    div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
    <
    Card >
    <
    CardHeader className = "flex flex-row items-center justify-between space-y-0 pb-2" >
    <
    CardTitle className = "text-sm font-medium" > Selected Stage < /CardTitle> <
    HeartPulse className = "h-4 w-4 text-muted-foreground" / >
    <
    /CardHeader> <
    CardContent >
    <
    div className = "text-2xl font-bold" > {
      user.stage || 'Not Set'
    } < /div> <
    /CardContent> <
    /Card> <
    Card >
    <
    CardHeader className = "flex flex-row items-center justify-between space-y-0 pb-2" >
    <
    CardTitle className = "text-sm font-medium" > Problem Type < /CardTitle> <
    ClipboardList className = "h-4 w-4 text-muted-foreground" / >
    <
    /CardHeader> <
    CardContent >
    <
    div className = "text-2xl font-bold" > {
      user.problem.problemType || 'Not Set'
    } < /div> <
    /CardContent> <
    /Card> <
    Card >
    <
    CardHeader className = "flex flex-row items-center justify-between space-y-0 pb-2" >
    <
    CardTitle className = "text-sm font-medium" > QOL Score < /CardTitle> <
    Target className = "h-4 w-4 text-muted-foreground" / >
    <
    /CardHeader> <
    CardContent >
    <
    div className = "text-2xl font-bold" > 85 < /div> <
    p className = "text-xs text-muted-foreground" > +20.1 % from last month < /p> <
    /CardContent> <
    /Card> <
    Card >
    <
    CardHeader className = "flex flex-row items-center justify-between space-y-0 pb-2" >
    <
    CardTitle className = "text-sm font-medium" > Body Composition < /CardTitle> <
    FileText className = "h-4 w-4 text-muted-foreground" / >
    <
    /CardHeader> <
    CardContent >
    <
    div className = "text-2xl font-bold" > Healthy < /div> <
    p className = "text-xs text-muted-foreground" > As of last report < /p> <
    /CardContent> <
    /Card> <
    /div>

    <
    div className = "mt-8" >
    <
    Card className = "col-span-1 lg:col-span-2" >
    <
    CardHeader >
    <
    CardTitle > Progress Chart < /CardTitle> <
    CardDescription > Your Quality of Life (QOL) score over the last 6 months. < /CardDescription> <
    /CardHeader> <
    CardContent className = "pl-2" >
    <
    ResponsiveContainer width = "100%"
    height = {
      350
    } >
    <
    BarChart data = {
      chartData
    } >
    <
    CartesianGrid strokeDasharray = "3 3" / >
    <
    XAxis dataKey = "month"
    stroke = "#888888"
    fontSize = {
      12
    }
    tickLine = {
      false
    }
    axisLine = {
      false
    }
    /> <
    YAxis stroke = "#888888"
    fontSize = {
      12
    }
    tickLine = {
      false
    }
    axisLine = {
      false
    }
    tickFormatter = {
      (value) => `${value}`
    }
    /> <
    Tooltip wrapperClassName = "rounded-md border bg-background px-2 py-1 text-sm shadow-lg" / >
    <
    Bar dataKey = "qol"
    fill = "hsl(var(--primary))"
    radius = {
      [4, 4, 0, 0]
    }
    /> <
    /BarChart> <
    /ResponsiveContainer> <
    /CardContent> <
    /Card> <
    /div> <
    /div>

    <
    BottomNav / >
    <
    /div>
  );
}