import React, { useState } from "react";
import AdminSidebar from "../PageComponents/AdminSidebar";
import AdminHeader from "../PageComponents/AdminHeader";
import { FiTrash2 } from "react-icons/fi";
import { LuPenLine } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCompanyService } from "../../services/admin/companyService";

function CompanyList() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const {
    companyName,
    setCompanyName,
    companies,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    selectedCompany,
    setSelectedCompany,
    editedName,
    setEditedName,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    paginatedCompanies,
    handleAddCompany,
    handleDelete,
    handleEdit,
    message,
    messageType,
  } = useCompanyService();

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <AdminSidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        }`}
      >
        <AdminHeader isExpanded={isSidebarExpanded} />

        <div className="flex items-center justify-center gap-10 px-8 h-screen">
          {/* Add Company Form */}
          <div className="bg-white w-[687px] h-fit border border-[#E5E7EB] rounded-xl p-6 shadow-md h-[518px]">
            <h2 className="text-[32px] text-center font-bold mb-6 text-[#1F2937]">Add Company</h2>
            <label className="block text-[20px] mb-2 text-[#374151] font-medium">Enter Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="border border-[#D1D5DB] rounded-lg w-full h-[61px] px-4 py-2 mb-4 text-[18px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
              placeholder="Company name"
            />
            {message && (
              <div
                className={`text-[18px] mb-4 font-medium ${
                  messageType === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}
            <button
              onClick={handleAddCompany}
              className="bg-[#1E3A8A] hover:bg-[#162e72] text-white px-7 py-3 rounded-lg text-[20px] font-semibold transition-transform hover:scale-[1.02]"
            >
              Add
            </button>
          </div>

          {/* Company Table */}
          <div className="flex-1">
            <table className="w-full h-[518px] border border-[#E5E7EB] border-collapse rounded-xl overflow-hidden shadow-sm bg-white">
              <thead>
                <tr className="bg-[#1F3463] text-white text-[22px] font-semibold">
                  <th className="p-5">
                    <div className="flex justify-between w-full">
                      <span className="w-[80px] text-center">#</span>
                      <span className="w-[350px] text-center">Recently Added Company</span>
                      <span className="w-[160px] text-center"></span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.length === 0 ? (
                  [...Array(pageSize)].map((_, idx) => (
                    <tr key={idx} className="border-b last:border-none">
                      <td className="py-4 text-center text-gray-400 text-[18px]">
                        {idx === 2 ? "No Companies Found." : ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  [...Array(pageSize)].map((_, idx) => {
                    const company = paginatedCompanies[idx];
                    return (
                      <tr
                        key={company?._id || `empty-${idx}`}
                        className="border-b hover:bg-[#F3F4F6] transition"
                        style={{ height: "61px" }}
                      >
                        <td>
                          {company ? (
                            <div className="flex items-center justify-between w-full px-6 text-[20px] text-[#374151] font-medium">
                              <div className="w-[80px] text-center truncate">
                                {(currentPage - 1) * pageSize + idx + 1}
                              </div>
                              <div className="w-[300px] text-center truncate">{company.name}</div>
                              <div className="w-[160px] flex justify-center gap-6 text-[#0059AB]">
                                <LuPenLine
                                  size={26}
                                  className="cursor-pointer hover:text-[#023e7d]"
                                  onClick={() => {
                                    setSelectedCompany(company);
                                    setEditedName(company.name);
                                    setEditModalOpen(true);
                                  }}
                                />
                                <FiTrash2
                                  size={26}
                                  className="cursor-pointer text-red-500 hover:text-red-600"
                                  onClick={() => {
                                    setSelectedCompany(company);
                                    setDeleteModalOpen(true);
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div style={{ height: "61px" }}></div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {companies.length > pageSize && (
              <div className="mt-6 flex justify-center gap-4 text-[20px]">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 bg-[#E0E0E0] rounded-full hover:bg-[#D0D0D0] disabled:opacity-40"
                >
                  <FaChevronLeft />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 bg-[#E0E0E0] rounded-full hover:bg-[#D0D0D0] disabled:opacity-40"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>

          {/* Delete Modal */}
          {deleteModalOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
              <div className="bg-white p-10 rounded-xl shadow-lg w-[550px] text-center">
                <p className="mb-6 text-[24px] text-[#374151] font-medium">
                  Are you sure you want to <span className="font-bold text-red-500">DELETE</span> this company?
                </p>
                <div className="flex justify-center text-[18px] gap-4">
                  <button
                    onClick={handleDelete}
                    className="px-5 py-2 bg-[#64AD70] text-white rounded-lg w-[140px] hover:brightness-90 transition"
                  >
                    YES
                  </button>
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    className="px-5 py-2 bg-[#D84040] text-white rounded-lg w-[140px] hover:brightness-90 transition"
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {editModalOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
              <div className="bg-white p-10 rounded-xl shadow-lg w-[687px]">
                <p className="text-[30px] font-bold mb-4 text-center text-[#1F2937]">Edit Company</p>
                <p className="text-[20px] font-medium mb-3 text-[#374151]">Rename Company:</p>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border border-[#D1D5DB] px-4 py-2 w-full mb-6 rounded-lg bg-white h-[61px] text-[18px] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
                  placeholder="New company name"
                />
                <div className="flex justify-center gap-4 text-[18px] font-medium">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 border border-[#D1D5DB] bg-[#F3F4F6] rounded-lg w-1/2 hover:bg-[#E5E7EB] transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-[#1E3A8A] text-white rounded-lg w-1/2 hover:bg-[#162e72] transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyList;
