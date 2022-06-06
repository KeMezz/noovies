import React from "react";
import { TouchableOpacity, Text } from "react-native";

function Movie({ navigation: { navigate } }) {
  return (
    <TouchableOpacity
      onPress={() => navigate("Stack", { screen: "Three" })}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>MOVIE!</Text>
    </TouchableOpacity>
  );
}

export default Movie;
