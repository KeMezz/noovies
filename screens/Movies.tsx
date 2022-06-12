import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SlideMedia from "../components/SlideMedia";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";

function Movies({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Movies">) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
    ).json();
    setNowPlayingMovies(results);
  };
  const getUpComing = async () => {
    const { results } = await (
      await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
    ).json();
    setUpcomingMovies(results);
  };
  const getTrending = async () => {
    const { results } = await (
      await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    ).json();
    setTrendingMovies(results);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getMoviesData();
    setRefreshing(false);
  };
  const getMoviesData = async () => {
    await Promise.all([getNowPlaying(), getUpComing(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <UpcomingFlatList
      ListHeaderComponent={
        <>
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
              <SlideMedia
                key={movie.id}
                backdropPath={movie.backdrop_path}
                originalTitle={movie.original_title}
                overview={movie.overview}
                voteCount={movie.vote_count}
                voteAverage={movie.vote_average}
                posterPath={movie.poster_path}
              />
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          <TrendingFlatList
            horizontal
            data={trendingMovies}
            keyExtractor={(item) => item.id + ""}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            ItemSeparatorComponent={() => <HSeparator />}
            renderItem={({ item }) => (
              <VMedia
                posterPath={item.poster_path}
                title={item.title}
                voteCount={item.vote_count}
                voteAverage={item.vote_average}
              />
            )}
          />
          <ListTitle>Comming Soon</ListTitle>
        </>
      }
      renderItem={({ item }) => (
        <>
          <HMedia
            key={item.id}
            posterPath={item.poster_path}
            title={item.title}
            overview={item.overview}
            releaseDate={item.release_date}
          />
        </>
      )}
      data={upcomingMovies}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => <VSeparator />}
      contentContainerStyle={{ marginBottom: 14 }}
    />
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const HSeparator = styled.View`
  width: 12px;
`;
const VSeparator = styled.View`
  height: 12px;
`;
const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: bold;
  margin-left: 24px;
  margin-top: 34px;
  margin-bottom: 14px;
`;
const TrendingFlatList = styled.FlatList``;
const UpcomingFlatList = styled.FlatList``;

export default Movies;
