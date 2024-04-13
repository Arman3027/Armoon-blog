import "../style/style.css";
import { Field, FormikProvider, useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("لطفا ایمیل خود را تصحیح نمایید")
        .required("لطفا ایمیل خود را وارد نمایید"),
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
            <div className="emailpack-login">
              <label className="lable-login" htmlFor="email-login">
                ایمیل
              </label>
              <Field
                type="email"
                id="email-login"
                {...formik.getFieldProps("email")}
                placeholder="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="emailerror-login">{formik.errors.email}</div>
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
                هنوز ثبت نام نکردی؟ 
              <Link to={'/register'} className="questionlink-login"> ثبت نام </Link>
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
