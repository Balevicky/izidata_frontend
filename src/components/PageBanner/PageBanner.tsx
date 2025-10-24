/*
  Author : Goli BI Balé Victorien
 
  Created At : 23/10/2025 11:09:59
*/
import React, { FC, useEffect } from "react";
import "./PageBanner.css";
import { Link } from "react-router-dom";

interface PageBannerProps {
  name: string;
}

const PageBanner: FC<PageBannerProps> = ({ name }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {};
    runLocalData();
  });

  return (
    <div className="PageBanner">
      <div className="container-lg py-2 px-5">
        <div className="bgSucc  shadow p-3 mb-2 bg-body rounded">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="page-title">
                  <h1>{name}</h1>
                </div>
              </div>
              <div className="col-md-6" aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-md-end">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">{name}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
