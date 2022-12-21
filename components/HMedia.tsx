import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface HMeidaProps {
  posterPath: string | null;
  originalTitle?: string;
  originalName?: string;
  releaseDate?: string;
  firstAirDate?: string;
  voteAverage?: number;
  overview: string;
}

const HMedia: React.FC<HMeidaProps> = ({
  posterPath,
  originalTitle,
  originalName,
  releaseDate,
  firstAirDate,
  voteAverage,
  overview,
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
      <HColumn>
        <HTitle>{originalTitle ?? originalName}</HTitle>
        {releaseDate ? (
          <DateText>
            {new Date(releaseDate).toLocaleDateString("ko", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </DateText>
        ) : null}
        {firstAirDate ? (
          <DateText>
            {new Date(firstAirDate).toLocaleDateString("ko", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </DateText>
        ) : null}
        {voteAverage ? <Votes voteAverage={voteAverage} /> : null}
        {overview ? <HOverview numberOfLines={4}>{overview}</HOverview> : null}
      </HColumn>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 0 24px;
`;
const HColumn = styled.View`
  width: 100%;
  margin-left: 12px;
  justify-content: center;
`;
const HTitle = styled.Text`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
`;
const HOverview = styled.Text`
  color: ${({ theme }) => theme.textColor};
  width: 65%;
  margin-top: 8px;
  opacity: 0.8;
  font-size: 12px;
`;
const DateText = styled(HOverview)`
  opacity: 1;
`;

export default HMedia;
