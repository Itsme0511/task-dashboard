import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import { Lock as LockIcon } from "@mui/icons-material";
import AuthContext from "../context/AuthContext";

function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login form submitted...");

        const success = await login(email, password);
        if (success) {
            navigate("/dashboard");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // ✅ Ensures full height on all screens
                width: "100vw",  // ✅ Ensures full width on all screens
                backgroundColor: "#f0f2f5",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    width: "90%", // ✅ Responsive width
                    maxWidth: "400px", // ✅ Prevents it from being too wide on PCs
                    textAlign: "center",
                }}
            >
                <LockIcon sx={{ fontSize: 50, color: "#1976d2", marginBottom: "10px" }} />
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ marginBottom: "20px" }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ padding: "10px", marginTop: "10px" }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default Login;
