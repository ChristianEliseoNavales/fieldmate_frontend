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
  const [errorFields, setErrorFields] = useState({});

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(`${BASE_URL}/companies`);
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
  }, [BASE_URL]);

  const handleContinue = () => setStep(2);
  const handleBack = () => setStep(1);

  const validateStep1 = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = true;
    if (!lastName) newErrors.lastName = true;
    if (!email) newErrors.email = true;
    if (!role) newErrors.role = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
      newErrors.email = true;
      setError("Please enter a valid email address.");
    }

    if (role === "Coordinator") {
      if (!supervisorNumber) {
        newErrors.supervisorNumber = true;
        setError("Admin code is required.");
        setErrorFields(newErrors);
        return false;
      }

      if (supervisorNumber !== import.meta.env.VITE_ADMIN_CODE) {
        newErrors.supervisorNumber = true;
        setError("Invalid admin code.");
        setErrorFields(newErrors);
        return false;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setError((prev) => prev || "Please fill out all required fields.");
      setErrorFields(newErrors);
      return false;
    }

    setError("");
    setErrorFields({});
    return true;
  };


  const validateStep2 = () => {
    const newErrors = {};
    if (!company) newErrors.company = true;
    if (!arrangement) newErrors.arrangement = true;
    if (!password) newErrors.password = true;
    if (!confirmPassword) newErrors.confirmPassword = true;

    if (password && password.length < 8) {
      newErrors.password = true;
      setError("Password must be at least 8 characters.");
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.password = true;
      newErrors.confirmPassword = true;
      setError("Passwords do not match.");
    }

    if (Object.keys(newErrors).length > 0) {
      setError((prev) => prev || "Please fill out all required fields.");
      setErrorFields(newErrors);
      return false;
    }

    setError("");
    setErrorFields({});
    return true;
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!["On-site", "Remote", "Hybrid"].includes(arrangement)) {
      setError("Please select a valid workplace arrangement.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const res = await fetch(`${BASE_URL}/users/register`, {
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
          company,
          arrangement,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        await user.delete();
        throw new Error(data.message || "Failed to register user in backend.");
      }

      navigate("/SignIn");
    } catch (error) {
      console.error("Signup error:", error.message);
      setError(error.message); 
    }
  };

  const onContinue = () => {
    if (validateStep1()) {
      handleContinue();
    }
  };

  const onSignup = () => {
    if (validateStep2()) {
      handleSignup();
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
    onContinue,
    onSignup,

    validateStep1,
    validateStep2,
    error,
    setError,
    errorFields,
    setErrorFields,
  };
}
