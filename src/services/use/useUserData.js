import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import secureAxios from "../secureAxios";

const useUserData = (options = {}) => {
  const { useCache = false, includeLoading = false } = options;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(includeLoading);
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (useCache) {
      const cachedUser = localStorage.getItem("userInfo");

      if (cachedUser) {
        const user = JSON.parse(cachedUser);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        if (includeLoading) setLoading(false);
        return;
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await secureAxios.get(`${BASE_URL}/user`, {
            params: { email: user.email }
          });
          const data = res.data;
          if (data?.firstName && data?.lastName && data?.email) {
            if (useCache) {
              localStorage.setItem("userInfo", JSON.stringify(data));
            }
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
          } else {
            console.warn("User data not found or incomplete:", data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        } finally {
          if (includeLoading) setLoading(false);
        }
      } else {
        if (includeLoading) setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [BASE_URL, useCache, includeLoading]);

  const getInitials = (firstName, lastName) => {
    const getFirstInitial = (str) => {
      const firstWord = str?.trim().split(" ")[0] || "";
      return firstWord.charAt(0).toUpperCase();
    };
    return `${getFirstInitial(firstName)}${getFirstInitial(lastName)}`;
  };

  const result = {
    firstName,
    lastName,
    email,
    getInitials
  };

  if (includeLoading) {
    result.loading = loading;
  }

  return result;
};

export default useUserData;
