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

    const userRoles = decodedToken?.role;

    if (!userRoles || !Array.isArray(userRoles)) {
        return <Navigate to="/login" />;
    }

    const hasRequiredRole = userRoles.some((r) => r.name === requiredRole);

    return (
        <Routes>
            <Route
                path={path}
                element={
                    hasRequiredRole ? component : <Navigate to="/no-access" />
                }
            />
        </Routes>
    );
};

export default RoleBasedRoute;
