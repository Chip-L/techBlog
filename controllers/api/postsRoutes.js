const router = require("express").Router();
const Sequelize = require("sequelize");
const { User, Post, Comment } = require("../../models");
// const { sequelize } = require("../../models/users");

router.get("/", async (req, res) => {
  try {
    // const Op = Sequelize.Op;
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
          order: [["comments.maxDate", "ASC"]], // not working
        },
      ],
    });

    // ensure data was found
    if (!rawPostData) {
      res.status(404).json({ message: "No posts found." });
    }

    // serialize the posts
    const postData = rawPostData.map((post) => post.get({ plain: true }));

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  // console.log("dashboard");
  try {
    const userId = 1; // req.session.user_id;
    const rawPostData = await Post.findAll({
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

    // serialize the posts
    const postData = rawPostData.map((post) => post.get({ plain: true }));

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/** needs comment, post_id, and user_id (can get user_id from session) in the submission */
router.post("/addComment", async (req, res) => {
  try {
    const body = req.body;
    body.user_id = req.session.user_id;

    console.log(body);

    const newComment = await Comment.create(body);

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/addPost", async (req, res) => {
  try {
    let newPost;
    const body = req.body;
    body.user_id = req.session.user_id;

    console.log(body);

    if (body.id) {
      newPost = await Post.update(
        {
          title: body.title,
          content: body.content,
          updated_at: Date.now(),
        },
        {
          where: {
            id: body.id,
          },
        }
      );
    } else {
      newPost = await Post.create(body);
    }

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
