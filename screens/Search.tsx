import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import FullscreenLoader from "../components/FullscreenLoader";
import HSeparator from "../components/HSeparator";
import ListTitle from "../components/ListTitle";
import VMedia from "../components/VMedia";
import VSeparator from "../components/VSeparator";
import {
  fetchMovies,
  fetchTvs,
  IMovie,
  ITv,
  MovieResults,
  TvResults,
} from "../utils/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const onChangeText = (text: string) => setQuery(text);

  const {
    isInitialLoading: searchMoviesLoading,
    data: searchMoviesResults,
    refetch: searchMovies,
  } = useQuery<MovieResults>(
    ["searchMovies", query],
    () => fetchMovies.search(query),
    { enabled: false }
  );
  const {
    isInitialLoading: searchTvLoading,
    data: searchTvsResults,
    refetch: searchTvs,
  } = useQuery<TvResults>(["searchTvs", query], () => fetchTvs.search(query), {
    enabled: false,
  });

  const onSubmit = () => {
    if (query === "") {
      return;
    } else {
      searchMovies();
      searchTvs();
    }
  };

  const renderMovieResults = ({ item }: { item: IMovie }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderTvResults = ({ item }: { item: ITv }) => (
    <VMedia
      posterPath={item.poster_path}
      originalName={item.original_name}
      voteAverage={item.vote_average}
    />
  );

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movies or TV Shows"
        placeholderTextColor="grey"
        autoCapitalize="none"
        autoFocus
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {searchMoviesLoading || searchTvLoading ? <FullscreenLoader /> : null}
      {searchMoviesResults ? (
        <>
          <ListTitle title="Movies" />
          <FlatList
            data={searchMoviesResults?.results}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <VSeparator width={18} />}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            renderItem={renderMovieResults}
          />
        </>
      ) : null}
      {searchTvsResults ? (
        <>
          <ListTitle title="TV Shows" />
          <FlatList
            data={searchTvsResults?.results}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <VSeparator width={18} />}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            renderItem={renderTvResults}
          />
        </>
      ) : null}
      <HSeparator height={18} />
    </Container>
  );
};

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  padding: 12px 18px;
  margin: 24px;
  border-radius: 8px;
`;

export default Search;
