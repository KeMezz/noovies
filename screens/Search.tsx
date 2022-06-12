import React, { useState } from "react";
import styled from "styled-components/native";

function Search() {
  const [input, setInput] = useState("");
  const onInputChange = (input: string) => setInput(input);

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="#aaa"
        returnKeyType="search"
        onChangeText={onInputChange}
        autoFocus
      />
    </Container>
  );
}

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: #fff;
  border-radius: 24px;
  padding: 12px 18px;
  margin: 24px 18px;
`;

export default Search;
