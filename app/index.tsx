import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { useOnboardingStore } from '@/stores/onboardingStore';

export default function Index() {
  const isAuth = useAuthStore((s) => s.isAuthenticated);
  const onboarded = useOnboardingStore((s) => s.isComplete);

  if (!isAuth) return <Redirect href="/(auth)/welcome" />;
  if (!onboarded) return <Redirect href="/(onboarding)/welcome-video" />;
  return <Redirect href="/(tabs)" />;
}
