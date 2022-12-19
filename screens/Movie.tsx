import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeImgPath } from "../utils/makeImgPath";
import { BlurView } from "expo-blur";

const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";
const BASE_URL = "https://api.themoviedb.org/3";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            />
            <BlurView
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
              intensity={100}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  {movie.vote_average ? (
                    <Votes>⭐️ {movie.vote_average}</Votes>
                  ) : null}
                  {movie.overview ? (
                    <Overview>
                      {movie.overview.length > 100
                        ? movie.overview.slice(0, 100) + " ..."
                        : movie.overview}
                    </Overview>
                  ) : null}
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Container = styled.ScrollView``;
const View = styled.View`
  flex: 1;
`;
const BgImg = styled.Image``;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  padding: 24px;
`;
const Column = styled.View`
  margin-left: 20px;
  width: 60%;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;
const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 6px;
`;
const Overview = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.textColor};
  margin-top: 8px;
  opacity: 0.6;
`;
const Votes = styled(Overview)`
  opacity: 0.8;
`;

export default Movie;
