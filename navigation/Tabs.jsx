import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import TV from "../screens/TV";
import {
  BLACK_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
  LIGHT_GREY,
  DARK_GREY,
} from "../styles/colors";

const Tab = createBottomTabNavigator();

function Tabs() {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
      }}
      screenOptions={{
        tabBarLabelStyle: { marginTop: -5 },
        tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR },
        tabBarActiveTintColor: YELLOW_COLOR,
        tabBarInactiveTintColor: isDark ? LIGHT_GREY : DARK_GREY,
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR },
        headerTitleStyle: { color: isDark ? WHITE_COLOR : BLACK_COLOR },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="film" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={TV}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="tv-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="search" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
