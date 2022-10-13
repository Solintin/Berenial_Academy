exports.response = (res, status, message, data) => {
  res.status(status).json({
    status,
    message,
    data: data || null,
  });
};
