import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureAxios from "../secureAxios";

const useCompanyDashboard = (company) => {
  const [interns, setInterns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const internsPerPage = 5;
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleCardNavigation = (buttonLabel) => {
    if (buttonLabel === "Go to Attendance Tracking") navigate("/CompanyAttendance");
    else if (buttonLabel === "Go to Journal Submissions") navigate("/CompanyJournal");
  };

  useEffect(() => {
    if (company) {
      const fetchInterns = async () => {
        try {
          const response = await secureAxios.get(`${BASE_URL}/users`);
          const data = response.data;
          const filtered = data.filter(user => user.role === "Student" && user.company === company);
          setInterns(filtered);
        } catch (err) {
          console.error("Error fetching interns:", err);
        }
      };
      fetchInterns();
    }
  }, [company, BASE_URL]);

  // Reset to page 1 when modal opens
  const resetPagination = () => {
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(interns.length / internsPerPage) || 1;
  const paginatedInterns = interns.slice(
    (currentPage - 1) * internsPerPage,
    currentPage * internsPerPage
  );

  return {
    interns,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedInterns,
    internsPerPage,
    handleCardNavigation,
    resetPagination
  };
};

export default useCompanyDashboard;
