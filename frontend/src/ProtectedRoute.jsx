import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        console.log("⏳ Authentication is still loading...");
        return <p>Loading...</p>; // ✅ Prevents rendering before authentication check is complete
    }

    if (!user) {
        console.log("🔴 User not logged in → Redirecting to /login");
        return <Navigate to="/login" />;
    }

    console.log("🟢 User authenticated → Showing dashboard");
    return children;
};

export default ProtectedRoute;
