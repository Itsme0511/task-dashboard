import { createContext, useState, useEffect } from "react";
import API from "../api/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Ensure loading state is handled

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token in localStorage at mount:", token);

        if (token) {
            API.get("/auth/me")
                .then((res) => {
                    console.log("✅ User loaded:", res.data);
                    setUser(res.data);
                })
                .catch((err) => {
                    console.error("🔴 Error fetching user:", err.response?.data || err.message);
                    logout();
                })
                .finally(() => setLoading(false)); // ✅ Ensures loading completes
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            console.log("Login function started...");
            const res = await API.post("/auth/login", { email, password });
            console.log("Login API Response:", res.data);

            if (!res.data.token || !res.data.user) {
                console.error("🔴 Login failed: Invalid token or user");
                alert("Invalid email or password");
                return false; // ✅ Prevents redirect if login fails
            }

            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            console.log("User set in AuthContext:", res.data.user);

            return true;
        } catch (error) {
            console.error("🔴 Login failed:", error.response?.data?.message || "Invalid email or password");
            alert(error.response?.data?.message || "Invalid email or password");
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
