import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Cart } from "src/interface";
import Styles from "./Styles";

interface CartCardProps {
  item: Cart;
}

const Index = ({ item }: CartCardProps) => {
  return (
    <View>
      <TouchableOpacity style={Styles.card}>
        <Image source={{ uri: item.image }} style={Styles.image} />
        <View>
          <Text>Product : {item.title}</Text>
          <Text>Qty: {item.count}</Text>
          <Text>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
