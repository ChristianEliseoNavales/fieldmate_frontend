import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function useCreateAccount() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");
  const [supervisorNumber, setSupervisorNumber] = useState("");

  const [company, setCompany] = useState("");
  const [arrangement, setArrangement] = useState("On-site");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companies, setCompanies] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(`${baseURL}/companies`);
        const data = await res.json();
        setCompanies(data);
        if (data.length > 0) {
          setCompany(data[0].name);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };
    fetchCompanies();
  }, [baseURL]);

  const handleContinue = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!["On-site", "Remote", "Hybrid"].includes(arrangement)) {
      alert("Please select a valid workplace arrangement.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const res = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          firstName,
          lastName,
          email,
          role,
          supervisorNumber: role === "Coordinator" ? supervisorNumber : "",
          company,
          arrangement,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        await user.delete(); // Cleanup on failure
        throw new Error(data.message || "Failed to register user in backend.");
      }

      navigate("/SignIn");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

  const login = () => navigate("/SignIn");

  return {
    step,
    showPassword,
    showConfirmPassword,
    firstName,
    lastName,
    email,
    role,
    supervisorNumber,
    company,
    arrangement,
    password,
    confirmPassword,
    companies,

    setShowPassword,
    setShowConfirmPassword,
    setFirstName,
    setLastName,
    setEmail,
    setRole,
    setSupervisorNumber,
    setCompany,
    setArrangement,
    setPassword,
    setConfirmPassword,

    handleContinue,
    handleBack,
    handleSignup,
    login,

    error,
    setError,
  };
}
