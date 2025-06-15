import React from 'react';
import CompanySidebar from '../PageComponents/CompanySidebar';
import CompanyHeader from '../PageComponents/CompanyHeader';
import Footer from '../PageComponents/footer';

import useCompanyAttendance from '../../services/coordinator/useCompanyAttendance';

function CompanyAttendance() {
  const {
    isSidebarExpanded,
    setIsSidebarExpanded,
    selectedRow,
    setSelectedRow,
    filteredAttendances,
    selectedDate,
    setSelectedDate,
    modalVisible,
    modalAction,
    confirmAction,
    handleModalConfirm,
    handleModalCancel,
  } = useCompanyAttendance();

  return (
    <div className="flex flex-col">
      {/* Sidebar */}
      <CompanySidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      {/* Main area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-[#F5F6FA] min-h-screen`}
      >
        <CompanyHeader isExpanded={isSidebarExpanded} />

        {/* Content */}
        <div className="mt-20 py-12 px-30 bg-[#F5F6FA]">
        {/* Date Picker */}
        <div className="mb-6 max-w-xs relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            onKeyDown={(e) => e.preventDefault()} // prevent manual typing
            className={`w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition appearance-none z-10 relative bg-transparent ${
              !selectedDate ? 'text-transparent' : 'text-gray-700'
            }`}
          />

          {!selectedDate && (
            <span className="absolute left-4 top-3 text-gray-400 pointer-events-none z-0">
              Pick a date
            </span>
          )}
        </div>



          {/* Prompts */}
          {!selectedDate && (
            <p className="text-gray-400 text-xl mt-2 select-none font-medium">
              Select a date to view daily student attendance.
            </p>
          )}

          {selectedDate && filteredAttendances.length === 0 && (
            <p className="text-gray-400 text-center text-xl mt-[30vh] select-none font-medium">
              No attendance record for this date.
            </p>
          )}

          {/* Attendance table */}
          {selectedDate && filteredAttendances.length > 0 && (
            <div className="overflow-x-auto text-[25px] rounded-lg shadow-lg border border-gray-200">
              <table className="min-w-full bg-white rounded-lg border-collapse">
                <thead className="bg-[#1F3463] text-white text-left select-none">
                  <tr>
                    <th className="py-4 pl-15 font-semibold tracking-wide">Name</th>
                    <th className="py-4 px-6 font-semibold tracking-wide">Time&nbsp;In</th>
                    <th className="py-4 px-6 font-semibold tracking-wide">Time&nbsp;Out</th>
                    <th className="py-4 px-6 font-semibold tracking-wide">Total&nbsp;Hours</th>
                    <th className="py-4 px-6" />
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendances.map((record, index) => (
                    <tr
                      key={record._id}
                      onClick={() => setSelectedRow(index)}
                      className={`border-t border-gray-300 cursor-pointer transition-colors duration-200 ${
                        selectedRow === index ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="py-10 px-15 font-medium text-[#556689]">
                        {record.firstName} {record.lastName}
                      </td>
                      <td className="py-4 px-6 text-gray-700">{record.timeIn || '—'}</td>
                      <td className="py-4 px-6 text-gray-700">{record.timeOut || '—'}</td>
                      <td className="py-4 px-6 text-gray-700">{record.hours || '—'}</td>
                      <td className="py-7 px-6 pr-15 flex justify-end items-center gap-4">
                        <button
                          onClick={() => confirmAction(record._id, 'approve')}
                          className="bg-[#64AD70] text-white px-5 py-3 rounded-lg font-semibold shadow-md 
                                     hover:bg-[#4E8F5A] hover:shadow-lg active:scale-[0.97] transition-transform duration-150 ease-in-out"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => confirmAction(record._id, 'deny')}
                          className="bg-[#D84040] text-white px-10 py-3 rounded-lg font-semibold shadow-md 
                                     hover:bg-[#B02A2A] hover:shadow-lg active:scale-[0.97] transition-transform duration-150 ease-in-out"
                        >
                          Deny
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Confirmation modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            <p className="text-[20px] text-center mb-8 text-gray-700 font-medium">
              Are you sure you want to{' '}
              <span className="font-bold text-blue-600">{modalAction}</span>{' '}
              this attendance record?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleModalConfirm}
                className="text-[20px] bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-12 rounded-lg shadow-md transition"
              >
                Yes
              </button>
              <button
                onClick={handleModalCancel}
                className="text-[20px] bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-12 rounded-lg shadow-md transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyAttendance;
