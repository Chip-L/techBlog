const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const Sequelize = require("sequelize");
const { sequelize } = require("../../models/users");

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
              sequelize.fn(
                "IFNULL",
                sequelize.col("comments.updated_at"),
                sequelize.col("comments.created_at")
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

module.exports = router;