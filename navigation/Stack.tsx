import React from "react";
import Detail from "../screens/Detail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IMovie, ITv } from "../utils/api";

type RootStackParamList = {
  Detail: IMovie | ITv;
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
