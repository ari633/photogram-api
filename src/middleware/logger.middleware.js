export const logger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const log = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: Date.now() - start,
    };
    console.log(log);
  });
  next();
};
