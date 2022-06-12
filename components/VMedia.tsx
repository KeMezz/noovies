import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { iMedia } from "../utils/api";
import Poster from "./Poster";
import Votes from "./Votes";

interface VMedia {
  posterPath: string;
  title: string;
  voteCount: number;
  voteAverage: number;
  fullData: iMedia;
}

function VMedia({
  posterPath,
  title,
  voteCount,
  voteAverage,
  fullData,
}: VMedia) {
  const { navigate } = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  return (
    <Container onPress={goToDetail}>
      <Poster posterPath={posterPath} />
      <Title numberOfLines={1}>{title}</Title>
      <Votes voteCount={voteCount} voteAverage={voteAverage} marginTop="3px" />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  align-items: center;
  width: 100px;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 8px;
  font-weight: bold;
`;

export default VMedia;
