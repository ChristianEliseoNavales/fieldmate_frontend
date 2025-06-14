import { useState, useEffect } from "react";
import secureAxios from "../../services/secureAxios"; // adjust path if needed

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const pageSize = 5;

export function useCompanyService() {
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const totalPages = Math.ceil(companies.length / pageSize);

  useEffect(() => {
    fetchCompanies();
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
      const newCompany = res.data;              // ← contains createdAt

      // 1️⃣ Put it at the VERY BEGINNING
      setCompanies(prev => [newCompany, ...prev]);

      // (optional) reset UI
      setCompanyName("");
      setCurrentPage(1);  // jump back to first page
      setMessage("Company added!");
      setMessageType("success");
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
    } catch (err) {
      setMessage("Failed to delete company.");
      setMessageType("error");
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
    } catch (err) {
      setMessage("Failed to update company.");
      setMessageType("error");
    }
  }

  const paginatedCompanies = companies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDeleteAllCompanies = async () => {
  if (!confirm("Are you sure you want to delete ALL companies?")) return;

  try {
    const res = await secureAxios.delete(`${BASE_URL}/companies/deleteAll`);
    setCompanies([]); // Clear UI list
    setMessage("All companies deleted successfully.");
    setMessageType("success");
  } catch (err) {
    console.error("Failed to delete all companies:", err);
    setMessage("Failed to delete all companies.");
    setMessageType("error");
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
    handleAddCompany,
    handleDelete,
    handleEdit,
    message,
    messageType,
    handleDeleteAllCompanies,
  };
}
