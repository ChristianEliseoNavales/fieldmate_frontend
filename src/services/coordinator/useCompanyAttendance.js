// services/coordinator/useCompanyAttendance.js
import { useState, useEffect } from 'react';
import secureAxios from '../secureAxios'; // adjust path if needed
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function useCompanyAttendance() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [allAttendances, setAllAttendances] = useState([]);
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [modalRecordId, setModalRecordId] = useState(null);

  const fetchUserAndAttendance = async (email) => {
    try {
      const userRes = await secureAxios.get(`${BASE_URL}/users?email=${email}`);
      const { company } = userRes.data;

      const attendanceRes = await secureAxios.get(`${BASE_URL}/attendance/company?email=${email}`);
      const all = attendanceRes.data || [];

      setAllAttendances(all);
      filterByDate(all, selectedDate);
    } catch (err) {
      console.error('Error fetching company attendance:', err);
    }
  };

  const filterByDate = (data, dateStr) => {
    const formatted = new Date(dateStr).toLocaleDateString();
    const filtered = data.filter(record => record.date === formatted);
    setFilteredAttendances(filtered);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        fetchUserAndAttendance(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedDate && allAttendances.length > 0) {
      filterByDate(allAttendances, selectedDate);
    }
  }, [selectedDate]);

  const confirmAction = (id, action) => {
    setModalRecordId(id);
    setModalAction(action);
    setModalVisible(true);
  };

  const handleModalConfirm = async () => {
    try {
      await secureAxios.put(`${BASE_URL}/attendance/${modalAction}/${modalRecordId}`);
      setAllAttendances(prev => prev.filter(record => record._id !== modalRecordId));
      setFilteredAttendances(prev => prev.filter(record => record._id !== modalRecordId));
    } catch (err) {
      console.error(`Failed to ${modalAction} record:`, err);
    } finally {
      setModalVisible(false);
      setModalRecordId(null);
      setModalAction('');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setModalRecordId(null);
    setModalAction('');
  };

  return {
    isSidebarExpanded,
    setIsSidebarExpanded,
    selectedRow,
    setSelectedRow,
    allAttendances,
    filteredAttendances,
    userEmail,
    selectedDate,
    setSelectedDate,
    modalVisible,
    modalAction,
    confirmAction,
    handleModalConfirm,
    handleModalCancel,
  };
}
