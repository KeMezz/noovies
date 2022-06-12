import React from "react";
import styled from "styled-components/native";
import { makeImagePath } from "../utils/makeImagePath";

interface PosterProps {
  posterPath: string;
}

function Poster({ posterPath }: PosterProps) {
  return <Image source={{ uri: makeImagePath(posterPath) }} />;
}

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inactive};
`;

export default Poster;
