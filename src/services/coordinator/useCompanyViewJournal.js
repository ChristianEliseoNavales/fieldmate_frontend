import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const useCompanyViewJournal = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [journalContent, setJournalContent] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const journalContentRef = useRef(null);
  const { id } = useParams();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournalById = async () => {
      try {
        const res = await axios.get(`${baseURL}/journal/${id}`);
        if (res.status === 200) {
          const journal = res.data;
          setFirstName(journal.firstName);
          setLastName(journal.lastName);
          setJournalContent(journal.content);
          setCreatedAt(journal.createdAt);
        } else {
          navigate('/CompanyJournal');
        }
      } catch (error) {
        console.error('Error fetching journal by ID:', error);
        navigate('/CompanyJournal');
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };

    fetchJournalById();
  }, [id, baseURL, navigate]);

  const handleBackClick = () => {
    navigate('/CompanyJournal');
  };

  return {
    isSidebarExpanded,
    setIsSidebarExpanded,
    journalContent,
    firstName,
    lastName,
    createdAt,
    loading,
    journalContentRef,
    handleBackClick,
  };
};

export default useCompanyViewJournal;
