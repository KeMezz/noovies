import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";

function Movies({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Movies">) {
  const getNowPlaying = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((response) => console.log(response));
  };
  return (
    <Container>
      <Swiper
        loop
        timeout={2}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        <View style={{ backgroundColor: "red" }} />
        <View style={{ backgroundColor: "blue" }} />
        <View style={{ backgroundColor: "orange" }} />
        <View style={{ backgroundColor: "teal" }} />
      </Swiper>
    </Container>
  );
}

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

export default Movies;
