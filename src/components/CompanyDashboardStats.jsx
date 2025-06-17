import React from "react";
import useCompanyDashboardStats from "../services/use/useCompanyDashboardStats";

function CompanyDashboardStats({ onDataReady }) {
  const { loading } = useCompanyDashboardStats(onDataReady);

  return loading ? (
    <div className="text-center w-full col-span-3">
      <p className="text-[24px] text-gray-500 animate-pulse">Loading dashboard stats...</p>
    </div>
  ) : null;
}

export default CompanyDashboardStats;
