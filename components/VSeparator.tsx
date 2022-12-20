import React from "react";
import { View } from "react-native";

interface VSeparatorProps {
  width: number;
}

const VSeparator: React.FC<VSeparatorProps> = ({ width }) => {
  return <View style={{ width }} />;
};

export default VSeparator;
