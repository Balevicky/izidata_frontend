import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
