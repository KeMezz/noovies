import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import styled from "styled-components/native";

interface DetailProps {
  originalTitle?: string;
  originalName?: string;
}

const Detail: React.FC<NativeStackScreenProps<any, "Detail">> = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle, originalName },
  },
}) => {
  useEffect(() => {
    setOptions({ title: originalTitle ?? originalName });
  }, []);

  return (
    <Container>
      <Text>{originalTitle ?? originalName}</Text>
    </Container>
  );
};

const Container = styled.ScrollView``;
const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

export default Detail;
