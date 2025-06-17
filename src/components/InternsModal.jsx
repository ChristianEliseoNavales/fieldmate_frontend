import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import StandardPagination from "./StandardPagination";

function InternsModal({ isVisible, onClose, companyName, interns = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Optimal for modal display

  if (!isVisible) return null;

  // Calculate pagination values
  const totalPages = Math.ceil(interns.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInterns = interns.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when modal opens or interns change
  React.useEffect(() => {
    if (isVisible) {
      setCurrentPage(1);
    }
  }, [isVisible, interns.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white w-[647px] max-h-[80vh] p-6 rounded-xl relative flex flex-col shadow-xl">
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="text-black text-xl hover:text-gray-600 transition-colors cursor-pointer"
            title="Close modal"
          >
            <FaArrowLeft />
          </button>
          <div className="text-sm text-gray-500">
            {interns.length} {interns.length === 1 ? 'intern' : 'interns'} total
          </div>
        </div>

        {/* Company name header */}
        <div className="bg-[#2D0F7F] text-white text-[40px] font-bold text-center py-3 rounded mb-4 shadow-md">
          {companyName}
        </div>

        {/* Content area */}
        <div className="flex-1 min-h-[300px] mb-4">
          {interns.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-xl">
              No interns found for this company
            </div>
          ) : (
            <ul className="space-y-3 text-[25px]">
              {paginatedInterns.map((name, index) => (
                <li key={startIndex + index} className="flex items-center gap-4 border-t border-b pb-2 hover:bg-gray-50 transition-colors rounded px-2">
                  <div className="w-15 h-15 bg-[#2D0F7F] text-white font-bold flex items-center justify-center rounded shadow-sm">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <span className="font-semibold text-gray-800">{name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pagination - only show if there are multiple pages */}
        {totalPages > 1 && (
          <div className="border-t pt-4">
            <StandardPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              size="medium"
              className="text-[18px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InternsModal;
