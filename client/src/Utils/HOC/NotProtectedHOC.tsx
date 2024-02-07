import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Others/Navbar";
import menuAction from "../BtnActions/NavActions";
import cookieOps from "../AuthStorage/cookieStore";

export default function NotProtectedHOC() {
  const location = useLocation();
  type arr = { url: string; name: string };
  const navArr: arr[] = [
    { name: "home", url: "/landing-page" },
    { name: "login", url: "/landing-page/login" },
    { name: "register", url: "/landing-page/register" },
  ];
  const Navigate = useNavigate();
  useEffect(() => {
    const isAuth = cookieOps.isAuth();
    if (isAuth) Navigate("/");
  }, [location]);

  return (
    <>
      <Navbar navArr={navArr} menuAction={menuAction} />

      <Outlet />
    </>
  );
}
