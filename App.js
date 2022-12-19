import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import Tabs from "./navigation/Tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isDark = useColorScheme() === "dark";
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(MaterialIcons.font);
      } catch {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  });

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer
      onReady={onLayoutRootView}
      theme={isDark ? DarkTheme : DefaultTheme}
    >
      <Root />
    </NavigationContainer>
  );
}
