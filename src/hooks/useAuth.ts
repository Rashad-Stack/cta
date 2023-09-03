import { useState } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../types";

export default function useAuth() {
  const { isLoggedIn, currentUser } = useSelector(
    (state: rootState) => state.users,
  );

  const [isLoading] = useState<boolean>(false);
  const [isAuthenticated] = useState<boolean>(isLoggedIn);
  return {
    isLoading,
    isAuthenticated,
    currentUser,
  };
}
