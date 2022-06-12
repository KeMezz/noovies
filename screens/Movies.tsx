import React from "react";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesApi } from "../utils/api";
import Loader from "../components/Loader";
import SlideMedia from "../components/SlideMedia";
import HFlatList, { ListTitle } from "../components/HFlatList";
import HMedia from "../components/HMedia";
import VSeparator from "../components/VSeparator";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function Movies({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Movies">) {
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: nowPlayingRefetching,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: upcomingRefetching,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);

  const queryClient = useQueryClient();
  const onRefresh = () => queryClient.refetchQueries(["movies"]);

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const refreshing =
    nowPlayingRefetching || trendingRefetching || upcomingRefetching;

  if (loading) {
    return <Loader />;
  }
  return upcomingData ? (
    <FlatList
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
          <HFlatList title="Trending Now" data={trendingData} />
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

export default Movies;
