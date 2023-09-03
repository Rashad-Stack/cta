import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}
export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  // 1) Load the authenticated user
  const { isLoading, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(
    function () {
      // 2) If there is no authenticated user, redirect to the login page
      if (!isLoading && !isAuthenticated) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3) While Loading show a spinner
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl">Loading</h1>
      </div>
    );

  // 4) If there is an authenticated user, render the children
  return children;
}
