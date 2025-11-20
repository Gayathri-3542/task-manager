module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid id" });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
