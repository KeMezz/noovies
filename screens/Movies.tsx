import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";

function Movies({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Movies">) {
  return (
    <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
      <Title>Movies</Title>
    </Btn>
  );
}

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

export default Movies;
