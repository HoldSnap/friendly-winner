const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = auth.split(" ")[1];

  try {
    req.user = jwt.verify(token, "SECRET");
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
