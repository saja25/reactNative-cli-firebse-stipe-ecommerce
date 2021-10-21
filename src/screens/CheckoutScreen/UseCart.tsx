import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { Cart, Product } from "src/interface";
import { UseMounted } from "_hooks/UseMounted";
import { getPrice, updateOrAdd } from "_utils/CommonUtil";
import {
  firestoreCartUpdate,
  getCombinedCart,
  getProducts,
  getUpdatedCart,
} from "_utils/FireStoreUtil";
import { LoginContext } from "_utils/LoginProvider";

export default function UseCart() {
  let subscriber: () => void;
  const { user } = useContext(LoginContext);
  const [List, setList] = useState<Cart[]>([]);
  const [Price, setPrice] = useState<number>();
  const [CartLoading, setCartLoading] = useState(true);
  const Mounted = UseMounted();
  const updateToCart = async (
    change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>
  ) => {
    const Products = (await getProducts(change.doc.data().id)) as Product[];
    setList((old) => {
      const cart = getUpdatedCart(old, change, Products);
      setPrice(getPrice(cart));
      // console.log("use cart", cart);

      return cart;
    });
  };
  const getCart = async () => {
    if (!user) {
      return;
    }
    try {
      const cart = await getCombinedCart(user);
      Mounted && setList(cart);
      Mounted && setPrice(getPrice(cart));
      Mounted && setCartLoading(false);
      // update the cart
      subscriber = firestoreCartUpdate(user, updateToCart);
    } catch (error) {
      console.log(error);
      Alert.alert("Somthing went wrong!");
    }
  };
  useEffect(() => {
    getCart();
    return () => {
      subscriber && subscriber();
    };
  }, []);
  return { List, setList, Price, CartLoading };
}
