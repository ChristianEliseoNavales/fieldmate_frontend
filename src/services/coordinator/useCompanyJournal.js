import { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const useCompanyJournal = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [allJournals, setAllJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchJournals = async (email) => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/journal/company?email=${email}`);
      const data = Array.isArray(res.data) ? res.data : [];
      const filtered = data.filter(journal => journal.removed !== true);
      setAllJournals(filtered);
    } catch (err) {
      console.error('Failed to load journal entries:', err);
      setAllJournals([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleViewed = async (id, currentViewed) => {
    try {
      await axios.patch(`${baseURL}/journal/${id}/viewed`, { viewed: !currentViewed });
      setAllJournals(prev =>
        prev.map(j => j._id === id ? { ...j, viewed: !currentViewed } : j)
      );
    } catch (err) {
      console.error('Failed to toggle viewed:', err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.patch(`${baseURL}/journal/${id}/remove`, { removed: true });
      setAllJournals(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      console.error('Failed to remove journal:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        await fetchJournals(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      setFilteredJournals([]);
      return;
    }

    const formatted = new Date(selectedDate).toLocaleDateString();
    const filtered = allJournals.filter(journal =>
      new Date(journal.createdAt).toLocaleDateString() === formatted
    );
    setFilteredJournals(filtered);
  }, [selectedDate, allJournals]);

  return {
    isSidebarExpanded,
    setIsSidebarExpanded,
    filteredJournals,
    selectedDate,
    setSelectedDate,
    loading,
    toggleViewed,
    handleRemove,
  };
};
