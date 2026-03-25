const router = require("express").Router();
const ctrl = require("../controllers/game.controller");
const auth = require("../middleware/auth.middleware");

router.use(auth);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.patch("/:id", ctrl.patch);
router.delete("/:id", ctrl.remove);

module.exports = router;
