import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import secureAxios from "../services/secureAxios";

const userInfo = (BASE_URL) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await secureAxios.get(`${BASE_URL}/user`, {
            params: { email: user.email },
          });
          const data = res.data;

          if (data && data.firstName && data.lastName && data.company) {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setCompany(data.company);
          } else {
            console.warn("User data not found or incomplete:", data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [BASE_URL]);

  return { firstName, lastName, company, loading };
};

export default userInfo;
