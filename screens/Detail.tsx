import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { iMedia } from "../utils/api";

type RootStackParamList = {
  Detail: iMedia;
};

function Detail({
  navigation: { setOptions },
  route: { params },
}: NativeStackScreenProps<RootStackParamList, "Detail">) {
  useEffect(
    () => setOptions({ title: "title" in params ? params.title : params.name }),
    []
  );
  return (
    <Container>
      <Poster posterPath={params.poster_path || ""} />
    </Container>
  );
}

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;

export default Detail;
