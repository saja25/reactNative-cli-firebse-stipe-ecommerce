import { Cart, Favorite, Product } from "src/interface";

export const getCombinedArray = (cart: Cart[], products: Product[]) => {
  let compinedArray = [];
  for (let i = 0; i < cart.length; i++) {
    compinedArray.push({
      ...cart[i],
      ...products.find((item) => item.id === cart[i].id),
    });
    cart;
  }
  return compinedArray as Cart[];
};
export const getPrice = (cart: Cart[]) => {
  let amount = 0;
  cart.forEach((item) => {
    amount = item.price * item.count;
  });
  return amount;
};
export const updateOrAdd = (old: Cart[], item: Cart) => {
  const i = old.findIndex((_item) => _item.id == item.id);
  if (i > -1) {
    old[i] = item;
  } else {
    old.push(item);
  }
  return [...old];
};

///////////////// for faves
export const getCombinedFaveArray = (
  faveArr: Favorite[],
  products: Product[]
) => {
  let compinedArray = [];
  for (let i = 0; i < faveArr.length; i++) {
    compinedArray.push({
      ...faveArr[i],
      ...products.find((item) => item.id === faveArr[i].id),
    });
    faveArr;
  }
  return compinedArray as Favorite[];
};
export const updateOrAddFave = (old: Favorite[], item: Favorite) => {
  const i = old.findIndex((_item) => _item.id == item.id);
  if (i > -1) {
    old[i] = item;
  } else {
    old.push(item);
  }
  return [...old];
};
