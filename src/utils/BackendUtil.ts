import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { API_URL } from "../../ApiConfig";
export const ADD_STRIPE_USER = "/add/user";
export const CHECKOUT_GET_PAYMENT_INTENT = "/checkout";

export const Post = async (
  user: FirebaseAuthTypes.User,
  endpoint: string,
  body: Object
) => {
  console.log("i am at the backed util in the front");
  const token = user && (await user.getIdToken());
  console.log("i am at the backed util in the front", token);
  let response = await fetch(API_URL + endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : "",
  });
  if (response.ok) {
    return response;
    // console.log(response, "resssss at util front ");
  } else {
    console.log(response.status, "error at util front ");
    throw new Error(response.status + "fetch failed ! at backend util");
  }
};
