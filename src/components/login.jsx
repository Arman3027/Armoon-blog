import "../style/style.css";
import { Field, FormikProvider, useFormik } from "formik";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Context } from "../context/context";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(Context);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch("http://localhost:8000/users/" + values.username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (resp.password === values.password) {
            toast.success("با موفقیت وارد شدید", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            })

            const settimeout = setTimeout(() => {
            navigate("/home");
            localStorage.setItem("username", values.username);
            window.location.reload();
            }, 3000)
            
          } else {
            toast.error("لطفا رمز عبور خود را تصحیح کنید", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });};
        })
        .catch((err) => {
            toast.error("نام کاربری صحیح نمی باشد", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
        });
    },
    validationSchema: Yup.object({
      username: Yup.string().required("لطفا نام کاربری خود را وارد نمایید"),
      password: Yup.string()
        .min(8, "باید بیشتر از 8 کاراکتر باشد")
        .max(12, "باید کمتر از 20 کاراکتر باشد")
        .required("لطفا رمز عبور خود را وارد نمایید"),
    }),
  });

  return (
    <FormikProvider value={formik}>
      <div className="container-login">
        <div className="flex-login">
          <form onSubmit={formik.handleSubmit} className="form-login">
            <span id="signin-login">ورود</span>
            <div className="usernamepack-login">
              <label className="lable-login" htmlFor="email-login">
                نام کاربری
              </label>
              <Field
                type="username"
                id="username-login"
                {...formik.getFieldProps("username")}
                placeholder="username"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="usernameerror-login">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="passwordpack-login">
              <label className="lable-login" htmlFor="password-login">
                رمز عبور
              </label>
              <Field
                type="password"
                id="password-login"
                {...formik.getFieldProps("password")}
                placeholder="password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="passworderror-login">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <p className="question-login">
              هنوز ثبت نام نکردی؟ &nbsp;
              <Link to={"/register"} className="questionlink-login">
                ثبت نام
              </Link>
            </p>
            <button type="submit" id="button-login">
              <span>ثبت</span>
            </button>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
};

export default Login;
