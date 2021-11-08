import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { baseStyles } from "_styles/Index";
import Styles from "./Styles";
interface EmptyCartProps {}
export default function Index(props: EmptyCartProps) {
  return (
    <ScrollView
      contentContainerStyle={[baseStyles.containerJustify, Styles.container]}
    ></ScrollView>
  );
}
