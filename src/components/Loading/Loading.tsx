/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/10/2025 11:03:11
*/
import React, { FC, useEffect } from "react";
import "./Loading.css";

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {};
    runLocalData();
  });

  return (
    <div className="Loading">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
