import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const ScreenOne: React.FC<NativeStackScreenProps<any, "One">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>Screen One!</Text>
  </TouchableOpacity>
);
const ScreenTwo: React.FC<NativeStackScreenProps<any, "Two">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Screen Two!</Text>
  </TouchableOpacity>
);
const ScreenThree: React.FC<NativeStackScreenProps<any, "Three">> = ({
  navigation: { goBack },
}) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Text>Go Back</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
};

export default Stack;
