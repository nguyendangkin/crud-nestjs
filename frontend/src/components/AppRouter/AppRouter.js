import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./../pages/PageNotFound/PageNotFound";
import Layout from "../layouts/Layout";
import Home from "../pages/Home/Home";
import ManagerUser from "../pages/ManagerUser/ManagerUser";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserProfile from "../pages/UserProfile/UserProfile";
import RoleBasedRoute from "../RoleBasedRoute/RoleBasedRoute";
import NoAccess from "../pages/NoAccess/NoAccess ";
import About from "../pages/About/About";

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
                    path="/manager-user/*"
                    element={
                        <RoleBasedRoute
                            path="/"
                            requiredRoles={["admin", "editor"]}
                            component={
                                <Layout>
                                    <ManagerUser />
                                </Layout>
                            }
                        />
                    }
                />

                <Route
                    path="/user-profile/*"
                    element={
                        <RoleBasedRoute
                            path="/"
                            requiredRoles={["user", "admin"]}
                            component={
                                <Layout>
                                    <UserProfile />
                                </Layout>
                            }
                        />
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
                    path="/register"
                    element={
                        <Layout>
                            <Register />
                        </Layout>
                    }
                />

                <Route
                    path="/about/*"
                    element={
                        <RoleBasedRoute
                            path="/"
                            requiredRoles={["another"]}
                            component={
                                <Layout>
                                    <About />
                                </Layout>
                            }
                        />
                    }
                />

                <Route
                    path="/no-access"
                    element={
                        <Layout>
                            <NoAccess />
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
