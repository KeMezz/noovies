import React from "react";
import Movie from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{ tabBarShowLabel: false, unmountOnBlur: true }}
    >
      <Tab.Screen
        name="Movies"
        component={Movie}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="movie" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="tv" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
