import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Others/Navbar";
import menuAction from "../BtnActions/NavActions";
import { useSelector } from "react-redux";

export default function ProtectedHOC() {
  const {
    isAuthenticated,
    user: { createdAt, updatedAt },
  } = useSelector((state: any) => state.userSlice);
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
    if (!isAuthenticated) {
      Navigate("/landing-page");
      return;
    }
    if (createdAt && updatedAt) {
      if (createdAt.toString() === updatedAt.toString()) {
        Navigate("/user/update");
        return;
      }
    }
  }, [isAuthenticated, Navigate]);

  return (
    <>
      <Navbar menuAction={menuAction} navArr={navArr} />

      <Outlet />
    </>
  );
}
