const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing data" });
  }

  const user = await db.User.findOne({ where: { username } });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, "SECRET", {
    expiresIn: "1h",
  });

  res.json({ token });
};
