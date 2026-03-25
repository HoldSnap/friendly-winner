const db = require("../../models");

const error = (res, code, message) => {
  return res.status(code).json({ error: message });
};

// GET /games
exports.getAll = async (req, res, next) => {
  try {
    const games = await db.Game.findAll();
    res.json(games);
  } catch (err) {
    next(err); // 500
  }
};

// GET /games/:id
exports.getOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // 400
    if (isNaN(id)) {
      return error(res, 400, "Invalid ID");
    }

    const game = await db.Game.findByPk(id);

    // 404
    if (!game) {
      return error(res, 404, "Game not found");
    }

    res.json(game);
  } catch (err) {
    next(err); // 500
  }
};

// POST /games
exports.create = async (req, res, next) => {
  try {
    const { title, genre, price } = req.body;

    // 400 (нет тела)
    if (!title || !genre || price === undefined) {
      return error(res, 400, "Missing required fields");
    }

    const game = await db.Game.create(req.body);
    res.status(201).json(game);
  } catch (err) {
    // 422 (валидация Sequelize)
    if (err.name === "SequelizeValidationError") {
      return error(res, 422, err.message);
    }

    next(err); // 500
  }
};

// PUT /games/:id
exports.update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return error(res, 400, "Invalid ID");
    }

    const game = await db.Game.findByPk(id);

    if (!game) {
      return error(res, 404, "Game not found");
    }

    await game.update(req.body);
    res.json(game);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return error(res, 422, err.message);
    }

    next(err); // 500
  }
};

// PATCH /games/:id
exports.patch = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return error(res, 400, "Invalid ID");
    }

    const game = await db.Game.findByPk(id);

    if (!game) {
      return error(res, 404, "Game not found");
    }

    await game.update(req.body);
    res.json(game);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return error(res, 422, err.message);
    }

    next(err); // 500
  }
};

// DELETE /games/:id
exports.remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return error(res, 400, "Invalid ID");
    }

    const game = await db.Game.findByPk(id);

    if (!game) {
      return error(res, 404, "Game not found");
    }

    await game.destroy();
    res.status(204).send();
  } catch (err) {
    next(err); // 500
  }
};
