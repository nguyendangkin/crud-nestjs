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
                            requiredRole="admin"
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
                            requiredRole="user"
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
