import { Product } from "src/interface";
import fireStore from "@react-native-firebase/firestore";

const PRODUCT_COLLECTION = "product";
export async function getProducts(ids: number[]): Promise<Product[]> {
  try {
    if (ids && ids.length > 0) {
      const products = await fireStore()
        .collection(PRODUCT_COLLECTION)
        .where("id", "in", ids)
        .get();
      return products.docs.map((docs) => docs.data()) as Product[];
    } else {
      const products = await fireStore().collection(PRODUCT_COLLECTION).get();
      return products.docs.map((docs) => docs.data()) as Product[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}
