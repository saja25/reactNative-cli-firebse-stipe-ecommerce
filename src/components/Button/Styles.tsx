import { StyleSheet } from "react-native";
import { colors } from "../../styles/Index";
import { ButtonProps } from "./Index";
const ButtonStyle = ({ size, background, shape }: ButtonProps) =>
  StyleSheet.create({
    container: {
      height: size ? size : 55,
      width: size ? size : "100%",
      backgroundColor: background ? background : colors.yellow,
      justifyContent: "center",
      borderRadius: shape == "square" ? 5 : 35,
      marginHorizontal: 2,
      alignItems: "center",
    },
    loading: {
      backgroundColor: colors.black,
    },
  });

export default ButtonStyle;
