/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/10/2025 16:29:41
*/
import React, { FC, useEffect, Fragment, useState } from "react";
// import Loading from '../Loading/Loading';
import "./ErrorPage.css";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import PageBanner from "../../components/PageBanner/PageBanner";

interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = () => {
  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      setLoading(false);
    };
    runLocalData();
  }, [value]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="ErrorPage">
          <PageBanner name="Page Not Found" />
          {/* ================= */}
          <div className="section">
            <div className="error_wrap">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-lg-6 col-md-10 order-lg-first">
                    <div className="text-center">
                      <div className="error_txt">404</div>
                      <h5 className="mb-2 mb-sm-3">
                        oops! The page you requested was not found!
                      </h5>
                      <p>
                        The page you are looking for was moved, removed, renamed
                        or might never existed.
                      </p>

                      <Link to="/" className="btn btn-outline-primary">
                        Back To Home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ================= */}
        </div>
      )}
    </Fragment>
  );
};

export default ErrorPage;
