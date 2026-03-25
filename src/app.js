// src/app.js
require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

// 🔌 БД
const sequelize = new Sequelize("StepanovM", "student", "5432", {
  host: "109.198.190.115",
  port: 32322,
  dialect: "postgres",
  logging: false,
});

// 📦 Подключаем модели через CLI
const db = require("../models");

// 📌 Роуты
const authRoutes = require("./routes/auth.routes");
const gameRoutes = require("./routes/game.routes");

app.use("/auth", authRoutes);
app.use("/games", gameRoutes);

// ✅ Проверка подключения
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ БД подключена (StepanovM)");
  } catch (error) {
    console.error("❌ Ошибка подключения:", error.message);
    process.exit(1);
  }
}

// 🔥 Создание админа (если нет)
async function createAdmin() {
  const user = await db.User.findOne({ where: { username: "admin" } });

  if (!user) {
    const hash = await bcrypt.hash("1234", 10);

    await db.User.create({
      username: "admin",
      password: hash,
    });

    console.log("✅ Админ создан: admin / 1234");
  } else {
    console.log("ℹ️ Админ уже существует");
  }
}

// тест
app.get("/", (req, res) => {
  res.json({ message: "API работает" });
});

// запуск
const PORT = 3001;

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);

  await connectDB();
  await createAdmin();
});
