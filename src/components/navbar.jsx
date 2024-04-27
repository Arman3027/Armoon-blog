import { NavLink , useNavigate} from "react-router-dom";
import "../style/style.css";
import { Context } from "../context/context";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate()
  let context = useContext(Context);
  return (
    <>
      <div className="container-nav">
        <div className="flex-nav">
          <div
            className="beforlogin-nav"
            style={context.status ? { display: "none" } : { display: "flex" }}
          >
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
          <div
            className="afterlogin-nav"
            style={context.status ? { display: "flex" } : { display: "none" }}
          >
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
              <p className="item-nav">بلاگهای شما</p>
            </NavLink>
            <p className="item-nav" onClick={handleout}>خروج</p>
          </div>
          <p className="arm-nav">Armoon-blog</p>
        </div>
      </div>
    </>
  );

  function handleout() {
    sessionStorage.clear()
    navigate('/')
    context.setstatus(false)
    context.setusernameprofile("");
    context.setemailprofile("")
    context.setpasswordprofile('')
    window.location.reload()
  }
};

export default Navbar;
