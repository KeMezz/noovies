import React from "react";
import styled from "styled-components/native";

function Movies({ navigation: { navigate } }) {
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
`;

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
`;

export default Movies;
