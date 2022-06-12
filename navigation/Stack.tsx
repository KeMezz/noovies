import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, WHITE_COLOR } from "../styles/colors";

const NativeStack = createNativeStackNavigator();

function Stack() {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleStyle: { color: isDark ? WHITE_COLOR : BLACK_COLOR },
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
}

export default Stack;
