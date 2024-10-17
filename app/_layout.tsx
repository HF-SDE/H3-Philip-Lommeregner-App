import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';
import { RootSiblingParent } from 'react-native-root-siblings';

import { AppState } from 'react-native';
import Toast from 'react-native-root-toast';
import { useColorScheme } from 'nativewind';

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
          Toast.show('Velkommen tilbage', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
          });
        } else if (appState.current === 'unknown') {
          Toast.show('Velkommen', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
          });
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
    <RootSiblingParent>
      <ThemeProvider value={colorScheme.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </RootSiblingParent>
  );
}
