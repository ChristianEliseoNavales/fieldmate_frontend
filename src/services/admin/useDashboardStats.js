import { useState, useEffect } from 'react';
import secureAxios from '../../services/secureAxios'; // adjust path if needed

const useDashboardStats = (BASE_URL) => {
  const [companies, setCompanies] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Using secureAxios instead of fetch
        const [compRes, usersRes] = await Promise.all([
          secureAxios.get(`${BASE_URL}/companies`),
          secureAxios.get(`${BASE_URL}/users`)
        ]);
        const compData = compRes.data;
        const userData = usersRes.data;
        setCompanies(compData);
        setCoordinators(userData.filter(user => user.role === 'Coordinator'));
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [BASE_URL]);

  return { companies, coordinators, loading };
};

export default useDashboardStats;
