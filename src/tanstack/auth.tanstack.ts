import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProfile,
  login,
  signup,
//   completeProfile,
} from "../lib/api/auth.api.js"

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

