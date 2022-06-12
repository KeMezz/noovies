import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { MediaResponse } from "../utils/api";
import VMedia from "./VMedia";

interface HFlatListProps {
  title: string;
  data?: MediaResponse;
}

function HFlatList({ title, data }: HFlatListProps) {
  return (
    <>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        keyExtractor={(item) => item.id + ""}
        data={data?.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path || ""}
            title={item.title ?? item.name ?? ""}
            voteCount={item.vote_count}
            voteAverage={item.vote_average}
            fullData={item}
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

const NoResults = styled.Text`
  color: ${(props) => props.theme.textColor};
  padding: 18px;
  padding-bottom: 40px;
  text-align: center;
`;

export default HFlatList;
