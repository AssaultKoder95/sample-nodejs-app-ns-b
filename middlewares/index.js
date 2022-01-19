function loggerMiddleware(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] incoming request body for ${req.method} ${
      req.url
    }: `,
    req.body
  );

  next();
}

module.exports = { loggerMiddleware };
