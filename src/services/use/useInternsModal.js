import { useState, useEffect } from "react";

const useInternsModal = (isVisible, interns = []) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Optimal for modal display

  // Calculate pagination values
  const totalPages = Math.ceil(interns.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInterns = interns.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when modal opens or interns change
  useEffect(() => {
    if (isVisible) {
      setCurrentPage(1);
    }
  }, [isVisible, interns.length]);

  return {
    currentPage,
    totalPages,
    startIndex,
    paginatedInterns,
    handlePageChange
  };
};

export default useInternsModal;
