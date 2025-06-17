import useUserData from "./useUserData";

const useUserProfile = () => {
  return useUserData({ useCache: false, includeLoading: false });
};

export default useUserProfile;
