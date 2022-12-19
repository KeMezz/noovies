import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Movie = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    onPress={() => navigate("Stack", { screen: "Three" })}
  >
    <Text>Movie</Text>
  </TouchableOpacity>
);

export default Movie;
