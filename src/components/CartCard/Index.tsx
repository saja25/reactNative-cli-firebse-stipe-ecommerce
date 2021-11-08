import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Cart } from "src/interface";
import { baseStyles } from "_styles/Index";
import Styles from "./Styles";

interface CartCardProps {
  item: Cart;
}
const Index = ({ item }: CartCardProps) => {
  return (
    <View>
      <TouchableOpacity style={[Styles.card, baseStyles.cardShadow]}>
        <Image source={{ uri: item.image }} style={Styles.image} />
        <View style={Styles.desc}>
          <Text style={[Styles.title, baseStyles.headerSm]}>
            Product : {item.title}
          </Text>
          <Text style={[Styles.qty, baseStyles.subHeader]}>
            Qty: {item.count}
          </Text>
          <Text style={baseStyles.headerSm}>{item.price} $</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
