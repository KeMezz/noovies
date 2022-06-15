import React, { useState } from "react";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { MediaResponse, moviesApi } from "../utils/api";
import Loader from "../components/Loader";
import SlideMedia from "../components/SlideMedia";
import HFlatList, { ListTitle } from "../components/HFlatList";
import HMedia from "../components/HMedia";
import VSeparator from "../components/VSeparator";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function Movies({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Movies">) {
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MediaResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MediaResponse>(["movies", "trending"], moviesApi.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movies", "upcoming"], moviesApi.upcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  console.log(upcomingData);
  const queryClient = useQueryClient();
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    } else return;
  };

  const a = {
    pageParams: [undefined, 2, 3, 4, 5, 6, 7],
    pages: [
      {
        dates: [Object],
        page: 1,
        results: [Array],
        total_pages: 23,
        total_results: 451,
      },
      {
        dates: [Object],
        page: 2,
        results: [Array],
        total_pages: 23,
        total_results: 451,
      },
      {
        dates: [Object],
        page: 3,
        results: [Array],
        total_pages: 23,
        total_results: 451,
      },
      {
        dates: [Object],
        page: 4,
        results: [Array],
        total_pages: 23,
        total_results: 451,
      },
      {
        dates: [Object],
        page: 5,
        results: [Array],
        total_pages: 23,
        total_results: 451,
      },
      {
        dates: [Object],
        page: 6,
        results: [Array],
        total_pages: 23,
        total_results: 451,
      },
      {
        dates: [Object],
        page: 7,
        results: [Array],
        total_pages: 23,
        total_results: 451,
      },
    ],
  };

  const [refreshing, setRefreshing] = useState(false);
  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;

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
                originalTitle={movie.original_title || ""}
                overview={movie.overview}
                voteCount={movie.vote_count}
                voteAverage={movie.vote_average}
                posterPath={movie.poster_path || ""}
                fullData={movie}
              />
            ))}
          </Swiper>
          <HFlatList title="Trending Now" data={trendingData} />
          <ListTitle>Comming Soon</ListTitle>
        </>
      }
      renderItem={({ item }) => (
        <HMedia
          title={item?.title || ""}
          posterPath={item.poster_path || ""}
          overview={item.overview}
          releaseDate={item.release_date}
          fullData={item}
        />
      )}
      data={upcomingData?.pages?.map((page) => page.results).flat()}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={VSeparator}
      contentContainerStyle={{ paddingBottom: 24 }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
    />
  ) : null;
}

export default Movies;
