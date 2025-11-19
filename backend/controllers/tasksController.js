const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Get all tasks
exports.getTasks = async (req, res, next) => {
  try {
    // optional filter by status
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Get single task
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Update task
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
