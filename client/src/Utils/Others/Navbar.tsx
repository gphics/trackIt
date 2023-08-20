import { NavLink } from "react-router-dom";
import Logo from "../../asset/Logo.svg";
import AuthStorage from "../AuthStorage";
import { BiMenu } from "react-icons/bi";
type arr = {
  navArr: { url: string; name: string }[];
  elemName?: string;
  linkAction?(): void;
  menuAction?(): void;
};
function Navbar({ navArr, menuAction }: arr) {
  const isAuthenticated: boolean = AuthStorage.getItem("isAuthenticated");
  console.log(isAuthenticated);
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
  return (
    <section className={`${elemName}`}>
      {navArr.map((item: { url: string; name: string }, index: number) => {
        return item.name === "logout" ? (
          <button className="logout-btn">logout</button>
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
    </section>
  );
}
export default Navbar;
