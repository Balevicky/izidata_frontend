/*
  Author : Goli Bi Balé Victorien
   Created At : 23/10/2025 11:05:33
*/
import React, { FC, useEffect, Fragment, useState } from "react";
// import Loading from '../Loading/Loading';
import "./Login.css";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { validateLoginForm } from "../../helpers/utils";
import { useFormik } from "formik";
import { signin } from "../../api/entity";
import { CONNECTED } from "../../redux/actions/actions";
import { getAuthState } from "../../redux/selectors/selectors";
import { getItem } from "../../services/localStorage.service";
import { Navigate } from "react-router-dom";
import PageBanner from "../../components/PageBanner/PageBanner";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  // const [value, setValue] = useState("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const dispatch = useDispatch();
  const isAuth = useSelector(getAuthState);
  const validate = (value: any) => validateLoginForm(value);

  const formik = useFormik({
    initialValues: {
      email: "balevicky@yahoo.com",
      password: "123456",
    },
    validate,
    onSubmit: async (user) => {
      const result = await signin(user);
      console.log(result);
      if (result.isSuccess) {
        setRedirect(true);
        setFormError("");
        const connected: any = dispatch({
          type: CONNECTED,
          payload: {
            // isAuth:result.
            token: result.token,
            userId: result.userId,
            projectId: "",
            modelId: "",
          },
        });
        console.log(connected);
      } else {
        setRedirect(false);
        setFormError(result.message);
      }
    },
  });
  // ==========
  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      setLoading(false);
    };
    runLocalData();
  }, []);
  // ===================================

  if (redirect) {
    console.log("redirec:" + redirect);

    let pathnames = getItem("pathname");
    console.log(pathnames);

    if (pathnames) {
      return <Navigate to={pathnames} />;
    } else {
      // return <Navigate to={pathnames} />;
      return <Navigate to="/account" />;
    }
    // // return;
  }

  // =========================

  if (isAuth) {
    let pathnames = getItem("pathname");
    console.log(pathnames);

    if (pathnames) {
      // removeItem("pathname"); // enlever par Goli

      return <Navigate to={pathnames} />;
    }
    return <Navigate to="/account" />;
  }
  // =========================

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="Login">
          <PageBanner name="Connexion" />
          <div className="container-lg px-5">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-6">
                <div className="card justify-content-center">
                  <div className="row mx-auto py-2 heading_s ">
                    <h3>Connectez-vous</h3>
                  </div>

                  <form
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                    className="row mx-5 pb-2 "
                  >
                    <p className="error text-danger">{formError}</p>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email addresse
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

                    <div className="col-10  mx-auto ">
                      <div className="row mx-auto  my-2 g-2">
                        <button
                          type="submit"
                          className="col-6 btn btn-primary mx-auto"
                          name="valider"
                        >
                          Valider
                        </button>

                        {/* <Link
                          to="/"
                          className="col-md-5 btn btn-danger mx-auto text-light .text-light"
                        >
                          Fermer
                        </Link> */}
                        {/* <div className=" col-12 form-note text-srart pt-2">
                          J'ai pas de compte?{" "}
                          <Link className="text-danger" to="/signup">
                            <strong>S'inscrire</strong>
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </form>
                  <div className=" col-12  form-note text-srart pt-2 px-5 py-3">
                    J'ai pas de compte?{" "}
                    <Link className="text-danger" to="/signup">
                      <strong>S'inscrire</strong>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
