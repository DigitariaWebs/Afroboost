import React from 'react';
import { Tabs } from 'expo-router';

// Visual nav is rendered globally via NavBarFab in app/_layout.tsx.
// We hide the native tab bar.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
        animation: 'shift',
      }}
    />
  );
}
