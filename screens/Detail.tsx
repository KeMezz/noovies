import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { IMovie, ITv } from "../utils/api";

type RootStackParamList = {
  Detail: IMovie | ITv;
};

const Detail: React.FC<
  NativeStackScreenProps<RootStackParamList, "Detail">
> = ({ navigation: { setOptions }, route: { params } }) => {
  useEffect(() => {
    setOptions({
      title:
        "original_title" in params
          ? params.original_title
          : params.original_name,
    });
  }, []);

  return (
    <Container>
      <Poster path={params.backdrop_path} />
    </Container>
  );
};

const Container = styled.ScrollView``;
const Backdrop = styled.Image``;
const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

export default Detail;
