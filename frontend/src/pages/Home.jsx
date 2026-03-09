import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dashboard as DashboardIcon, Login as LoginIcon } from "@mui/icons-material";

function Home() {
    const navigate = useNavigate();

    return (
        <Box 
            sx={{
                display: "flex",
                justifyContent: "center", 
                alignItems: "center",
                height: "100vh", // ✅ Ensures full height on all screens
                width: "100vw",  // ✅ Ensures full width on all screens
                backgroundColor: "#e3f2fd", // Light blue background
            }}
        >
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#ffffff",
                    padding: "50px",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    width: "90%", // ✅ Adjust width to look good on large and small screens
                    maxWidth: "500px", // ✅ Prevents it from being too wide on PCs
                }}
            >
                <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold", color: "#333", fontSize: "2.5rem" }}>
                    Task Manager
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ marginBottom: "25px" }}>
                    Organize your tasks and boost your productivity effortlessly.
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        startIcon={<LoginIcon />} 
                        onClick={() => navigate("/login")}
                        sx={{ borderRadius: "8px", padding: "12px 25px" }}
                    >
                        Login
                    </Button>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size="large" 
                        startIcon={<DashboardIcon />} 
                        onClick={() => navigate("/dashboard")}
                        sx={{ borderRadius: "8px", padding: "12px 25px" }}
                    >
                        Dashboard
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;
