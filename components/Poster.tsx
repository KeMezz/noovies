import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils/makeImgPath";

interface PosterProps {
  path: string | null;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <PosterImage source={{ uri: makeImgPath(path) }} />;
};

const PosterImage = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.8);
`;

export default Poster;
