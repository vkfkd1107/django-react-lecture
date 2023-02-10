import React from "react";
import AppLayout from "../components/AppLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import AccountsRoutes from "./accounts";

function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/accounts/*" element={<AccountsRoutes />} />
      </Routes>
    </AppLayout>
  );
}
export default Root;
