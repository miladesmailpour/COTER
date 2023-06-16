const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const tweetRoutes = require("./tweetRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/tweets", tweetRoutes);

module.exports = router;
