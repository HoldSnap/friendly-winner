const router = require("express").Router();
const ctrl = require("../controllers/game.controller");
const auth = require("../middleware/auth.middleware");

router.use(auth);

// helper
const methodNotAllowed = (methods) => (req, res) => {
  res.set("Allow", methods.join(", "));
  return res.status(405).json({ error: "Method Not Allowed" });
};

// /games
router
  .route("/")
  .get(ctrl.getAll)
  .post(ctrl.create)
  .all(methodNotAllowed(["GET", "POST"]));

// /games/:id
router
  .route("/:id")
  .get(ctrl.getOne)
  .put(ctrl.update)
  .patch(ctrl.patch)
  .delete(ctrl.remove)
  .all(methodNotAllowed(["GET", "PUT", "PATCH", "DELETE"]));

module.exports = router;
