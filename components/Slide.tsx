import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { IMovie, ITv } from "../utils/api";
import { makeImgPath } from "../utils/makeImgPath";
import Poster from "./Poster";
import Votes from "./Votes";

interface SlideProps {
  backdropPath: string | null;
  posterPath: string | null;
  originalTitle?: string;
  originalName?: string;
  voteAverage: number;
  overview: string;
  fullData: ITv | IMovie;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  originalName,
  voteAverage,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const { navigate } = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };

  return (
    <Container onPress={goToDetail}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        style={StyleSheet.absoluteFill}
        intensity={100}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title>{originalTitle ?? originalName}</Title>
            {voteAverage ? <Votes voteAverage={voteAverage} /> : null}
            {overview ? (
              <Overview numberOfLines={4}>{overview}</Overview>
            ) : null}
          </Column>
        </Wrapper>
      </BlurView>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex: 1;
`;
const BgImg = styled.Image``;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  padding: 30px;
`;
const Column = styled.View`
  margin-left: 20px;
  width: 62%;
`;
const Title = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;
const Overview = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.textColor};
  margin-top: 8px;
  opacity: 0.6;
  line-height: 16px;
`;

export default Slide;
