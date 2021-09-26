import { Product } from "src/interface";

export async function getProducts(ids: number[]): Promise<Product[]> {
  try {
    if (ids && ids.length > 0) {
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}
