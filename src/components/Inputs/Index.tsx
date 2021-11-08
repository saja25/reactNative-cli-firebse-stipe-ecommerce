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
///////// this one i need to go back to video to see it with

/// https://www.youtube.com/watch?v=ElgfjrWn7Mg&list=WL&ab_channel=TechSavvy
