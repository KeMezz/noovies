import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Votes from "../components/Votes";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";

function Movies({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Movies">) {
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlayingMovies(results);
  };
  const getUpComing = async () => {
    const { results } = await (
      await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcomingMovies(results);
  };
  const getTrending = async () => {
    const { results } = await (
      await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    ).json();
    setTrendingMovies(results);
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
          <Slide
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
      <TrendingView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
      >
        {trendingMovies.map((movie) => (
          <Movie key={movie.id}>
            <Poster posterPath={movie.poster_path} />
            <MovieTitle numberOfLines={1}>{movie.title}</MovieTitle>
            <Votes
              voteCount={movie.vote_count}
              voteAverage={movie.vote_average}
              marginTop="3px"
            />
          </Movie>
        ))}
      </TrendingView>
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
const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: bold;
  margin-left: 24px;
  margin-top: 30px;
  margin-bottom: 14px;
`;
const TrendingView = styled.ScrollView``;
const Movie = styled.View`
  margin-right: 12px;
  align-items: center;
  width: 100px;
`;
const MovieTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 5px;
`;

export default Movies;
