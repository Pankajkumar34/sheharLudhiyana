import { useProfile } from "../tanstack/auth.tanstack";


type User = {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
  role: string;
  status: string;
  isProfileCompleted: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  businessCategory: string | null;
  socialLogin: {
    provider: string;
    socialId: string;
  };
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
};

type AuthHook = {
  user?: User;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const useAuth = (): AuthHook => {
  const { data, isLoading } = useProfile();
console.log(data,"ppp")
  return {
    user: data,
    isAuthenticated: Boolean(data),
    isLoading,
  };
};