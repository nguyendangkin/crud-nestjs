import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./../pages/PageNotFound/PageNotFound";
import Layout from "../layouts/Layout";
import Home from "../pages/Home/Home";
import ManagerUser from "../pages/ManagerUser/ManagerUser";
import Login from "../pages/Login/Login";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/manager-user"
                    element={
                        <Layout>
                            <ManagerUser />
                        </Layout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Layout>
                            <Login />
                        </Layout>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Layout>
                            <PageNotFound />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
