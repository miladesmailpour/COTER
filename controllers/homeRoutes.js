const router = require("express").Router();
const { Comment, User, Tweet } = require("../models");

router.get("/", async (req, res) => {
  try {
    const tweetData = await Tweet.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const tweets = (tweetData.map((tweet) => tweet.get({ plain: true }))).reverse();
    let user = null;
    if (req.session.user_id) {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },

      });
      user = userData.get({ plain: true });
    }
    console.log();
    res.render("homepage", {
      tweets,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/tweet/:id", async (req, res) => {
  try {
    const tweetData = await Tweet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const tweet = tweetData.get({ plain: true });
    res.render("tweet", {
      ...tweet,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Tweet }],
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

router.get("/font/:id", async (req, res) => {
  try {
    const font = await Font.findByPk(req.params.id);

    if (!font) {
      return res.status(404).render("404");
    }

    let loadedFont = fontkit.openSync(font.path);
    let fontData = {
      fontName: loadedFont.italicAngle,
      fontPostscriptName: loadedFont.italicAngle,
    };

    res.render("font", {
      font: fontData,
    });
  } catch (err) {
    res.status(500).render("error", { error: "Server error" });
  }
});

module.exports = router;
