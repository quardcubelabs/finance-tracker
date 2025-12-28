// template
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContext, useAuth } from "@/contexts/AuthContext";
import { PreferencesContext } from "@/contexts/PreferencesContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Faster initialization to let splash handle its own navigation
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 100); // Reduced from 1500ms
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Don't redirect from layout, let splash handle initial navigation
  // Keep this effect but make it less aggressive
  useEffect(() => {
    if (isInitializing || isLoading) {
      return;
    }

    // Only handle navigation if we're not on splash
    if (segments[0] === 'splash') {
      return;
    }

    const inAuthGroup = segments[0] === 'login';

    console.log('Layout auth check:', { isAuthenticated, inAuthGroup, segments });

    if (!isAuthenticated && !inAuthGroup) {
      console.log('Layout redirecting to login');
      router.replace('/login');
    } else if (isAuthenticated && inAuthGroup) {
      console.log('Layout redirecting to home');
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isInitializing, isLoading, router]);

  // Show splash initially, then let it handle navigation
  if (isInitializing) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="transfer" options={{ headerShown: false }} />
      <Stack.Screen name="assistant" options={{ headerShown: false }} />
      <Stack.Screen name="pay-bills" options={{ headerShown: false }} />
      <Stack.Screen name="balance" options={{ headerShown: false }} />
      <Stack.Screen name="invest" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <PreferencesContext>
          <GestureHandlerRootView>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </PreferencesContext>
      </AuthContext>
    </QueryClientProvider>
  );
}
