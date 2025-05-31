import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import secureAxios from "../services/secureAxios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (!user || !user.email) throw new Error("Invalid user");

  const res = await secureAxios.post(`${BASE_URL}/users/checkUserExists`, {
    email: user.email,
  });

  const data = res.data;

  if (data.exists && data.user) {
    return data.user.role;
  } else {
    await signOut(auth);
    throw new Error("This email is not registered in our system.");
  }
}

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  if (!user || !user.email) throw new Error("Invalid Google user");

  const res = await secureAxios.post(`${BASE_URL}/users/checkUserExists`, {
    email: user.email,
  });

  const data = res.data;

  if (data.exists && data.user) {
    return data.user.role;
  } else {
    await user.delete();
    await signOut(auth);
    throw new Error("This email is not registered in our system.");
  }
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}
