import React, { useState } from "react";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import VSeparator from "../components/VSeparator";
import HSeparator from "../components/HSeparator";
import ListTitle from "../components/ListTitle";
import FullscreenLoader from "../components/FullscreenLoader";
import { Dimensions, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovies, IMovie, MovieResults } from "../utils/api";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {
    isInitialLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResults>(["movies", "nowPlaying"], fetchMovies.nowPlaying);
  const {
    isInitialLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResults>(["movies", "trending"], fetchMovies.trending);
  const {
    isInitialLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResults>(["movies", "upcoming"], fetchMovies.upcoming);

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
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

  if (loading) return <FullscreenLoader />;
  else
    return (
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
            <ListTitle title="Trending Movies" />
            <FlatList
              data={trendingData?.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <VSeparator width={18} />}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              renderItem={renderVMedia}
            />
            <ListTitle title="Coming Soon" />
          </>
        }
        data={upcomingData?.results}
        ItemSeparatorComponent={() => <HSeparator height={18} />}
        contentContainerStyle={{ marginBottom: 24 }}
        renderItem={renderHMedia}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
};

export default Movies;
