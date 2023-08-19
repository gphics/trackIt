import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import AuthStorage from "../AuthStorage";
export default function ProtectedHOC() {
  const isAuthenticated: boolean = AuthStorage.getItem("isAuthenticated");
  const Navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) Navigate("/landing-page");
  }, [isAuthenticated, Navigate]);

  return <Outlet />;
}
