const router = require("express").Router();
const Sequelize = require("sequelize");
const { User, Post, Comment } = require("../models");
// const { sequelize } = require("../models/users");
const withAuth = require("../utils/auth");

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
              Sequelize.fn(
                "IFNULL",
                Sequelize.col("comments.updated_at"),
                Sequelize.col("comments.created_at")
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

    // console.log(postData);

    // render home page - submit session.loggedIn status for page
    res.render("homepage", {
      style: "postDetails.css",
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

router.get("/createUser", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("createUser", {
    style: "createUser.css",
  });
});

router.get("/dashboard", withAuth, async (req, res) => {
  // console.log("dashboard");
  try {
    const userId = req.session.user_id;

    const rawPostsData = await Post.findAll({
      where: { user_id: userId },
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
              Sequelize.fn(
                "IFNULL",
                Sequelize.col("comments.updated_at"),
                Sequelize.col("comments.created_at")
              ),
              "maxDate",
            ],
          ],
          order: ["maxDate", "DESC"],
        },
      ],
    });

    const postData = await rawPostsData.map((post) =>
      post.get({ plain: true })
    );

    postData.forEach((post) => (post.showEdit = true));

    res.render("dashboard", {
      style: "postDetails.css",
      posts: postData,
      loggedIn: req.session.loggedIn,
      showEdit: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/createPost", withAuth, (req, res) => {
  res.render("createPost", {
    style: "createPost.css",
  });
});

router.get("/createPost/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk({
      where: {
        name: req.params.id,
      },
    });

    res.render("createPost", {
      style: "createPost.css",
      edit: true,
      postData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
