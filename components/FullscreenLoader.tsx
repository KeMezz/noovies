import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const FullscreenLoader = () => (
  <Loader>
    <ActivityIndicator />
  </Loader>
);

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default FullscreenLoader;
