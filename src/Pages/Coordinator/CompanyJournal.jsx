import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BiEnvelope, BiEnvelopeOpen } from 'react-icons/bi';
import CompanySidebar from '../PageComponents/CompanySidebar';
import CompanyHeader from '../PageComponents/CompanyHeader';
import Footer from '../PageComponents/footer';
import { useCompanyJournal } from '../../services/coordinator/useCompanyJournal';

function CompanyJournal() {
  const {
    isSidebarExpanded,
    setIsSidebarExpanded,
    filteredJournals,
    selectedDate,
    setSelectedDate,
    loading,
    toggleViewed,
    handleRemove,
  } = useCompanyJournal();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleView = async (entry) => {
    if (!entry.viewed) {
      await toggleViewed(entry._id, false);
    }
    navigate(`/CompanyViewJournal/${entry._id}`);
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    handleRemove(selectedId);
    setShowModal(false);
    setSelectedId(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'} bg-[#F5F6FA] min-h-screen`}>
        <CompanyHeader isExpanded={isSidebarExpanded} />
        <div className="mt-20 py-12 px-[7.5rem] bg-[#F5F6FA]">
          <div className="mb-6 max-w-xs relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              onKeyDown={(e) => e.preventDefault()}
              className={`w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none transition appearance-none z-10 relative bg-transparent ${!selectedDate ? 'text-transparent' : 'text-gray-700'}`}
            />
            {!selectedDate && (
              <span className="absolute left-4 top-3 text-gray-400 pointer-events-none z-0">
                Pick a date
              </span>
            )}
          </div>

          {!selectedDate ? (
            <p className="text-gray-500 text-xl select-none">Select a date to view daily journal submissions.</p>
          ) : filteredJournals.length === 0 ? (
            <p className="text-gray-400 text-center text-xl mt-[30vh] select-none font-medium">
              No journal entries found for this date.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-5 gap-6 min-w-[1400px]">
                {filteredJournals.map((entry, index) => (
                  <article key={index} className="bg-white shadow-md rounded-lg border border-gray-300 p-6 flex flex-col justify-between w-full h-[370px] hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-1 mb-6">
                      <h2 className={`text-[20px] leading-snug ${entry.viewed ? 'font-medium' : 'font-semibold'} text-gray-900`}>
                        {entry.firstName} {entry.lastName}
                        <br />
                        <time className="text-gray-500 text-xs font-normal">
                          {new Date(entry.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric',
                          })}
                        </time>
                      </h2>
                    </div>
                    <div className="flex justify-between items-center border-t-2 border-gray-300 pt-3">
                      <button
                        onClick={() => toggleViewed(entry._id, entry.viewed)}
                        title={entry.viewed ? 'Mark as unread' : 'Mark as read'}
                        className="p-1 rounded focus:outline-none"
                      >
                        {entry.viewed ? (
                          <BiEnvelopeOpen size={28} className="text-gray-700 hover:text-gray-900 transition-colors" />
                        ) : (
                          <BiEnvelope size={28} className="text-blue-600 hover:text-blue-800 transition-colors" />
                        )}
                      </button>

                      <button
                        onClick={() => handleView(entry)}
                        className={`flex items-center gap-2 px-8 py-2 rounded-lg text-[20px] focus:outline-none transition cursor-pointer ${
                          entry.viewed
                            ? 'bg-gray-300 text-gray-800 hover:bg-gray-400 border border-gray-400'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        View
                      </button>

                      <button
                        className="text-gray-800 hover:text-red-600 p-1 transition"
                        onClick={() => confirmDelete(entry._id)}
                      >
                        <FaRegTrashAlt size={26} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
            <p className="text-center text-gray-600 text-[20px] mb-6">Are you sure you want to <strong>DELETE</strong> this journal entry?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="text-[20px] bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-12 rounded-lg shadow-md transition cursor-pointer"
              >
                YES
              </button>
              <button
                onClick={handleCancelDelete}
                className="text-[20px] bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-12 rounded-lg shadow-md transition cursor-pointer"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyJournal;
