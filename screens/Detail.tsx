import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { fetchMovies, fetchTvs, IMovie, ITv } from "../utils/api";
import { makeImgPath } from "../utils/makeImgPath";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import FullscreenLoader from "../components/FullscreenLoader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type RootStackParamList = {
  Detail: IMovie | ITv;
};

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<Props> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === "dark";
  const isMovie = "original_title" in params;
  const title = isMovie ? params.original_title : params.original_name;

  const { isInitialLoading, data } = useQuery(
    [isMovie ? "movieDetail" : "tvDetail"],
    () => (isMovie ? fetchMovies.detail(params.id) : fetchTvs.detail(params.id))
  );

  const openYtLink = async (videoId: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoId}`;
    await WebBrowser.openBrowserAsync(baseUrl);
  };

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
      {isInitialLoading ? <FullscreenLoader /> : null}
      <Details>
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYtLink(video.key)}>
            <MaterialCommunityIcons name="youtube" size={20} color="crimson" />
            <BtnText numberOfLines={1}>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Details>
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
const Details = styled.View`
  padding: 0 24px;
  margin-top: 20px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const BtnText = styled.Text`
  line-height: 24px;
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  padding-left: 8px;
`;

export default Detail;
