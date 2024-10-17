import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';

import { AppState } from 'react-native';
import { useColorScheme } from 'nativewind';
import { toast, Toaster } from 'sonner-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const appState = useRef(AppState.currentState);
  const [, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setAppStateVisible(nextAppState);
      if (nextAppState === 'active') {
        if (appState.current.match(/inactive|background/)) {
          toast('Velkommen tilbage');
        }
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
      <Toaster />
      <OnToaster />
    </GestureHandlerRootView>
  );
}

function OnToaster() {
  useEffect(() => {
    toast('Velkommen');
  }, []);

  return null;
}
