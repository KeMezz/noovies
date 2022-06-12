import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

interface HFlatListProps {
  title: string;
  data: {
    results: {
      id: number;
      poster_path: string;
      title?: string;
      name?: string;
      vote_count: number;
      vote_average: number;
    }[];
  };
}

function HFlatList({ title, data }: HFlatListProps) {
  return (
    <>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        keyExtractor={(item) => item.id + ""}
        data={data.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            title={item.title ?? item.name ?? ""}
            voteCount={item.vote_count}
            voteAverage={item.vote_average}
          />
        )}
        ItemSeparatorComponent={HSeparator}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18 }}
      />
    </>
  );
}

export const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: bold;
  margin-left: 18px;
  margin-top: 34px;
  margin-bottom: 14px;
`;

const HSeparator = styled.View`
  flex: 1;
  width: 12px;
`;

export default HFlatList;
