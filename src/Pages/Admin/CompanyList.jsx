import React, { useState } from "react";
import AdminSidebar from "../PageComponents/AdminSidebar";
import AdminHeader from "../PageComponents/AdminHeader";
import { FiTrash2 } from "react-icons/fi";
import { LuPenLine } from "react-icons/lu";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { useCompanyService } from "../../services/admin/companyService";

/**
 * The component keeps the same visual palette but improves two UX issues:
 * 1. Prevents layout shift when pagination appears by always reserving space for it.
 * 2. Row borders now render **only** for rows that actually contain data, so empty
 *    placeholder rows stay visually blank until filled.
 */
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
    handleDeleteAllCompanies,
    handleEdit,
    message,
    messageType,
  } = useCompanyService();

  /* ---------- helpers ---------- */
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F8]">
      <AdminSidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        }`}
      >
        <AdminHeader isExpanded={isSidebarExpanded} />

        <div className="flex items-center justify-center gap-10 px-8 h-screen">
          {/* ---------------- Add Company Form ---------------- */}
          <div className="bg-white w-[687px] h-fit border border-[#E5E7EB] rounded-xl p-6 shadow-md h-[518px]">
            <h2 className="text-[32px] text-center font-bold mb-6 text-[#1F2937]">
              Add Company
            </h2>
            <label className="block text-[20px] mb-2 text-[#374151] font-medium">
              Enter Company Name:
            </label>
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

          {/* ---------------- Company Table & Pagination Wrapper ---------------- */}
          <div className="flex-1">
            <div className="flex flex-col">
              {/* ---------------- Company Table ---------------- */}
              <table className="w-full h-[518px] border border-[#E5E7EB] border-collapse rounded-xl overflow-hidden shadow-lg bg-white">
                <thead>
                  <tr className="bg-[#1F3463] text-white text-[22px] font-semibold">
                    <th className="p-5">
                      <div className="flex justify-around items-center w-full">
                        <span className="w-[350px] text-start">
                          Recently Added Company
                        </span>
                        <button
                          onClick={handleDeleteAllCompanies}
                          className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded text-[18px] cursor-pointer flex items-center gap-2"
                        >
                          Delete All <FiTrash2 />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length === 0
                    ? [...Array(pageSize)].map((_, idx) => (
                        <tr key={idx} style={{ height: "61px" }}>
                          <td className="text-center text-gray-400 text-[18px]">
                            {idx === 2 ? "No Companies Found." : "\u00A0"}
                          </td>
                        </tr>
                      ))
                    : [...Array(pageSize)].map((_, idx) => {
                        const company = paginatedCompanies[idx];
                        return (
                          <tr
                            key={company?._id || `empty-${idx}`}
                            className={`transition ${
                              company ? "border-b hover:bg-[#F3F4F6]" : ""
                            }`}
                            style={{ height: "61px" }}
                          >
                            <td>
                              {company ? (
                                <div className="flex items-center justify-around w-full px-6 text-[20px] text-[#374151] font-medium">
                                  <div className="w-[300px] text-start truncate">
                                    {company.name}
                                  </div>
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
                                <span className="invisible">placeholder</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>

              {/* ---------------- Pagination (space always reserved) ---------------- */}
              <div className="h-[72px] flex justify-center items-center">
                {companies.length > pageSize && (
                  <div className="flex gap-2 text-[20px] select-none">
                    {/* Prev */}
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 disabled:opacity-40 cursor-pointer"
                    >
                      <FaChevronLeft />
                    </button>

                    {/* First */}
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="p-2 disabled:opacity-40 cursor-pointer"
                    >
                      <FaAngleDoubleLeft />
                    </button>

                    {/* Page numbers (show up to 3 around current) */}
                    {pageNumbers
                      .filter(
                        (num) =>
                          num === 1 ||
                          num === totalPages ||
                          Math.abs(num - currentPage) <= 1
                      )
                      .map((num) => (
                        <button
                          key={num}
                          onClick={() => setCurrentPage(num)}
                          className={`px-3 py-1 rounded-full w-[40px] cursor-pointer ${
                            num === currentPage
                              ? "font-semibold text-white bg-[#1E3A8A]"
                              : "bg-[#E0E0E0] hover:bg-[#D0D0D0]"
                          }`}
                        >
                          {num}
                        </button>
                      ))}

                    {/* Last */}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-2 disabled:opacity-40 cursor-pointer"
                    >
                      <FaAngleDoubleRight />
                    </button>

                    {/* Next */}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 disabled:opacity-40 cursor-pointer"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ---------------- Delete Modal ---------------- */}
          {deleteModalOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
              <div className="bg-white p-10 rounded-xl shadow-lg w-[550px] text-center">
                <p className="mb-6 text-[24px] text-[#374151] font-medium">
                  Are you sure you want to{" "}
                  <span className="font-bold text-red-500">DELETE</span> this
                  company?
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

          {/* ---------------- Edit Modal ---------------- */}
          {editModalOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
              <div className="bg-white p-10 rounded-xl shadow-lg w-[687px]">
                <p className="text-[30px] font-bold mb-4 text-center text-[#1F2937]">
                  Edit Company
                </p>
                <p className="text-[20px] font-medium mb-3 text-[#374151]">
                  Rename Company:
                </p>
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
