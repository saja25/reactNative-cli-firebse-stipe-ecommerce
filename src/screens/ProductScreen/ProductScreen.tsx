import { RouteProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, Alert, Image, ScrollView } from "react-native";
import { Product } from "src/interface";
import Button from "_components/Button/Index";
import { baseStyles, colors } from "_styles/Index";
import { addToCart, addToFavourite } from "_utils/FireStoreUtil";
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
  const addToFave = () => {
    try {
      addToFavourite(user, product.id);
      Alert.alert("product has been added to fave!");
    } catch (error) {
      {
        console.log(error);
      }
      Alert.alert("something went wrong");
    }
  };
  return (
    <>
      <View style={Styles.backButton}>
        <Button
          size={40}
          background={colors.white}
          iconName="arrow-back-outline"
          shape="square"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      <ScrollView style={Styles.container}>
        <View>
          <View style={Styles.rightButton}>
            <Button
              size={50}
              background={colors.yellow}
              iconName="share-social-outline"
              style={Styles.Share}
            />
            {product.liked ? (
              <Button
                size={50}
                background={colors.yellow}
                iconName="heart"
                onPress={addToFave}
              />
            ) : (
              <Button
                size={50}
                background={colors.yellow}
                iconName="heart-outline"
                onPress={addToFave}
              />
            )}
          </View>
          <Image source={{ uri: product.image }} style={Styles.image} />
        </View>
        <View style={baseStyles.container}>
          <Text style={[baseStyles.headerLg, Styles.title]}>
            {product.title}
          </Text>
          <Text style={[baseStyles.headerLg, Styles.price]}>
            {product.price} $
          </Text>
          <Button title="ADD TO CART" onPress={handelPress}></Button>
          <Text style={[baseStyles.headerLg, Styles.description]}>
            {product.description}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
