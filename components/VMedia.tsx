import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface VMediaProps {
  posterPath: string | null;
  originalTitle?: string;
  originalName?: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  originalName,
  voteAverage,
}) => {
  const { navigate } = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigate("Stack", {
      screen: "Detail",
      params: {
        originalTitle,
        originalName,
      },
    });
  };
  return (
    <Container onPress={goToDetail}>
      <Poster path={posterPath} />
      <Title numberOfLines={1}>{originalTitle ?? originalName}</Title>
      <Votes voteAverage={voteAverage} />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  align-items: center;
`;
const Title = styled.Text`
  max-width: 100px;
  margin-top: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

export default VMedia;
