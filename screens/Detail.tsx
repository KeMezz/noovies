import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, useColorScheme, Linking } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { iMedia, moviesApi, tvApi } from "../utils/api";
import { makeImagePath } from "../utils/makeImagePath";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR, WHITE_COLOR } from "../styles/colors";
import { useQuery } from "react-query";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../components/Loader";

type RootStackParamList = {
  Detail: iMedia;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function Detail({
  navigation: { setOptions },
  route: { params },
}: NativeStackScreenProps<RootStackParamList, "Detail">) {
  const isDark = useColorScheme() === "dark";
  const isMovie = "title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id + ""],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const openYouTubeLink = async (videoId: string) => {
    const baseURL = `http://m.youtube.com/watch?v=${videoId}`;
    await Linking.openURL(baseURL);
  };

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
      {isLoading ? <Loader /> : null}
      <VideoInfo>
        {data?.videos.results.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYouTubeLink(video.key)}>
            <Ionicons
              name="logo-youtube"
              size={16}
              style={{ marginTop: 12 }}
              color="crimson"
            />
            <VideoTitle>{video.name}</VideoTitle>
          </VideoBtn>
        ))}
      </VideoInfo>
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
const VideoInfo = styled.View`
  padding: 0 24px;
  margin-bottom: 24px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const VideoTitle = styled.Text`
  margin-top: 12px;
  color: #0984e3;
  margin-left: 6px;
  font-size: 16px;
`;

export default Detail;
