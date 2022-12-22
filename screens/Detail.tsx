import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { fetchMovies, fetchTvs, IMovie, ITv } from "../utils/api";
import { makeImgPath } from "../utils/makeImgPath";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type RootStackParamList = {
  Detail: IMovie | ITv;
};

const Detail: React.FC<
  NativeStackScreenProps<RootStackParamList, "Detail">
> = ({ navigation: { setOptions }, route: { params } }) => {
  const isDark = useColorScheme() === "dark";
  const title =
    "original_title" in params ? params.original_title : params.original_name;

  const { isInitialLoading: isTvLoading, data: tvData } = useQuery(
    ["tvDetail"],
    () => fetchTvs.detail(params.id),
    { enabled: "original_name" in params }
  );
  const { isInitialLoading: isMovieLoading, data: movieData } = useQuery(
    ["movieDetail"],
    () => fetchMovies.detail(params.id),
    { enabled: "original_title" in params }
  );

  useEffect(() => {
    setOptions({ title });
  }, []);

  return (
    <Container>
      <Header>
        <Background
          source={{ uri: makeImgPath(params.backdrop_path) }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={["transparent", `${isDark ? "#000" : "#fff"}`]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path} />
          <Title>{title}</Title>
        </Column>
      </Header>
      {params.overview !== "" ? <Overview>{params.overview}</Overview> : null}
    </Container>
  );
};

const Container = styled.ScrollView``;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 24px;
`;
const Column = styled.View`
  flex-direction: row;
`;
const Background = styled.Image``;
const Title = styled.Text`
  width: 70%;
  font-weight: 600;
  font-size: 20px;
  align-self: flex-end;
  margin-left: 14px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textColor};
`;
const Overview = styled.Text`
  color: ${({ theme }) => theme.textColor};
  padding: 0 24px;
  margin-top: 14px;
  line-height: 18px;
`;

export default Detail;
