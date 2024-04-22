import { Route, Navigate, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const RoleBasedRoute = ({ path, requiredRole, component }) => {
    const accessToken = useSelector(
        (state) => state.user?.userInfo?.accessToken
    );

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    const decodedToken = jwtDecode(accessToken);
    const userRole = decodedToken.role.name;

    return (
        <Routes>
            <Route
                path={path}
                element={
                    userRole === requiredRole ? (
                        component
                    ) : (
                        <Navigate to="/no-access" />
                    )
                }
            />
        </Routes>
    );
};

export default RoleBasedRoute;
