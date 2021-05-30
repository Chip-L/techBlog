const router = require("express").Router();
const { User, Post } = require("../models");

//base url: http://localhost:8080/ +

// display home page
router.get("/", async (req, res) => {
  try {
    // get the posts (if any) - these display regardless of login status
    const rawPostData = await Post.findAll();

    // ensure data was found
    if (!rawPostData) {
      res.status(404).json({ message: "No posts found." });
    }

    // serialize the posts
    const postData = rawPostData.map((post) => post.get({ plain: true }));

    console.log(postData);

    // render home page - submit session.loggedIn status for page
    res.render("homepage", {
      posts: postData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
