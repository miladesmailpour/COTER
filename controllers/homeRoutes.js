const router = require("express").Router();

router.get("/", async (req, res) => {
  console.log("TEST: homeRoutes configured!");
  res.render("homepage", { logged_in: true });
});

module.exports = router;
