import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface VMediaProps {
  posterPath: string | null;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  return (
    <Container>
      <Poster path={posterPath} />
      <Title numberOfLines={1}>{originalTitle}</Title>
      <Votes voteAverage={voteAverage} />
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  max-width: 100px;
  margin-top: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

export default VMedia;
