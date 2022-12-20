import React from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import VSeparator from "../components/VSeparator";
import HSeparator from "../components/HSeparator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovies, IMovie, MovieResults } from "../utils/api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResults>(["nowPlaying", "movies"], fetchMovies.nowPlaying);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResults>(["trending", "movies"], fetchMovies.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResults>(["upcoming", "movies"], fetchMovies.upcoming);

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const isRefetching =
    isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;
  const onRefresh = () => {
    queryClient.refetchQueries(["movies"]);
  };

  const renderVMedia = ({ item }: { item: IMovie }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }: { item: IMovie }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      ListHeaderComponent={
        <>
          <Swiper
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie?.backdrop_path}
                posterPath={movie?.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          <FlatList
            data={trendingData?.results}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <VSeparator width={18} />}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            renderItem={renderVMedia}
          />
          <ListTitle>Coming Soon</ListTitle>
        </>
      }
      data={upcomingData?.results}
      ItemSeparatorComponent={() => <HSeparator height={18} />}
      contentContainerStyle={{ marginBottom: 24 }}
      renderItem={renderHMedia}
      refreshing={isRefetching}
      onRefresh={onRefresh}
    />
  );
};

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text`
  padding: 24px;
  padding-bottom: 14px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

export default Movie;
