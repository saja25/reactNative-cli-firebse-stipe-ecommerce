import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { Favorite, Product } from "src/interface";
import { UseMounted } from "_hooks/UseMounted";
import {
  firestoreCartUpdate,
  firestoreFaveUpdate,
  getCombinedCart,
  getFaveProducts,
  getProducts,
  getUpdatedCart,
  getUpdatedFaves,
} from "_utils/FireStoreUtil";
import { LoginContext } from "_utils/LoginProvider";

export default function UseFave() {
  let subscriber: () => void;
  const { user } = useContext(LoginContext);
  const [List, setList] = useState<Favorite[]>([]);
  const [FaveLoading, setFaveLoading] = useState(true);
  const Mounted = UseMounted();
  const updateToFave = async (
    change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>
  ) => {
    const Products = (await getProducts(change.doc.data().id)) as Product[];
    setList((old) => {
      const faves = getUpdatedFaves(old, change, Products);
      return faves;
    });
  };
  const getFave = async () => {
    if (!user) {
      return;
    }
    try {
      const faves = await getFaveProducts(user);
      Mounted && setList(faves);
      Mounted && setFaveLoading(false);
      // update the cart
      subscriber = firestoreFaveUpdate(user, updateToFave);
      //   subscriber = firestoreFaveUpdate(user, getFaveProducts());
    } catch (error) {
      console.log(error);
      Alert.alert("Somthing went wrong!");
    }
  };
  useEffect(() => {
    getFave();
    return () => {
      subscriber && subscriber();
    };
  }, []);
  return { List, setList, FaveLoading };
}
