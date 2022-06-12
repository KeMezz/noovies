import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

function Detail({
  navigation: { setOptions },
  route: {
    params: { title },
  },
}) {
  useLayoutEffect(() => setOptions({ title }), []);
  return <Container></Container>;
}

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;

export default Detail;
