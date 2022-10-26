const router = require("express").Router();
const { User } = require("../../models");


//this route will get all the user info such ass passwords and logins and
router.post("/", async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
    })} catch(err) {
        res.status(500).json(err);
    }
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No account found!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Invalid password!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'Logged In.' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

router.delete("/user/:id", async (req, res) => {
    try {
        const dbUserData = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.json(dbUserData);
    }catch(err) {
    res.status(500).json(err);
  }
});
 

module.exports = router;