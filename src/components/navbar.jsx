import { NavLink , useNavigate} from "react-router-dom";
import "../style/style.css";
import { Context } from "../context/context";
import { useContext } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
              className={({ isActive }) =>
                isActive ? "active-link-nav" : "link-nav"
              }
            >
              <p className="item-nav">خانه</p>
            </NavLink>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive ? "active-link-nav" : "link-nav"
              }
            >
              <p className="item-nav">ورود</p>
            </NavLink>
            <NavLink
              to={"/register"}
              className={({ isActive }) =>
                isActive ? "active-link-nav" : "link-nav"
              }
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
              className={({ isActive }) =>
                isActive ? "active-link-nav" : "link-nav"
              }
            >
              <p className="item-nav">خانه</p>
            </NavLink>
            <NavLink
              to={"/makeblog"}
              className={({ isActive }) =>
                isActive ? "active-link-nav" : "link-nav"
              }
            >
              <p className="item-nav">ایجاد بلاگ</p>
            </NavLink>
            <NavLink
              to={"/yourblog"}
              className={({ isActive }) =>
                isActive ? "active-link-nav" : "link-nav"
              }
            >
              <p className="item-nav">بلاگهای شما</p>
            </NavLink>
            <p className="item-nav" onClick={handlequestion}>
              خروج
            </p>
          </div>
          <p className="arm-nav">Armoon-blog</p>
        </div>
      </div>
    </>
  );

  
  function handlequestion() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <p className="are-you-sure" style={{fontSize:'0.9em'}}>می خواهید از حساب کاربری خود خارج شوید؟</p>
            <div className="pack-btn-question">
              <button className="no-btn-question" onClick={onClose}>
                نه
              </button>
              <button
                onClick={() => {
                  handleout();
                  onClose();
                }}
                className="yes-btn-question"
              >
                آره , خارج شو
              </button>
            </div>
          </div>
        );
      },
    });
  }

  function handleout() {
     toast.info("لطفا کمی صبر کنید", {
       position: "top-right",
       autoClose: 2000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "colored",
       transition: Bounce,
     });
     const settimeout = setTimeout(() => {
    sessionStorage.clear()
    navigate('/')
    context.setstatus(false)
    context.setusernameprofile("");
    context.setemailprofile("")
    context.setpasswordprofile('')
    window.location.reload()
     }, 2000);
  }
};

export default Navbar;
