/*
  Author : BI Balé Victorien
 
  Created At : 29/09/2025 16:19:40
*/
import React, { FC, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {};
    runLocalData();
  });

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/favicon.ico" alt="" height={40} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Localité
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="add-region">
                      Région
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="add-departement">
                      Département
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="add-secteur">
                      Secteur
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="add-village">
                      Village
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Questionnaire
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="add-chapter">
                      Chapitre
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="add-question-response">
                      Questions/Reponses
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* {isAuth ? (
                  <>
                    <li className="nav-item">
                      <a
                        onClick={handleLogout}
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        <span>Connecté</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/account"
                      >
                        Compte
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/signup"
                      >
                        Registrer
                      </Link>
                    </li>
                  </>
                )} */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
