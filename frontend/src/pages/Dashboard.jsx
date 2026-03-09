import { useState, useEffect, useContext } from "react";
import API from "../api/apiClient";
import { 
    Container, Typography, Paper, Grid, List, ListItem, ListItemText, IconButton, 
    TextField, Button, Box, Divider, LinearProgress 
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { DatePicker } from "@mui/x-date-pickers";
import { motion } from "framer-motion";
import ThemeContext from "../context/ThemeContext";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const { darkMode } = useContext(ThemeContext);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };

    const addTask = async () => {
        if (!title.trim()) return;
        await API.post("/tasks", { title, status: "To Do", dueDate });
        fetchTasks();
        setTitle("");
        setDueDate(null);
    };

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    };

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;
        const taskId = result.draggableId;
        const newStatus = result.destination.droppableId;

        await API.put(`/tasks/${taskId}`, { status: newStatus });
        fetchTasks();
    };
    
    

    const completedTasks = tasks.filter(task => task.status === "Completed").length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh", // ✅ Full height of the screen
                width: "100vw",  // ✅ Full width to ensure proper centering
                backgroundColor: darkMode ? "#121212" : "#f5f5f5",
                padding: "20px",
            }}
        >
            <Paper 
                elevation={3} 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "30px",
                    borderRadius: "12px",
                    width: "90%",
                    maxWidth: "1000px", // ✅ Keeps the dashboard centered on PC screens
                    textAlign: "center",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                }}
            >
                {/* Dashboard Title */}
                <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                    Task Dashboard
                </Typography>

                {/* Task Progress Bar */}
                <Typography variant="h6">Task Progress: {Math.round(completionRate)}%</Typography>
                <LinearProgress variant="determinate" value={completionRate} sx={{ marginBottom: "20px", width: "100%" }} />

                {/* Task Input Fields */}
                <Box display="flex" flexDirection="column" gap={2} width="100%">
                    <TextField 
                        label="New Task"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <DatePicker
                        label="Due Date"
                        value={dueDate}
                        onChange={(newValue) => setDueDate(newValue)}
                        slots={{ textField: (props) => <TextField {...props} fullWidth /> }} // ✅ Fixed for v6+
                    />

                    <Button variant="contained" color="primary" fullWidth startIcon={<AddTaskIcon />} onClick={addTask}>
                        Add Task
                    </Button>
                </Box>

                {/* Task Board (Drag & Drop) */}
                <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                    {["To Do", "In Progress", "Completed"].map((status) => (
                        <Grid item xs={4} key={status}>
                            <Paper 
                                elevation={4} 
                                style={{ 
                                    padding: "15px", 
                                    minHeight: "350px", 
                                    borderRadius: "12px", 
                                    backgroundColor: darkMode ? "#333" : "#f9f9f9" // ✅ Fix applied
                                }}
                            >
                                <Typography variant="h6" align="center">{status}</Typography>
                                <Droppable droppableId={status}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: "100px" }}>
                                            {tasks
                                                .filter(task => task.status === status)
                                                .map((task, index) => (
                                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    padding: "10px",
                                                                    margin: "8px 0",
                                                                    backgroundColor: "white",
                                                                    borderRadius: "4px",
                                                                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                                                                    ...provided.draggableProps.style
                                                                }}
                                                            >
                                                                <ListItem divider>
                                                                    <ListItemText 
                                                                        primary={task.title} 
                                                                        secondary={task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : "No Due Date"} 
                                                                    />
                                                                    <IconButton onClick={() => deleteTask(task._id)} color="secondary">
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </ListItem>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </DragDropContext>
            </Paper>
        </Box>
    );
}

export default Dashboard;
