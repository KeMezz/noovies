import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { MediaResponse, tvApi } from "../utils/api";
import Loader from "../components/Loader";
import { RefreshControl, ScrollView } from "react-native";
import HFlatList from "../components/HFlatList";

function Tv() {
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MediaResponse>(["tv", "trending"], tvApi.trending);
  const { isLoading: airingTodayLoading, data: airingTodayData } =
    useQuery<MediaResponse>(["tv", "airingToday"], tvApi.airingToday);
  const { isLoading: topRatedLoading, data: topRatedData } =
    useQuery<MediaResponse>(["tv", "topRated"], tvApi.topRated);

  const queryClient = useQueryClient();
  const onRefresh = () => {
    setRefreshing(true);
    queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const [refreshing, setRefreshing] = useState(false);
  const loading = trendingLoading || airingTodayLoading || topRatedLoading;

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