import React, { useState, useEffect } from "react";
import { View } from "react-native";
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
      <View style={{ marginBottom: 50 }}>
        <Grid products={fetchProducts} />
      </View>
    );
}
