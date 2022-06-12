import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SlideMedia from "../components/SlideMedia";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery } from "react-query";
import { moviesAPI } from "../utils/api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function Movies({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Movies">) {
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    "nowPlaying",
    moviesAPI.nowPlaying
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    "trending",
    moviesAPI.trending
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    "upcoming",
    moviesAPI.upcoming
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {};

  const keyExtractor = (item) => item.id + "";
  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      title={item.title}
      voteCount={item.vote_count}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      title={item.title}
      posterPath={item.poster_path}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
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
            {nowPlayingData.results.map((movie) => (
              <SlideMedia
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
          <TrendingFlatList
            horizontal
            data={trendingData.results}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={HSeparator}
            renderItem={renderVMedia}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
          <ListTitle>Comming Soon</ListTitle>
        </>
      }
      renderItem={renderHMedia}
      data={upcomingData.results}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={VSeparator}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}

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
  margin-left: 24px;
  margin-top: 34px;
  margin-bottom: 14px;
`;
const TrendingFlatList = styled.FlatList``;
const UpcomingFlatList = styled.FlatList``;

export default Movies;
