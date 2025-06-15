import React from 'react';
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

  const handleView = async (entry) => {
    if (!entry.viewed) {
      await toggleViewed(entry._id, false);
    }
    navigate(`/CompanyViewJournal/${entry._id}`);
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'} bg-[#F5F6FA] min-h-screen`}
      >
        <CompanyHeader isExpanded={isSidebarExpanded} />
        <div className="mt-20 py-12 px-[7.5rem] bg-[#F5F6FA]">
        <div className="mb-6 max-w-xs relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            onKeyDown={(e) => e.preventDefault()} // prevent manual typing
            className={`w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none transition appearance-none z-10 relative bg-transparent ${
              !selectedDate ? 'text-transparent' : 'text-gray-700'
            }`}
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
                  <article
                    key={index}
                    className="bg-white shadow-md rounded-lg border border-gray-300 p-6 flex flex-col justify-between w-full h-[370px] hover:shadow-lg transition-shadow duration-300"
                    role="region"
                    aria-labelledby={`journal-entry-${index}`}
                  >
                    <div className="flex-1 mb-6">
                      <h2
                        id={`journal-entry-${index}`}
                        className={`text-[20px] leading-snug ${entry.viewed ? 'font-medium' : 'font-semibold'} text-gray-900`}
                      >
                        {entry.firstName} {entry.lastName}
                        <br />
                        <time
                          dateTime={new Date(entry.createdAt).toISOString()}
                          className="text-gray-500 text-xs font-normal"
                        >
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
                        aria-pressed={entry.viewed}
                        className="p-1 rounded focus:outline-none"
                      >
                        {entry.viewed ? (
                          <BiEnvelopeOpen
                            size={28}
                            className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                            aria-label="Mark as unread"
                          />
                        ) : (
                          <BiEnvelope
                            size={28}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                            aria-label="Mark as read"
                          />
                        )}
                      </button>

                      {entry.viewed ? (
                        <button
                          onClick={() => handleView(entry)}
                          className="flex items-center gap-2 px-8 py-2 text-gray-800 bg-gray-300 border border-gray-400 rounded-lg text-[20px] hover:bg-gray-400 focus:outline-none transitio cursor-pointer"
                        >
                          View
                        </button>
                      ) : (
                        <button
                          onClick={() => handleView(entry)}
                          className="flex items-center gap-2 px-8 py-2 text-white bg-blue-600 rounded-lg text-[20px] hover:bg-blue-700 focus:outline-none transition cursor-pointer"
                        >
                          View
                        </button>
                      )}

                      <button
                        className="text-gray-800 hover:text-red-600 cursor-pointer p-1 rounded focus:outline-none transition"
                        onClick={() => handleRemove(entry._id)}
                        aria-label="Delete journal entry"
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
    </div>
  );
}

export default CompanyJournal;
