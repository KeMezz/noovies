import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface HMedia {
  posterPath: string;
  title: string;
  overview?: string;
  releaseDate?: string;
  voteCount?: number;
  voteAverage?: number;
}

function HMedia({
  posterPath,
  title,
  overview,
  releaseDate,
  voteCount,
  voteAverage,
}: HMedia) {
  return (
    <Container>
      <Poster posterPath={posterPath} />
      <MovieInfo>
        <UpcomingTitle numberOfLines={2}>{title}</UpcomingTitle>
        <ReleaseDate>
          {releaseDate
            ? new Date(releaseDate).toLocaleDateString("ko", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null}
        </ReleaseDate>
        {overview ? <Overview numberOfLines={4}>{overview}</Overview> : null}
        {voteCount && voteAverage ? (
          <Votes voteCount={voteCount} voteAverage={voteAverage} />
        ) : null}
      </MovieInfo>
    </Container>
  );
}

const Container = styled.View`
  padding: 0 24px;
  flex-direction: row;
  flex: 1;
`;
const MovieInfo = styled.View`
  padding-left: 16px;
  flex: 1;
  justify-content: center;
  width: 70%;
`;
const UpcomingTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  margin-top: 4px;
`;
const ReleaseDate = styled(Overview)`
  font-size: 10px;
  opacity: 1;
  margin-top: 6px;
`;

export default HMedia;
