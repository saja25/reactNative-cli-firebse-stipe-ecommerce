// this is self built button
import React from "react";
import { View, Text, ViewStyle, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { baseStyles, colors } from "../../styles/Index";
import ButtonStyle from "./Styles";
import Ionicons from "react-native-vector-icons/Ionicons";
export interface ButtonProps {
  onPress?: () => void;
  title?: string;
  iconName?: string;
  isLoading?: boolean;
  style?: ViewStyle;
  shape?: string;
  size?: number;
  background?: string;
}
const Button = ({
  onPress,
  size,
  iconName,
  isLoading,
  background,
  style,
  shape,
  title,
}: ButtonProps) => {
  const bStles = ButtonStyle({
    size,
    background,
    shape,
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        bStles.container,
        style,
        isLoading && bStles.loading,
        baseStyles.buttonShadow,
      ]}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.yellow} size="large" />
      ) : (
        <>
          {iconName && (
            <Ionicons name={iconName} color={colors.black} size={25} />
          )}
          {title && <Text style={baseStyles.headerMd}>{title}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
};
export default Button;
