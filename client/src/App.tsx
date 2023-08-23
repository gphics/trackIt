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
// import AuthStorage from "./Utils/AuthStorage";
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
          <Route index element={<Dashboard />} />
          {/* user route */}
          <Route path="user" element={<HOC />}>
            <Route index element={"user profile"} />
            <Route element={"user update"} path="update" />
          </Route>
          {/* debt route */}
          <Route path="debt" element={<HOC />}>
            <Route index element={"all debts"} />
            <Route path="create" element={"create debt"} />
            <Route path="update/:id" element={"update debt"} />
            <Route path=":id" element={"single debt ."} />
          </Route>
          {/* reminder route */}
          <Route path="reminder" element={<HOC />}>
            <Route index element={"all reminders"} />
            <Route path="create" element={"create reminder"} />
            <Route path="update/:id" element={"update reminder"} />
            <Route path=":id" element={"single reminder ."} />
          </Route>
        </Route>
        {/* Error route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

function Dashboard() {
  return (
    <section>
      <h1>this is the dashboard</h1>
      <aside className="as-first"></aside>
      <aside className="as-second"></aside>
      <aside className="as-third"></aside>
      <article></article>
    </section>
  );
}
export default App;
