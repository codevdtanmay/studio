'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { UserData, UserDetails, Demographics, UserProblem, UserStage } from '@/lib/types';

interface AppContextType {
  isAuthenticated: boolean;
  user: UserData;
  login: () => void;
  logout: () => void;
  updateUserDetails: (details: Partial<UserDetails>) => void;
  updateDemographics: (demographics: Partial<Demographics>) => void;
  updateProblem: (problem: Partial<UserProblem>) => void;
  updateStage: (stage: UserStage) => void;
  completeOnboarding: () => void;
}

const defaultUser: UserData = {
  details: {
    fullName: '',
    age: '',
    district: '',
    state: '',
    mobileNumber: '',
    education: '',
    occupation: '',
  },
  demographics: {
    area: '',
    maritalStatus: '',
    reproductiveStatus: '',
  },
  problem: {
    problemType: '',
    symptoms: [],
  },
  stage: '',
  onboardingComplete: false,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData>(defaultUser);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setUser(defaultUser);
  };

  const updateUserDetails = (details: Partial<UserDetails>) => {
    setUser(prev => ({ ...prev, details: { ...prev.details, ...details } }));
  };

  const updateDemographics = (demographics: Partial<Demographics>) => {
    setUser(prev => ({ ...prev, demographics: { ...prev.demographics, ...demographics } }));
  };
  
  const updateProblem = (problem: Partial<UserProblem>) => {
    setUser(prev => ({ ...prev, problem: { ...prev.problem, ...problem } }));
  };

  const updateStage = (stage: UserStage) => {
    setUser(prev => ({...prev, stage}));
  }

  const completeOnboarding = () => {
    setUser(prev => ({ ...prev, onboardingComplete: true }));
  };

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    login,
    logout,
    updateUserDetails,
    updateDemographics,
    updateProblem,
    updateStage,
    completeOnboarding
  }), [isAuthenticated, user]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
