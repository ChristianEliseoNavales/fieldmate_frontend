import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRecentRole = (rolePath) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("recentRole", rolePath);
  }, [rolePath]);

  const arrowBack = () => {
    navigate(-1);
  };

  return {
    arrowBack
  };
};

export default useRecentRole;
