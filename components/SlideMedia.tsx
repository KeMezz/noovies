import React from "react";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { StyleSheet, useColorScheme } from "react-native";
import { makeImagePath } from "../utils/makeImagePath";
import Poster from "./Poster";
import Votes from "./Votes";

interface SlideMediaProps {
  backdropPath: string;
  originalTitle: string;
  overview: string;
  voteCount: number;
  voteAverage: number;
  posterPath: string;
}

function SlideMedia({
  backdropPath,
  originalTitle,
  overview,
  voteCount,
  voteAverage,
  posterPath,
}: SlideMediaProps) {
  const isDark = useColorScheme() === "dark";
  return (
    <Container>
      <BgImg source={{ uri: makeImagePath(backdropPath) }} />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={50}
        style={StyleSheet.absoluteFill}
      >
        <SwiperMovie>
          <MovieInfo>
            <Title numberOfLines={1}>{originalTitle}</Title>
            {overview ? (
              <Overview numberOfLines={4}>{overview}</Overview>
            ) : null}
            <Votes
              voteCount={voteCount}
              voteAverage={voteAverage}
              marginTop="8px"
            />
          </MovieInfo>
          <Poster posterPath={posterPath} />
        </SwiperMovie>
      </BlurView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const SwiperMovie = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;
const MovieInfo = styled.View`
  width: 60%;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.7;
  margin-top: 8px;
`;

export default SlideMedia;