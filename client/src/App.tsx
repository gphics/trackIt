import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedHOC from "./Utils/HOC/ProtectedHOC";
import NotProtectedHOC from "./Utils/HOC/NotProtectedHOC";
import HOC from "./Utils/HOC";
import ErrorPage from "./Pages/ErrorPage";
import LandingPage from "./Pages/LandingPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Loading from "./Utils/Others/Loading";
import ProfilePage from "./Pages/ProfilePage";
import UserUpdatePage from "./Pages/UserUpdatePage";
import DebtsPage from "./Pages/DebtPages/DebtsPage";
import CreateDebt from "./Pages/DebtPages/CreateDebt";
import SingleDebt from "./Pages/DebtPages/SingleDebt";
import UpdateDebt from "./Pages/DebtPages/UpdateDebt";
import AllReminders from "./Pages/ReminderPages/AllReminders";
import CreateReminder from "./Pages/ReminderPages/CreateReminder";
import UpdateReminder from "./Pages/ReminderPages/UpdateReminder";
import SingleReminder from "./Pages/ReminderPages/SingleReminder";
import DashboardPage from "./Pages/DashboardPage";

const App = () => {
  const { isLoading } = useSelector((state: any) => state.userSlice);

  // AuthStorage.setItem("isAuthenticated", "true");
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick={true}
        pauseOnHover={true}
        theme="dark"
      />
      {isLoading && <Loading />}
      <Routes>
        {/* landing page route */}

        <Route path="/landing-page" element={<NotProtectedHOC />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {/* main route and it is going to be protected */}
        <Route path="/" element={<ProtectedHOC />}>
          <Route index element={<DashboardPage/>} />
          {/* user route */}
          <Route path="user" element={<HOC />}>
            <Route index element={<ProfilePage />} />
            <Route element={<UserUpdatePage />} path="update" />
          </Route>
          {/* debt route */}
          <Route path="debt" element={<HOC />}>
            <Route index element={<DebtsPage />} />
            <Route path="create" element={<CreateDebt />} />
            <Route path="update/:id" element={<UpdateDebt />} />
            <Route path=":id" element={<SingleDebt />} />
          </Route>
          {/* reminder route */}
          <Route path="reminder" element={<HOC />}>
            <Route index element={<AllReminders />} />
            <Route path="create" element={<CreateReminder />} />
            <Route path="update/:id" element={<UpdateReminder />} />
            <Route path=":id" element={<SingleReminder />} />
          </Route>
        </Route>
        {/* Error route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
