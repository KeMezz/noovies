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
      <TrendingScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
      >
        {trendingMovies.map((movie) => (
          <TrendingCard key={movie.id}>
            <Poster posterPath={movie.poster_path} />
            <TrendingTitle numberOfLines={1}>{movie.title}</TrendingTitle>
            <Votes
              voteCount={movie.vote_count}
              voteAverage={movie.vote_average}
              marginTop="3px"
            />
          </TrendingCard>
        ))}
      </TrendingScrollView>

      <ListTitle>Comming Soon</ListTitle>
      {upcomingMovies.map((movie) => (
        <UpcomingMovie key={movie.id}>
          <Poster posterPath={movie.poster_path} />
          <MovieInfo>
            <UpcomingTitle numberOfLines={2}>{movie.title}</UpcomingTitle>
            {movie.overview ? (
              <Overview numberOfLines={4}>{movie.overview}</Overview>
            ) : null}
            <ReleaseDate>
              {new Date(movie.release_date).toLocaleDateString("ko", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </ReleaseDate>
          </MovieInfo>
        </UpcomingMovie>
      ))}
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
  margin-top: 34px;
  margin-bottom: 14px;
`;
const TrendingScrollView = styled.ScrollView``;
const TrendingCard = styled.View`
  margin-right: 12px;
  align-items: center;
  width: 100px;
`;
const TrendingTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 5px;
`;

const UpcomingMovie = styled.View`
  padding: 0 24px;
  flex-direction: row;
  flex: 1;
  margin-bottom: 14px;
`;
const MovieInfo = styled.View`
  padding: 16px;
  flex: 1;
  justify-content: center;
  width: 70%;
`;
const UpcomingTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  margin-top: 4px;
`;
const ReleaseDate = styled(Overview)`
  font-size: 10px;
  opacity: 1;
  margin-top: 6px;
`;

export default Movies;
