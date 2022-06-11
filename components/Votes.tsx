import React from "react";
import styled from "styled-components/native";

interface VotesProps {
  voteCount: number;
  voteAverage: number;
  marginTop?: string;
}

function Votes({ voteCount, voteAverage, marginTop }: VotesProps) {
  return voteCount > 0 ? (
    <Text marginTop={marginTop ?? "0px"}>⭐️ {voteAverage} / 10</Text>
  ) : null;
}

const Text = styled.Text<{ marginTop: string }>`
  color: ${(props) => props.theme.textColor};
  margin-top: ${({ marginTop }) => marginTop};
  font-size: 12px;
`;

export default Votes;
