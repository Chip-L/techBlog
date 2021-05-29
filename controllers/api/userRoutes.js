const router = require("express").Router();
const { User } = require("../../models");

//base url: http://localhost:3001/api +

//create new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
