import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Modal,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Switch,
  Chip,
  Avatar,
  Paper,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TaskIcon from "@mui/icons-material/Task";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ProgressIcon from "@mui/icons-material/Autorenew";
import PendingIcon from "@mui/icons-material/Pending";
import { motion, AnimatePresence } from "framer-motion";

// Status configuration for consistent styling
const statusConfig = {
  PENDING: {
    color: "#ff9800",
    icon: <PendingIcon />,
    label: "Pending",
  },
  IN_PROGRESS: {
    color: "#2196f3",
    icon: <ProgressIcon />,
    label: "In Progress",
  },
  COMPLETED: {
    color: "#4caf50",
    icon: <CheckCircleIcon />,
    label: "Completed",
  },
};

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    status: "PENDING",
  });
  const [darkMode, setDarkMode] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setCurrentTask({ title: "", description: "", status: "PENDING" });
    setOpenModal(true);
  };

  const handleSaveTask = async () => {
    if (!currentTask.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      if (editMode) {
        await fetch(`http://localhost:5000/api/tasks/${currentTask._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentTask),
        });
      } else {
        await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentTask),
        });
      }
      setOpenModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
          method: "DELETE",
        });
        fetchTasks();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleEdit = (task) => {
    setEditMode(true);
    setCurrentTask(task);
    setOpenModal(true);
  };

  const getStatusChip = (status) => {
    const config = statusConfig[status];
    return (
      <Chip
        icon={config.icon}
        label={config.label}
        size="small"
        sx={{
          backgroundColor: config.color + "20",
          color: config.color,
          border: `1px solid ${config.color}40`,
          fontWeight: "bold",
        }}
      />
    );
  };

  const themeStyles = {
    backgroundColor: darkMode ? "#0a0a0a" : "#f8fafc",
    minHeight: "100vh",
    color: darkMode ? "#e2e8f0" : "#1e293b",
    transition: "all 0.3s ease-in-out",
    background: darkMode
      ? "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)"
      : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
  };

  const cardStyles = {
    backgroundColor: darkMode
      ? "rgba(30, 30, 30, 0.8)"
      : "rgba(255, 255, 255, 0.9)",
    color: darkMode ? "#e2e8f0" : "#1e293b",
    backdropFilter: "blur(10px)",
    border: darkMode
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: 3,
    boxShadow: darkMode
      ? "0 8px 32px rgba(0, 0, 0, 0.3)"
      : "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: darkMode
        ? "0 12px 40px rgba(0, 0, 0, 0.4)"
        : "0 12px 40px rgba(0, 0, 0, 0.15)",
    },
  };

  return (
    <Box sx={themeStyles}>
      {/* Enhanced AppBar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: darkMode
            ? "rgba(15, 15, 15, 0.9)"
            : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: darkMode
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                backgroundColor: darkMode ? "#6366f1" : "#3b82f6",
                width: 40,
                height: 40,
              }}
            >
              <TaskIcon />
            </Avatar>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                background: darkMode
                  ? "linear-gradient(45deg, #e2e8f0, #94a3b8)"
                  : "linear-gradient(45deg, #1e293b, #475569)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              TaskFlow
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="default"
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 5, pb: 5 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 1,
              background: darkMode
                ? "linear-gradient(45deg, #e2e8f0, #94a3b8)"
                : "linear-gradient(45deg, #1e293b, #475569)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Your Tasks
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.7, mb: 3 }}>
            {tasks.length} task{tasks.length !== 1 ? "s" : ""} in total
          </Typography>

          {/* Create Task Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
              size={isMobile ? "medium" : "large"}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: darkMode
                  ? "linear-gradient(45deg, #6366f1, #8b5cf6)"
                  : "linear-gradient(45deg, #3b82f6, #06b6d4)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                boxShadow: darkMode
                  ? "0 4px 20px rgba(99, 102, 241, 0.3)"
                  : "0 4px 20px rgba(59, 130, 246, 0.3)",
                "&:hover": {
                  boxShadow: darkMode
                    ? "0 6px 25px rgba(99, 102, 241, 0.5)"
                    : "0 6px 25px rgba(59, 130, 246, 0.4)",
                },
              }}
            >
              New Task
            </Button>
          </motion.div>
        </Box>

        {/* Task List */}
        <AnimatePresence>
          <Grid container spacing={2}>
            {tasks.map((task, index) => (
              <Grid item xs={12} key={task._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card sx={cardStyles}>
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            flex: 1,
                            mr: 2,
                          }}
                        >
                          {task.title}
                        </Typography>
                        {getStatusChip(task.status)}
                      </Box>

                      <Typography
                        sx={{
                          opacity: 0.8,
                          mb: 2,
                          lineHeight: 1.6,
                        }}
                      >
                        {task.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <IconButton
                              onClick={() => handleEdit(task)}
                              sx={{
                                backgroundColor: darkMode
                                  ? "rgba(59, 130, 246, 0.1)"
                                  : "rgba(59, 130, 246, 0.1)",
                                color: "#3b82f6",
                                "&:hover": {
                                  backgroundColor: "#3b82f6",
                                  color: "white",
                                },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <IconButton
                              onClick={() => handleDelete(task._id)}
                              sx={{
                                backgroundColor: darkMode
                                  ? "rgba(239, 68, 68, 0.1)"
                                  : "rgba(239, 68, 68, 0.1)",
                                color: "#ef4444",
                                "&:hover": {
                                  backgroundColor: "#ef4444",
                                  color: "white",
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </motion.div>
                        </Box>

                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.6,
                            fontStyle: "italic",
                          }}
                        >
                          {task.createdAt
                            ? new Date(task.createdAt).toLocaleDateString()
                            : ""}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>

        {/* Empty State */}
        {tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              sx={{
                textAlign: "center",
                p: 6,
                backgroundColor: darkMode
                  ? "rgba(30, 30, 30, 0.5)"
                  : "rgba(255, 255, 255, 0.7)",
                borderRadius: 3,
                backdropFilter: "blur(10px)",
              }}
            >
              <TaskIcon sx={{ fontSize: 64, opacity: 0.3, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, opacity: 0.7 }}>
                No tasks yet
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.5 }}>
                Create your first task to get started!
              </Typography>
            </Paper>
          </motion.div>
        )}

        {/* Enhanced Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Fade in={openModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: isMobile ? "90vw" : 500,
                maxWidth: "95vw",
                bgcolor: darkMode
                  ? "rgba(30, 30, 30, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
                color: darkMode ? "#e2e8f0" : "#1e293b",
                p: 4,
                borderRadius: 3,
                backdropFilter: "blur(20px)",
                border: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
                boxShadow: darkMode
                  ? "0 25px 50px rgba(0, 0, 0, 0.5)"
                  : "0 25px 50px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                {editMode ? "Edit Task" : "Create New Task"}
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Title"
                value={currentTask.title}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, title: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Description"
                multiline
                rows={4}
                value={currentTask.description}
                onChange={(e) =>
                  setCurrentTask({
                    ...currentTask,
                    description: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Status"
                select
                value={currentTask.status}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, status: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              >
                {Object.entries(statusConfig).map(([key, config]) => (
                  <MenuItem key={key} value={key}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {config.icon}
                      {config.label}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    background: darkMode
                      ? "linear-gradient(45deg, #6366f1, #8b5cf6)"
                      : "linear-gradient(45deg, #3b82f6, #06b6d4)",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  onClick={handleSaveTask}
                >
                  {editMode ? "Save Changes" : "Create Task"}
                </Button>
              </motion.div>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
}
