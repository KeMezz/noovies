import React from "react";
import styled from "styled-components/native";

interface ListTitleProps {
  title: string;
}

const ListTitle: React.FC<ListTitleProps> = ({ title }) => (
  <Title>{title}</Title>
);

const Title = styled.Text`
  padding: 24px;
  padding-bottom: 14px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

export default ListTitle;
