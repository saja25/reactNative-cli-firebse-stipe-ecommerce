import { RouteProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, Alert, Image, ScrollView, Button } from "react-native";
import { Product } from "src/interface";
import { addToCart } from "_utils/FireStoreUtil";
import { LoginContext } from "_utils/LoginProvider";
import Styles from "./Styles";

type ParamList = {
  detail: {
    product: Product;
  };
};
interface ProductScreenProps {
  route: RouteProp<ParamList, "detail">;
  navigation: any;
}
export default function ProductScreen({
  route,
  navigation,
}: ProductScreenProps) {
  const { user } = useContext(LoginContext);
  const product = route.params.product;
  const handelPress = () => {
    try {
      addToCart(user, product.id);
      Alert.alert("product has been added to cart ");
    } catch (error) {
      {
        console.log(error);
      }
      Alert.alert("something went wrong");
    }
  };

  return (
    <ScrollView style={Styles.container}>
      <View>
        <Image source={{ uri: product.image }} style={Styles.image} />
      </View>
      <View>
        <Text>{product.title}</Text>
        <Text>{product.price}</Text>
        <Button title="ADD TO CART" onPress={handelPress}></Button>
        <Text>{product.description}</Text>
      </View>
    </ScrollView>
  );
}
