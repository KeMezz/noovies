import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { TvApi } from "../utils/api";
import Loader from "../components/Loader";
import { RefreshControl, ScrollView } from "react-native";
import HFlatList from "../components/HFlatList";

function Tv() {
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], TvApi.trending);
  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    isRefetching: airingTodayRefetching,
  } = useQuery(["tv", "airingToday"], TvApi.airingToday);
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: topRatedRefetching,
  } = useQuery(["tv", "topRated"], TvApi.topRated);

  const queryClient = useQueryClient();
  const onRefresh = () => queryClient.refetchQueries(["tv"]);

  const loading = trendingLoading || airingTodayLoading || topRatedLoading;
  const refreshing =
    trendingRefetching || airingTodayRefetching || topRatedRefetching;

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <HFlatList title="Trending Now" data={trendingData} />
      <HFlatList title="Airing Today" data={airingTodayData} />
      <HFlatList title="Top Rated Shows" data={topRatedData} />
    </ScrollView>
  );
}

export default Tv;
