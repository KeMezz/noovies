import React from "react";
import styled from "styled-components/native";

interface VotesProps {
  voteAverage: number;
}

const Votes: React.FC<VotesProps> = ({ voteAverage }) => {
  return <VoteText>⭐️ {voteAverage} / 10</VoteText>;
};

const VoteText = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.textColor};
  margin-top: 4px;
  line-height: 16px;
  opacity: 0.8;
`;

export default Votes;
