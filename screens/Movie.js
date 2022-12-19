import React from "react";
import styled from "styled-components/native";

const Movie = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title>Movie</Title>
  </Btn>
);

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

export default Movie;
