import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
  });

  // Fetch tasks on page load
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(form);
    setForm({ title: "", description: "", status: "PENDING" });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <br />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
        <br />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <br />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> — {task.status}
            <br />
            {task.description}
            <br />
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
