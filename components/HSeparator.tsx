import React from "react";
import { View } from "react-native";

interface HSeparatorProps {
  height: number;
}

const HSeparator: React.FC<HSeparatorProps> = ({ height }) => {
  return <View style={{ height }} />;
};

export default HSeparator;
