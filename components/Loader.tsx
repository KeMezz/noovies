import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

function Loader() {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Loader;
