export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred.",
  });
};