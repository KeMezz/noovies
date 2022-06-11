import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeImagePath } from "../utils/makeImagePath";
import { BlurView } from "expo-blur";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";

function Movies({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Movies">) {
  const [loading, setLoading] = useState(true);
  const isDark = useColorScheme() === "dark";
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlayingMovies(results);
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
        horizontal
        loop
        showsButtons={false}
        autoplay
        autoplayTimeout={3}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlayingMovies.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ uri: makeImagePath(movie.backdrop_path) }} />
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={50}
              style={StyleSheet.absoluteFill}
            >
              <SwiperMovie>
                <MovieInfo>
                  <Title numberOfLines={1}>{movie.original_title}</Title>
                  {movie.overview ? (
                    <Overview numberOfLines={4}>{movie.overview}</Overview>
                  ) : null}
                  {movie.vote_count > 0 ? (
                    <Votes>⭐️ {movie.vote_average} / 10</Votes>
                  ) : null}
                </MovieInfo>
                <Poster source={{ uri: makeImagePath(movie.poster_path) }} />
              </SwiperMovie>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
const View = styled.View`
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
const Votes = styled(Overview)`
  opacity: 1;
  font-size: 12px;
`;
const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 4px;
`;

export default Movies;
