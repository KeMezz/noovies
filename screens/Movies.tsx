import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesAPI } from "../utils/api";
import SlideMedia from "../components/SlideMedia";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function Movies({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Movies">) {
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: nowPlayingRefetching,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesAPI.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: upcomingRefetching,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesAPI.upcoming);

  const queryClient = useQueryClient();
  const onRefresh = () => queryClient.refetchQueries(["movies"]);

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const refreshing =
    nowPlayingRefetching || trendingRefetching || upcomingRefetching;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : upcomingData ? (
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
            {nowPlayingData?.results.map((movie) => (
              <SlideMedia
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                originalTitle={movie.original_title}
                overview={movie.overview}
                voteCount={movie.vote_count}
                voteAverage={movie.vote_average}
                posterPath={movie.poster_path || ""}
              />
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          {trendingData ? (
            <TrendingFlatList
              horizontal
              data={trendingData.results}
              keyExtractor={(item) => item.id + ""}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={HSeparator}
              renderItem={({ item }) => (
                <VMedia
                  posterPath={item.poster_path || ""}
                  title={item.title}
                  voteCount={item.vote_count}
                  voteAverage={item.vote_average}
                />
              )}
              contentContainerStyle={{ paddingHorizontal: 18 }}
            />
          ) : null}
          <ListTitle>Comming Soon</ListTitle>
        </>
      }
      renderItem={({ item }) => (
        <HMedia
          title={item.title}
          posterPath={item.poster_path || ""}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
      data={upcomingData.results}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={VSeparator}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  ) : null;
}

const TrendingFlatList = styled.FlatList`` as unknown as typeof FlatList;
const UpcomingFlatList = styled.FlatList`` as unknown as typeof FlatList;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const HSeparator = styled.View`
  flex: 1;
  width: 12px;
`;
const VSeparator = styled.View`
  flex: 1;
  height: 12px;
`;
const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: bold;
  margin-left: 18px;
  margin-top: 34px;
  margin-bottom: 14px;
`;

export default Movies;
