import { Cart, Favorite, Product } from "src/interface";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  getCombinedArray,
  getCombinedFaveArray,
  updateOrAdd,
  updateOrAddFave,
} from "./CommonUtil";

const PRODUCT_COLLECTION = "product";
const CUSTOMERS_COLLECTION = "customer";
const CART_COLLECTION = "cart";
const FAVOURITE_COLLECTION = "favourite"; //favourite

export async function getProducts(ids: number[]): Promise<Product[]> {
  try {
    if (ids && ids.length > 0) {
      const products = await firestore()
        .collection(PRODUCT_COLLECTION)
        .where("id", "in", ids)
        .get();
      return products.docs.map((docs) => docs.data()) as Product[];
    } else {
      const products = await firestore().collection(PRODUCT_COLLECTION).get();
      return products.docs.map((docs) => docs.data()) as Product[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}
export const addToCart = async (
  user: FirebaseAuthTypes.User | null,
  productId: number
) => {
  if (!user) {
    return;
  }
  const { cart, cartCollection } = await getCart(user);
  if (cart && cart.find((item) => item.id === productId)) {
    const document = cartCollection.doc(productId.toString());
    await document.update({
      count: firestore.FieldValue.increment(1),
    });
  } else {
    cartCollection.doc(productId.toString()).set({
      id: productId,
      count: 1,
    });
  }
};
//////// i aded this for deleting item
// export const deleteFromCart = async (
//   user: FirebaseAuthTypes.User | null,
//   productId: number
// ) => {
//   if (!user) {
//     return;
//   }
//   const { cart, cartCollection } = await getCart(user);
//   if (cart && cart.find((item) => item.id === productId)) {
//     const document = cartCollection.doc(productId.toString());
//     await document.delete();
//   } else return;
// };

////////////
const getCart = async (
  user: FirebaseAuthTypes.User
): Promise<{ cart: Cart[]; cartCollection: any }> => {
  const cartCollection = firestore()
    .collection(CUSTOMERS_COLLECTION)
    .doc(user.uid)
    .collection(CART_COLLECTION);
  const cartFir = await cartCollection.get();
  const cart = cartFir.docs.map((doc) => doc.data()) as Cart[];
  return { cart, cartCollection };
};

export const getCombinedCart = async (user: FirebaseAuthTypes.User) => {
  const { cart } = await getCart(user);
  const productIds = cart.map((item) => item.id);
  const productArray = (await getProducts(productIds)) as Product[];
  return getCombinedArray(cart, productArray);
};
export const firestoreCartUpdate = (
  user: FirebaseAuthTypes.User,
  updateToCart: (
    change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>
  ) => void
) => {
  ///   i aded the user here to update if these is user  onlyy
  if (user) {
    return firestore()
      .collection(CUSTOMERS_COLLECTION)
      .doc(user.uid)
      .collection(CART_COLLECTION)
      .onSnapshot((sanapshot) => {
        sanapshot.docChanges().forEach((change) => {
          updateToCart(change);
        });
      });
  } else return;
};
export const getUpdatedCart = (
  old: Cart[],
  change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>,
  product: Product[]
) => {
  const data = change.doc.data() as Cart;
  const newArray = getCombinedArray([data], product);
  return updateOrAdd(old, newArray[0]);
};
/// favourite itmes /////////////////////////////////////////////////////////////////////
export const addToFavourite = async (
  user: FirebaseAuthTypes.User | null,
  productId: number
) => {
  if (!user) {
    return;
  }
  const { fave, faveCollection } = await getFave(user);
  if (fave && fave.find((item) => item.id === productId)) {
    const document = faveCollection.doc(productId.toString());
    await document.delete();
    ////
    // { fave, faveCollection } = await getFave(user);
  } else {
    faveCollection.doc(productId.toString()).set({
      id: productId,
      liked: true,
    });
  }
};
// get the fave and collection to then manibulate it
export const getFave = async (
  user: FirebaseAuthTypes.User
): Promise<{ fave: Favorite[]; faveCollection: any }> => {
  const faveCollection = firestore()
    .collection(CUSTOMERS_COLLECTION)
    .doc(user.uid)
    .collection(FAVOURITE_COLLECTION);
  const faves = await faveCollection.get();
  const fave = faves.docs.map((doc) => doc.data()) as Favorite[];
  return { fave, faveCollection };
};
// get fave to display in the profile screen

export const getFaveProducts = async (user: FirebaseAuthTypes.User) => {
  const { fave } = await getFave(user);
  const favIds = fave.map((item) => item.id);
  const faveArray = (await getProducts(favIds)) as Product[];
  return getCombinedFaveArray(fave, faveArray);
};
/// to create updated in fave
export const firestoreFaveUpdate = (
  user: FirebaseAuthTypes.User,
  updateToFave: (
    change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>
  ) => void
) => {
  return firestore()
    .collection(CUSTOMERS_COLLECTION)
    .doc(user.uid)
    .collection(FAVOURITE_COLLECTION)
    .onSnapshot((sanapshot) => {
      sanapshot.docChanges().forEach((change) => {
        updateToFave(change);
      });
    });
};
// export const firestoreFaveUpdate = (
//   user: FirebaseAuthTypes.User,
//   getFaveProducts: any
// ) => {
//   return firestore()
//     .collection(CUSTOMERS_COLLECTION)
//     .doc(user.uid)
//     .collection(FAVOURITE_COLLECTION)
//     .onSnapshot((sanapshot) => {
//       sanapshot.docChanges().forEach((change) => {
//         getFaveProducts(user);
//       });
//     });
// };
/////// fave list updating the array
export const getUpdatedFaves = (
  old: Favorite[],
  change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>,
  product: Product[]
) => {
  const data = change.doc.data() as Favorite;
  const newArray = getCombinedFaveArray([data], product);
  return updateOrAddFave(old, newArray[0]);
};
