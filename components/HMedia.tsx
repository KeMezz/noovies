import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface HMeidaProps {
  posterPath: string;
  originalTitle: string;
  releaseDate?: string;
  voteAverage?: number;
  overview: string;
}

const HMedia: React.FC<HMeidaProps> = ({
  posterPath,
  originalTitle,
  releaseDate,
  voteAverage,
  overview,
}) => {
  return (
    <Container>
      <Poster path={posterPath} />
      <HColumn>
        <HTitle>{originalTitle}</HTitle>
        {releaseDate ? (
          <ReleaseDate>
            {new Date(releaseDate).toLocaleDateString("ko", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </ReleaseDate>
        ) : null}
        {voteAverage ? <Votes voteAverage={voteAverage} /> : null}
        {overview ? <HOverview numberOfLines={4}>{overview}</HOverview> : null}
      </HColumn>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  padding: 0 24px;
`;
const HColumn = styled.View`
  width: 100%;
  margin-left: 12px;
  justify-content: center;
`;
const HTitle = styled.Text`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
`;
const HOverview = styled.Text`
  color: ${({ theme }) => theme.textColor};
  width: 65%;
  margin-top: 8px;
  opacity: 0.8;
  font-size: 12px;
`;
const ReleaseDate = styled(HOverview)`
  opacity: 1;
`;

export default HMedia;
