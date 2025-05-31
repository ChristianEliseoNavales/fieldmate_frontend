import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import secureAxios from '../../services/secureAxios'; // adjust path if needed

const useAdminInfo = (BASE_URL) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await secureAxios.get(`${BASE_URL}/user`, {
            params: { email: user.email }
          });
          const data = res.data;
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
        } catch (err) {
          console.error("Failed to fetch admin info:", err);
        }
      }
    });

    return () => unsubscribe();
  }, [BASE_URL]);

  return { firstName, lastName };
};

export default useAdminInfo;
