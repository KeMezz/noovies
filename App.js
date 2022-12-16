import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
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
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <Text>I AM READY!!!</Text>
      <MaterialIcons name="check" size={30} />
    </View>
  );
}
