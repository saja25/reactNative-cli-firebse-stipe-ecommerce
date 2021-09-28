import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import FirebaseUtil from "_utils/FirebaseUtil";
import { LoginContext } from "_utils/LoginProvider";
import { Product } from "src/interface";
import { getProducts } from "_utils/FireStoreUtil";
import LoadingScreen from "./LoadingScreen";
import { UseMounted } from "_hooks/UseMounted";
import Grid from "../components/grid";
export default function HomeScreen() {
  const [fetchProducts, setfetchProducts] = useState<Product[]>([]);
  const isMounted = UseMounted();
  useEffect(() => {
    async function init() {
      const products = await getProducts();
      isMounted && setfetchProducts(products);
    }
    init();
  }, []);

  if (!fetchProducts || fetchProducts.length <= 0) {
    return <LoadingScreen />;
  } else
    return (
      <View>
        <Grid products={fetchProducts} />
      </View>
    );
}
