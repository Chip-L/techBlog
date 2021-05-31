const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { sequelize } = require("../models/users");

//base url: http://localhost:8080/ +

// display home page
router.get("/", async (req, res) => {
  try {
    // get the posts (if any) - these display regardless of login status
    const rawPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "created_at", "updated_at"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
          attributes: [
            "comment",
            "created_at",
            "updated_at",
            [
              sequelize.fn(
                "IFNULL",
                sequelize.col("comments.updated_at"),
                sequelize.col("comments.created_at")
              ),
              "maxDate",
            ],
          ],
          order: ["maxDate", "DESC"],
        },
      ],
    });

    // ensure data was found
    if (!rawPostData) {
      res.status(404).json({ message: "No posts found." });
    }

    // serialize the posts
    const postData = rawPostData.map((post) => post.get({ plain: true }));

    console.log(postData);

    // render home page - submit session.loggedIn status for page
    res.render("homepage", {
      style: "homepage.css",
      posts: postData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    style: "login.css",
  });
});

module.exports = router;
