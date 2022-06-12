import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import HFlatList from "../components/HFlatList";
import Loader from "../components/Loader";
import { moviesApi, tvApi } from "../utils/api";

function Search() {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });

  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") return;
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="#aaa"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        autoFocus
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HFlatList title="Movie Results" data={moviesData} />
      ) : null}
      {tvData ? <HFlatList title="TV Results" data={tvData} /> : null}
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
`;
const SearchBar = styled.TextInput`
  background-color: #fff;
  border-radius: 24px;
  padding: 12px 18px;
  margin: 24px 18px;
  margin-bottom: 0;
`;

export default Search;
