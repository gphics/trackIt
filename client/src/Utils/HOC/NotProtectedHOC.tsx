import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import AuthStorage from "../AuthStorage";
import Navbar from "../Others/Navbar";
import menuAction from "../BtnActions/NavActions";
export default function NotProtectedHOC() {
  const isAuthenticated: boolean = AuthStorage.getItem("isAuthenticated");
  type arr = { url: string; name: string };
  const navArr: arr[] = [
    { name: "home", url: "/landing-page" },
    { name: "login", url: "/landing-page/login" },
    { name: "register", url: "/landing-page/register" },
  ];
  const Navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) Navigate("/");
  }, [isAuthenticated, Navigate]);

  return (
    <>
      <Navbar navArr={navArr} menuAction={menuAction} />
      <Outlet />;
    </>
  );
}
