import { NavLink } from "react-router-dom";
import "../style/style.css";

const Navbar = () => {
  return (
    <>
      <div className="container-nav">
        <div className="flex-nav">
          <div className="beforlogin-nav">
            <NavLink
              to={"/"}
              className="link-nav"
              style={({ isActive }) => {
                return { color: isActive ? "#e0e0e0" : "#fff" };
              }}
            >
              <p className="item-nav">خانه</p>
            </NavLink>
            <NavLink
              to={"/login"}
              className="link-nav"
              style={({ isActive }) => {
                return { color: isActive ? "#e0e0e0" : "#fff" };
              }}
            >
              <p className="item-nav">ورود</p>
            </NavLink>
            <NavLink
              to={"/register"}
              className="link-nav"
              style={({ isActive }) => {
                return { color: isActive ? "#e0e0e0" : "#fff" };
              }}
            >
              <p className="item-nav">ثبت نام</p>
            </NavLink>
          </div>
          <div className="afterlogin-nav">
            <NavLink
              to={"/"}
              className="link-nav"
              style={({ isActive }) => {
                return { color: isActive ? "#e0e0e0" : "#fff" };
              }}
            >
              <p className="item-nav">خانه</p>
            </NavLink>
            <NavLink
              to={"/makeblog"}
              className="link-nav"
              style={({ isActive }) => {
                return { color: isActive ? "#e0e0e0" : "#fff" };
              }}
            >
              <p className="item-nav">ایجاد بلاگ</p>
            </NavLink>
            <NavLink
              to={"/yourblog"}
              className="link-nav"
              style={({ isActive }) => {
                return { color: isActive ? "#e0e0e0" : "#fff" };
              }}
            >
              <p className="item-nav">بلاگ های شما</p>
            </NavLink>
            <p className="item-nav">خروج</p>
          </div>
          <p className="arm-nav">Armoon-blog</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
