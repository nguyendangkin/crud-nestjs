import { Route, Navigate, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const RoleBasedRoute = ({ path, requiredRoles, component }) => {
    const accessToken = useSelector(
        (state) => state.user?.userInfo?.accessToken
    );

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    const decodedToken = jwtDecode(accessToken);

    const userRoles = Array.isArray(decodedToken?.role)
        ? decodedToken.role
        : [];

    const validRequiredRoles = Array.isArray(requiredRoles)
        ? requiredRoles
        : [requiredRoles];

    const hasRequiredRole = userRoles.some((r) =>
        validRequiredRoles.includes(r.name)
    );

    if (!hasRequiredRole) {
        return <Navigate to="/no-access" />;
    }

    return (
        <Routes>
            <Route path={path} element={component} />
        </Routes>
    );
};

export default RoleBasedRoute;
