import "../style/style.css";
import { Field, FormikProvider, useFormik } from "formik";
import { useState  } from "react";
import { Link , useNavigate} from "react-router-dom";
import * as Yup from "yup";

const Register = () => {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      let person = {
        "id": values.username,
        "email": values.email,
        "password" : values.password
      }
      fetch("http://localhost:8000/users", {
        method: 'POST',
        headers:{ 'content-type': 'aplication/json' },
        body: JSON.stringify(person)
      }).then((res) => {
        alert('ثبت نام با موفقیت انجام شد')
        navigate('/login')
      }).catch((err) => {
        alert(err.massage)
      })
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "باید بیشتر از 2 کاراکتر باشد")
        .max(20, "باید کمتر از 20 کاراکتر باشد")
        .required("لطفا نام کاربری خود را وارد نمایید"),
      email: Yup.string()
        .email("لطفا ایمیل خود را تصحیح نمایید")
        .required("لطفا ایمیل خود را وارد نمایید"),
      password: Yup.string()
        .min(8, "باید بیشتر از 8 کاراکتر باشد")
        .max(20, "باید کمتر از 20 کاراکتر باشد")
        .required("لطفا رمز عبور خود را وارد نمایید"),
    }),
  });

  return (
    <FormikProvider value={formik}>
      <div className="container-register">
        <div className="flex-register">
          <form onSubmit={formik.handleSubmit} className="form-register">
            <span id="signup-register">ثبت نام</span>
            <div className="usernamepack-register">
              <label className="lable-register" htmlFor="username-register">
                نام کاربری
              </label>
              <Field
                type="text"
                id="username-register"
                {...formik.getFieldProps("username")}
                placeholder="username"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="usernameerror-register">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="emailpack-register">
              <label className="lable-register" htmlFor="email-register">
                ایمیل
              </label>
              <Field
                type="email"
                id="email-register"
                {...formik.getFieldProps("email")}
                placeholder="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="emailerror-register">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="passwordpack-register">
              <label className="lable-register" htmlFor="password-register">
                رمز عبور
              </label>
              <Field
                type="password"
                id="password-register"
                {...formik.getFieldProps("password")}
                placeholder="password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="passworderror-register">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <p className="question-register">
              قبلا ثبت نام کردی ؟ <Link to={'/login'} className="questionlink-register">ورود</Link>
            </p>
            <button type="submit" id="button-register">
              <span>ثبت</span>
            </button>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
};

export default Register;
