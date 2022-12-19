import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Votes from "../components/Votes";

const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";
const BASE_URL = "https://api.themoviedb.org/3";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
      )
    ).json();
    setNowPlaying(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`
      )
    ).json();
    setUpcoming(results);
  };
  const getTrending = async () => {
    const { results } = await (
      await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    ).json();
    setTrending(results);
  };
  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  // get movie datas
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        {trending.map((movie) => (
          <VMovie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title numberOfLines={1}>{movie.original_title}</Title>
            <Votes voteAverage={movie.vote_average} />
          </VMovie>
        ))}
      </TrendingScroll>
      <ListTitle>Coming Soon</ListTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <HTitle>{movie.original_title}</HTitle>
            <ReleaseDate>
              {new Date(movie.release_date).toLocaleDateString("ko", {
                year: "2-digit",
                month: "long",
                day: "numeric",
              })}{" "}
              개봉
            </ReleaseDate>
            {movie.overview ? (
              <HOverview numberOfLines={4}>{movie.overview}</HOverview>
            ) : null}
          </HColumn>
        </HMovie>
      ))}
      <UpcomingScroll></UpcomingScroll>
    </Container>
  );
};

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Container = styled.ScrollView``;
const ListTitle = styled.Text`
  padding: 24px;
  padding-bottom: 14px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;
const TrendingScroll = styled.ScrollView``;
const VMovie = styled.View`
  margin-right: 12px;
  align-items: center;
`;
const Title = styled.Text`
  max-width: 100px;
  color: ${({ theme }) => theme.textColor};
  margin-top: 8px;
`;

const UpcomingScroll = styled.ScrollView``;
const HMovie = styled.View`
  flex-direction: row;
  padding: 0 24px;
`;
const HColumn = styled.View`
  width: 100%;
  margin-left: 12px;
  justify-content: center;
`;
const HTitle = styled.Text`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
`;
const HOverview = styled.Text`
  color: ${({ theme }) => theme.textColor};
  width: 65%;
  margin-top: 8px;
  opacity: 0.8;
  font-size: 12px;
`;
const ReleaseDate = styled(HOverview)`
  opacity: 1;
`;

export default Movie;
