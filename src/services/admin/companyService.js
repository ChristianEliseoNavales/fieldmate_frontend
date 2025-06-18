import { useState, useEffect } from "react";
import secureAxios from "../../services/secureAxios"; 

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const pageSize = 5;

export function useCompanyService() {
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [companiesWithReferences, setCompaniesWithReferences] = useState([]);

  const totalPages = Math.ceil(companies.length / pageSize);

  useEffect(() => {
    fetchCompaniesWithReferences();
  }, []);

  async function fetchCompanies() {
    try {
      const res = await secureAxios.get(`${BASE_URL}/companies`);
      setCompanies(res.data);
    } catch (err) {
      setMessage("Failed to load companies.");
      setMessageType("error");
    }
  }

  async function fetchCompaniesWithReferences() {
    try {
      const res = await secureAxios.get(`${BASE_URL}/companies/with-references`);
      setCompanies(res.data);
      setCompaniesWithReferences(res.data);
    } catch (err) {
      setMessage("Failed to load companies.");
      setMessageType("error");
    }
  }

  async function checkCompanyReferences(companyName) {
    try {
      const res = await secureAxios.get(`${BASE_URL}/companies/${encodeURIComponent(companyName)}/references`);
      return res.data;
    } catch (err) {
      console.error("Failed to check company references:", err);
      return { isReferenced: false, userCount: 0, users: [] };
    }
  }

  async function handleAddCompany() {
    const trimmedName = companyName.trim();

    if (!trimmedName) {
      setMessage("Company name cannot be empty.");
      setMessageType("error");
      return;
    }

    try {
      const res = await secureAxios.post(`${BASE_URL}/companies`, {
        name: trimmedName,
      });

      // (optional) reset UI
      setCompanyName("");
      setCurrentPage(1);  // jump back to first page
      setMessage("Company added!");
      setMessageType("success");

      // Refresh the companies with references
      fetchCompaniesWithReferences();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add.");
      setMessageType("error");
    }
  }

  async function handleDelete() {
    if (!selectedCompany) return;

    try {
      await secureAxios.delete(`${BASE_URL}/companies/${selectedCompany._id}`);
      setCompanies((prev) =>
        prev.filter((c) => c._id !== selectedCompany._id)
      );
      setDeleteModalOpen(false);
      setMessage("Company deleted successfully.");
      setMessageType("success");
      // Refresh the companies with references
      fetchCompaniesWithReferences();
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.isReferenced) {
        const { userCount, users } = err.response.data;
        setMessage(`Cannot delete company. It is currently assigned to ${userCount} user(s): ${users.map(u => `${u.firstName} ${u.lastName}`).join(', ')}`);
      } else {
        setMessage(err.response?.data?.message || "Failed to delete company.");
      }
      setMessageType("error");
      setDeleteModalOpen(false);
    }
  }

  async function handleEdit() {
    if (!selectedCompany) return;

    try {
      const res = await secureAxios.patch(`${BASE_URL}/companies/${selectedCompany._id}`, {
        name: editedName,
      });

      setCompanies((prev) =>
        prev.map((c) =>
          c._id === selectedCompany._id ? { ...c, name: res.data.name } : c
        )
      );
      setEditModalOpen(false);
      setMessage("Company updated successfully.");
      setMessageType("success");
      // Refresh the companies with references
      fetchCompaniesWithReferences();
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.isReferenced) {
        const { userCount, users } = err.response.data;
        setMessage(`Cannot edit company. It is currently assigned to ${userCount} user(s): ${users.map(u => `${u.firstName} ${u.lastName}`).join(', ')}`);
      } else {
        setMessage(err.response?.data?.message || "Failed to update company.");
      }
      setMessageType("error");
      setEditModalOpen(false);
    }
  }

  const paginatedCompanies = companies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDeleteAllCompanies = () => {
    setDeleteAllModalOpen(true);
  };

  const confirmDeleteAllCompanies = async () => {
    try {
      const res = await secureAxios.delete(`${BASE_URL}/companies/deleteAll`);

      if (res.data.deletedCount === 0) {
        setMessage("No companies were deleted. All companies are currently assigned to users.");
        setMessageType("error");
      } else {
        setMessage(`${res.data.deletedCount} unreferenced companies deleted successfully. ${res.data.remainingCompanies} companies remain.`);
        setMessageType("success");
      }

      setDeleteAllModalOpen(false);
      // Refresh the companies list
      fetchCompaniesWithReferences();
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage(err.response.data.message);
        setMessageType("error");
      } else {
        console.error("Failed to delete companies:", err);
        setMessage("Failed to delete companies.");
        setMessageType("error");
      }
      setDeleteAllModalOpen(false);
    }
  };

  return {
    companyName,
    setCompanyName,
    companies,
    setCompanies,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    deleteAllModalOpen,
    setDeleteAllModalOpen,
    selectedCompany,
    setSelectedCompany,
    editedName,
    setEditedName,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    paginatedCompanies,
    fetchCompanies,
    fetchCompaniesWithReferences,
    checkCompanyReferences,
    companiesWithReferences,
    handleAddCompany,
    handleDelete,
    handleEdit,
    message,
    messageType,
    handleDeleteAllCompanies,
    confirmDeleteAllCompanies,
  };
}
