import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { iMedia, moviesApi, tvApi } from "../utils/api";
import { makeImagePath } from "../utils/makeImagePath";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR, WHITE_COLOR } from "../styles/colors";
import { useQuery } from "react-query";

type RootStackParamList = {
  Detail: iMedia;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function Detail({
  navigation: { setOptions },
  route: { params },
}: NativeStackScreenProps<RootStackParamList, "Detail">) {
  const isDark = useColorScheme() === "dark";

  const { isLoading: moviesLoading, data: moviesData } = useQuery(
    ["movies", params.id + ""],
    moviesApi.detail,
    { enabled: "title" in params }
  );
  const { isLoading: tvLoading, data: tvData } = useQuery(
    ["tv", params.id + ""],
    tvApi.detail,
    { enabled: "name" in params }
  );

  useEffect(
    () => setOptions({ title: "title" in params ? "Movie" : "TV Show" }),
    []
  );

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImagePath(params.backdrop_path || "", "w500") }}
        />
        <LinearGradient
          colors={["transparent", isDark ? BLACK_COLOR : WHITE_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster posterPath={params.poster_path || ""} />
          <Title>
            {"title" in params ? params.original_title : params.original_name}
          </Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
}

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 24px;
`;
const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  width: 60%;
  align-self: flex-end;
  margin-left: 12px;
  margin-bottom: 12px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  font-size: 24px;
`;
const Overview = styled.Text`
  padding: 24px;
  color: ${(props) => props.theme.textColor};
`;

export default Detail;
