/*
  Author : Goli Bi Balé Victorien

  Created At : 23/10/2025 10:57:35
*/
import React, { FC, useEffect, Fragment, useState } from "react";
// import Loading from '../Loading/Loading';
import "./Signup.css";
import Loading from "../../components/Loading/Loading";
import PageBanner from "../../components/PageBanner/PageBanner";
import { validateRegisterForm } from "../../helpers/utils";
import { useFormik } from "formik";
import { signup } from "../../api/entity";
import { Navigate, Link } from "react-router-dom";

interface SignupProps {}

const Signup: FC<SignupProps> = () => {
  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const validate = (value: any) => validateRegisterForm(value);

  const formik = useFormik({
    initialValues: {
      username: "balevicky",
      email: "balevicky@yahoo.com",
      password: "123456",
      confirmPassword: "123456",
    },
    validate,
    onSubmit: async (user) => {
      // console.log("go");
      const result = await signup(user);
      console.log(result);
      // alert(JSON.stringify(result, null, 2));
      if (result.isSuccess) {
        setRedirect(true);
        setFormError("");
      } else {
        setRedirect(false);
        let emailError = result.error.split(":");
        console.log(emailError);
        if (emailError[1] == " email") {
          result.message =
            result.message + ": email " + emailError[3] + " already existed !";
        }

        setFormError(result.message);
      }
    },
  });

  useEffect(() => {
    // window.scrollTo(0, 0);
    const runLocalData = async () => {
      setLoading(false);
    };
    runLocalData();
  }, []);
  if (redirect) {
    // redirect
    console.log(redirect);

    return <Navigate to="/login" />;
  }
  // if (isAuth) {
  //   // redirect
  //   return <Navigate to="/account" />;
  // }
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="Signup">
          <PageBanner name="Inscription" />
          {/* <div className="container-lg py-2 px-5 heading_s">
            <h3>Créer votre compte</h3>
          </div> */}
          <div className="container-lg py-2 px-5">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-6">
                <div className="card justify-content-center">
                  <div className="row mx-auto py-2 heading_s ">
                    <h3>Créer votre compte</h3>
                  </div>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="row mx-5 pb-2 "
                  >
                    <p className="error text-danger">{formError}</p>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                    </div>
                    {formik.errors.username ? (
                      <div className="error text-danger">
                        {formik.errors.username}
                      </div>
                    ) : null}
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.errors.email ? (
                        <div className="error text-danger">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </div>
                    {formik.errors.password ? (
                      <div className="error text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Confirmé mot de passse
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                      />
                      {formik.errors.confirmPassword ? (
                        <div className="error text-danger">
                          {formik.errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-12 mx-auto ">
                      <div className="row mx-auto  my-2 g-2">
                        <button
                          type="submit"
                          className="col-md-5 btn btn-primary mx-auto"
                          name="registrer"
                        >
                          Valider
                        </button>

                        {/* <button className="col-md-5 btn btn-danger mx-auto"> */}
                        <Link
                          to="/"
                          className="col-md-5 btn btn-danger mx-auto text-light .text-light"
                        >
                          Fermer
                        </Link>
                        {/* </button> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Signup;
