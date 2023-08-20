import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import AuthStorage from "../AuthStorage";
import Navbar from "../Others/Navbar";
import menuAction from "../BtnActions/NavActions";
export default function ProtectedHOC() {
  const isAuthenticated: boolean = AuthStorage.getItem("isAuthenticated");
  const Navigate = useNavigate();
  type arr = { url: string; name: string };
  const navArr: arr[] = [
    { name: "home", url: "/" },
    { name: "profile", url: "/user" },
    { name: "debts", url: "/debt" },
    { name: "reminders", url: "/reminder" },
    { name: "logout", url: "" },
  ];
  useEffect(() => {
    if (!isAuthenticated) Navigate("/landing-page");
  }, [isAuthenticated, Navigate]);

  return (
    <>
      <Navbar menuAction={menuAction} navArr={navArr} />
      <Outlet />
    </>
  );
}
