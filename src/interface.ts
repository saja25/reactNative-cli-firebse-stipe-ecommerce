export interface Product {
  title: string;
  // price: string;
  price: number;
  id: number;
  description: string;
  catagory: string;
  image: string;
  liked: boolean;
}
export interface Cart extends Product {
  count: number;
}

export interface Favorite extends Product {
  liked: boolean;
}
