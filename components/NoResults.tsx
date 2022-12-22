import React from "react";
import styled from "styled-components/native";

const NoResults: React.FC = () => {
  return (
    <Container>
      <Text>No Results</Text>
    </Container>
  );
};

const Container = styled.View`
  height: 160px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

export default NoResults;
