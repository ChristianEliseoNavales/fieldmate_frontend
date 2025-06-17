import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Standardized Pagination Component
 * Format: Page [input_field] of [total_pages]   < [first_page] [current_page] [last_page] >
 */
function StandardPagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "",
  size = "medium" // "small", "medium", "large"
}) {
  const [inputValue, setInputValue] = useState(currentPage.toString());
  const [inputError, setInputError] = useState(false);

  // Update input when currentPage changes externally
  useEffect(() => {
    setInputValue(currentPage.toString());
    setInputError(false);
  }, [currentPage]);

  // Size-based styling
  const sizeStyles = {
    small: {
      container: "text-[16px]",
      input: "w-[50px] h-[32px] text-[14px]",
      button: "w-[32px] h-[32px] text-[14px]",
      spacing: "gap-1"
    },
    medium: {
      container: "text-[18px]",
      input: "w-[60px] h-[36px] text-[16px]",
      button: "w-[36px] h-[36px] text-[16px]",
      spacing: "gap-2"
    },
    large: {
      container: "text-[20px]",
      input: "w-[70px] h-[40px] text-[18px]",
      button: "w-[40px] h-[40px] text-[18px]",
      spacing: "gap-2"
    }
  };

  const styles = sizeStyles[size] || sizeStyles.medium;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Real-time validation
    const numValue = parseInt(value);
    if (value === '' || isNaN(numValue) || numValue < 1 || numValue > totalPages) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      const numValue = parseInt(inputValue);
      if (!isNaN(numValue) && numValue >= 1 && numValue <= totalPages) {
        onPageChange(numValue);
        setInputError(false);
      } else {
        setInputError(true);
        // Reset to current page after a delay
        setTimeout(() => {
          setInputValue(currentPage.toString());
          setInputError(false);
        }, 1500);
      }
    }
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= totalPages) {
      onPageChange(numValue);
      setInputError(false);
    } else {
      // Reset to current page if invalid
      setInputValue(currentPage.toString());
      setInputError(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center ${styles.spacing} ${styles.container} select-none ${className}`}>
      {/* Page X of Y */}
      <div className="flex items-center gap-2">
        <span>Page</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          onBlur={handleInputBlur}
          className={`
            ${styles.input} 
            text-center border rounded 
            ${inputError 
              ? 'border-red-500 bg-red-50 text-red-700' 
              : 'border-gray-300 bg-white text-gray-700'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors duration-200
          `}
          title={inputError ? `Please enter a number between 1 and ${totalPages}` : `Enter page number (1-${totalPages})`}
        />
        <span>of {totalPages}</span>
      </div>

      {/* Navigation buttons */}
      <div className={`flex items-center ${styles.spacing}`}>
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`
            ${styles.button}
            flex items-center justify-center rounded
            ${currentPage === 1 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
            }
            transition-colors duration-200
          `}
          title="Previous page"
        >
          <FaChevronLeft />
        </button>

        {/* First page */}
        <button
          onClick={handleFirstPage}
          className={`
            ${styles.button}
            flex items-center justify-center rounded font-medium
            ${currentPage === 1 
              ? 'bg-blue-600 text-white cursor-default' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
            }
            transition-colors duration-200
          `}
          title="Go to first page"
        >
          1
        </button>

        {/* Current page (if not first or last) */}
        {currentPage !== 1 && currentPage !== totalPages && (
          <button
            className={`
              ${styles.button}
              flex items-center justify-center rounded font-medium
              bg-blue-600 text-white cursor-default
            `}
            title={`Current page: ${currentPage}`}
          >
            {currentPage}
          </button>
        )}

        {/* Last page (if more than 1 page) */}
        {totalPages > 1 && (
          <button
            onClick={handleLastPage}
            className={`
              ${styles.button}
              flex items-center justify-center rounded font-medium
              ${currentPage === totalPages 
                ? 'bg-blue-600 text-white cursor-default' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
              }
              transition-colors duration-200
            `}
            title="Go to last page"
          >
            {totalPages}
          </button>
        )}

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`
            ${styles.button}
            flex items-center justify-center rounded
            ${currentPage === totalPages 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
            }
            transition-colors duration-200
          `}
          title="Next page"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Error message */}
      {inputError && (
        <div className="absolute mt-12 text-red-600 text-sm bg-white border border-red-300 rounded px-2 py-1 shadow-lg">
          Enter a number between 1 and {totalPages}
        </div>
      )}
    </div>
  );
}

export default StandardPagination;
