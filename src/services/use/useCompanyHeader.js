import useUserData from "./useUserData";

const useCompanyHeader = () => {
  return useUserData({ useCache: true, includeLoading: true });
};

export default useCompanyHeader;
