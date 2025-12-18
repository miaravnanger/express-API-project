// Global error handler.
// Catches unhandled errors and returns a generic 500 response.

export function errorHandler(err, req, res, next) {
  console.error(err);

  return res.status(500).json({
    error: "Internal server error",
  });
}
