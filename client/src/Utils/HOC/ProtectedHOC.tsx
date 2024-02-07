import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Others/Navbar";
import menuAction from "../BtnActions/NavActions";
import { useSelector } from "react-redux";
import cookieOps from "../AuthStorage/cookieStore";

export default function ProtectedHOC() {
  const location = useLocation();
  const { user } = useSelector((state: any) => state.userSlice);
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
    const isAuth = cookieOps.isAuth();
    if (!isAuth) {
      Navigate("/landing-page");
      return;
    }
    if (user?.createdAt && user?.updatedAt) {
      if (user?.createdAt.toString() === user?.updatedAt.toString()) {
        Navigate("/user/update");
        return;
      }
    }
  }, [location]);

  return (
    <>
      <Navbar menuAction={menuAction} navArr={navArr} />
      <Outlet />
    </>
  );
}
