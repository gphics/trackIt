import { NavLink } from "react-router-dom";
import Logo from "../../asset/Logo.svg";
import { BiMenu } from "react-icons/bi";
import { userSliceActions } from "../../Model/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import fetchData from "../DataFetch/fetchData";
import { debtSliceActions } from "../../Model/debtSlice";
type arr = {
  navArr: { url: string; name: string }[];
  elemName?: string;
  linkAction?(): void;
  menuAction?(): void;
};
function Navbar({ navArr, menuAction }: arr) {
  return (
    <nav className="navbar">
      {/* contains the logo and menu icon. also the links if the user is a desktop user */}
      <section className="nav-header">
        <img alt="trackIt logo" className="nav-logo" src={Logo} />
        <LinkDisplay navArr={navArr} elemName="nav-list nav-desktop" />
        <BiMenu className="menu-icon" onClick={menuAction} />
      </section>

      {/* nav links if the user is a mobile user */}
      <LinkDisplay
        navArr={navArr}
        menuAction={menuAction}
        elemName="nav-list nav-mobile hide-nav"
      />
    </nav>
  );
}

function LinkDisplay({ navArr, elemName, menuAction }: arr) {
  const dispatch = useDispatch();
  const { logout, updateIsLoading } = userSliceActions;
  const {fullDebtClear} = debtSliceActions
  async function logMeOut() {
    dispatch(updateIsLoading(true));
    const data = await fetchData("user/logout");
    if (data) {
      dispatch(updateIsLoading(false));

      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout());
        }
        toast.error(data);

        return;
      }
      dispatch(logout());
      dispatch(fullDebtClear())
      toast.success(data.data);
    }
  }
  return (
    <div className={`${elemName}`}>
      {navArr.map((item: { url: string; name: string }, index: number) => {
        return item.name === "logout" ? (
          <button
            key={index}
            type="button"
            onClick={logMeOut}
            className="logout-btn"
          >
            logout
          </button>
        ) : (
          <NavLink
            onClick={menuAction && menuAction}
            className={({ isActive }) =>
              isActive ? "nav-link nav-active" : "nav-link"
            }
            to={item.url}
            key={index}
            end
          >
            {" "}
            {item.name}{" "}
          </NavLink>
        );
      })}
    </div>
  );
}
export default Navbar;
