import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ADD_STRIPE_USER, Post } from "./BackendUtil";

export default class FirebaseUtil {
  public static signIn = (email: string, password: string) => {
    return auth().signInWithEmailAndPassword(email, password);
  };
  public static signUp = async (email: string, password: string) => {
    let userCred = await auth().createUserWithEmailAndPassword(email, password);
    // create stripe customer for new user
    console.log("usercard ", userCred);
    await Post(userCred.user, ADD_STRIPE_USER);
    return userCred;
  };
  public static signOut = () => {
    return auth().signOut();
  };
}
