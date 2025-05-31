import React, { useState } from 'react';
import AdminSidebar from '../PageComponents/AdminSidebar';
import AdminHeader from '../PageComponents/AdminHeader';
import { LuUser, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from '../PageComponents/footer';
import Skeleton from '../../components/Skeleton';
import useAdminInfo from '../../services/admin/useAdminInfo';
import useDashboardStats from '../../services/admin/useDashboardStats';
import groupCoordinatorsByCompany from '../../services/admin/groupCoordinatorsByCompany';

function AdminDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [showCoordinators, setShowCoordinators] = useState(false);
  const [selectedCoordinatorGroup, setSelectedCoordinatorGroup] = useState(null);

  const [companyPage, setCompanyPage] = useState(1);
  const [coordinatorPage, setCoordinatorPage] = useState(1);
  const itemsPerPage = 10;

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { firstName, lastName } = useAdminInfo(BASE_URL);
  const { companies, coordinators, loading } = useDashboardStats(BASE_URL);

  const groupedCoordinators = groupCoordinatorsByCompany(coordinators);

  return (
    <div className="flex min-h-screen bg-[#F4F6F8]">
      <AdminSidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        }`}
      >
        <AdminHeader isExpanded={isSidebarExpanded} firstName={firstName} />
        <div className="flex-1 flex flex-col">
          <div className="mt-25 px-5">
            <div className="bg-white p-5 rounded-[10px] shadow-sm flex items-center justify-between border border-[#D9D9D9]">
              <div className="flex items-center gap-4 h-[118px]">
                <div className="flex items-center justify-center text-[#1E3A8A]">
                  <LuUser size={65} />
                </div>
                <div>
                  <div className="text-[33px] font-semibold text-gray-800">
                    {loading ? <Skeleton width="200px" height="36px" /> : `Hello, ${firstName || "Admin"}!`}
                  </div>
                  <p className="text-[20px] text-gray-600">Admin</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 grid grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-[10px] shadow-sm border border-[#D9D9D9] text-center">
                <p className="text-[24px] font-semibold text-gray-800">Total Number of Companies</p>
                <div className="flex justify-center items-center h-[205px] text-[140px] font-bold text-[#006fd6] mt-4 bg-[#FAFAFA] rounded-[8px] border border-[#D9D9D9]">
                  {loading ? <Skeleton width="120px" height="150px" /> : companies.length}
                </div>
              </div>

              <div className="bg-white p-6 rounded-[10px] shadow-sm border border-[#D9D9D9] text-center">
                <p className="text-[24px] font-semibold text-gray-800">Total Number of Company Coordinators</p>
                <div className="flex justify-center items-center h-[205px] text-[140px] font-bold text-[#006fd6] mt-4 bg-[#FAFAFA] rounded-[8px] border border-[#D9D9D9]">
                  {loading ? <Skeleton width="120px" height="150px" /> : coordinators.length}
                </div>
              </div>
            </div>

            {/* Company List Section */}
            <div className="bg-white p-4 rounded-[10px] shadow-sm border border-[#D9D9D9] relative h-full flex flex-col justify-between">
              <p className="bg-[#243D73] text-white text-[22px] font-semibold p-4 rounded mb-4">Company List</p>

              <div className="flex-1">
                <ul className="space-y-2 text-[20px] text-gray-800">
                  {loading ? (
                    <Skeleton width="90%" height="30px" />
                  ) : (
                    companies
                      .slice((companyPage - 1) * itemsPerPage, companyPage * itemsPerPage)
                      .map((c, idx) => (
                        <li className="mx-4 pb-2 border-b border-[#E0E0E0]" key={c._id}>
                          {(companyPage - 1) * itemsPerPage + idx + 1}. {c.name}
                        </li>
                      ))
                  )}
                </ul>
              </div>

              {companies.length > itemsPerPage && !loading && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 text-[20px] mb-5">
                  <button
                    onClick={() => setCompanyPage((prev) => prev - 1)}
                    disabled={companyPage === 1}
                    className="p-2 bg-[#E0E0E0] rounded-full hover:bg-[#D0D0D0] disabled:opacity-40"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => setCompanyPage((prev) => prev + 1)}
                    disabled={companyPage * itemsPerPage >= companies.length}
                    className="p-2 bg-[#E0E0E0] rounded-full hover:bg-[#D0D0D0] disabled:opacity-40"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>


            {/* Coordinators Section */}
            <div className="bg-white rounded-[10px] shadow-sm border border-[#D9D9D9]">
              <div
                className="flex justify-between bg-[#F8F8F8] items-center cursor-pointer border-b border-[#D9D9D9] rounded-t-lg"
                onClick={() => {
                  if (selectedCoordinatorGroup) {
                    setSelectedCoordinatorGroup(null);
                    setShowCoordinators(true);
                  } else {
                    setShowCoordinators((prev) => !prev);
                  }
                }}

              >
                <p className="text-[22px] font-semibold text-gray-800 p-6">
                  {selectedCoordinatorGroup ? `${selectedCoordinatorGroup} Coordinator` : 'Company Coordinator'}
                </p>
                {showCoordinators ? <LuChevronUp size={30} className="mr-6" /> : <LuChevronDown size={30} className="mr-6" />}
              </div>

              {showCoordinators && (
                <ul className="text-[20px] text-gray-700">
                  {Object.keys(groupedCoordinators).map((group, idx) => (
                    <li
                      key={idx}
                      className="border-b px-4 py-3 hover:bg-[#F0F0F0] transition cursor-pointer"
                      onClick={() => {
                        setSelectedCoordinatorGroup(group);
                        setCoordinatorPage(1);
                        setShowCoordinators(false);
                      }}
                    >
                      {group} Coordinator
                    </li>
                  ))}
                </ul>
              )}

              {selectedCoordinatorGroup && (
                <div className="p-4 pl-8 text-[18px] space-y-2 bg-[#FAFAFA] border-t border-[#E0E0E0]">
                  {groupedCoordinators[selectedCoordinatorGroup]
                    .slice((coordinatorPage - 1) * itemsPerPage, coordinatorPage * itemsPerPage)
                    .map((name, idx) => (
                      <p key={idx}>
                        {(coordinatorPage - 1) * itemsPerPage + idx + 1}. {name}
                      </p>
                    ))}

                  {groupedCoordinators[selectedCoordinatorGroup].length > itemsPerPage && (
                    <div className="flex justify-center gap-6 mt-4 text-[16px]">
                      <button
                        onClick={() => setCoordinatorPage((prev) => prev - 1)}
                        disabled={coordinatorPage === 1}
                        className="p-2 bg-[#E0E0E0] rounded-full hover:bg-[#D0D0D0] disabled:opacity-40"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={() => setCoordinatorPage((prev) => prev + 1)}
                        disabled={
                          coordinatorPage * itemsPerPage >=
                          groupedCoordinators[selectedCoordinatorGroup].length
                        }
                        className="p-2 bg-[#E0E0E0] rounded-full hover:bg-[#D0D0D0] disabled:opacity-40"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AdminDashboard;
