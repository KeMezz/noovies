import React, { useState } from "react";
import Swiper from "react-native-swiper";
import VMedia from "../components/VMedia";
import FullscreenLoader from "../components/FullscreenLoader";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import ListTitle from "../components/ListTitle";
import VSeparator from "../components/VSeparator";
import HSeparator from "../components/HSeparator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTvs, ITv, TvResults } from "../utils/api";
import { Dimensions, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Tv: React.FC<NativeStackScreenProps<any, "TV">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    isRefetching: isRefetchingAiringToday,
  } = useQuery<TvResults>(["tv", "airingToday"], fetchTvs.airingToday);
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: isRefetchingTopRated,
  } = useQuery<TvResults>(["tv", "topRated"], fetchTvs.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<TvResults>(["tv", "trending"], fetchTvs.trending);

  const loading = airingTodayLoading || topRatedLoading || trendingLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const renderVMedia = ({ item }: { item: ITv }) => (
    <VMedia
      posterPath={item.poster_path}
      originalName={item.original_name}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }: { item: ITv }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_name}
      firstAirDate={item.first_air_date}
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
              {airingTodayData?.results.map((tv) => (
                <Slide
                  key={tv.id}
                  backdropPath={tv?.backdrop_path}
                  posterPath={tv?.poster_path}
                  originalName={tv.original_name}
                  voteAverage={tv.vote_average}
                  overview={tv.overview}
                />
              ))}
            </Swiper>
            <ListTitle title="Trending Shows" />
            <FlatList
              data={trendingData?.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <VSeparator width={18} />}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              renderItem={renderVMedia}
            />
            <ListTitle title="Top Rated" />
          </>
        }
        data={topRatedData?.results}
        ItemSeparatorComponent={() => <HSeparator height={18} />}
        contentContainerStyle={{ marginBottom: 24 }}
        renderItem={renderHMedia}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={<HSeparator height={18} />}
      />
    );
};

export default Tv;
