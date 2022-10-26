const router = require("express").Router();
const { Post, Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try{
        const body = req.body;
        const newPost = await Post.create({ ...body, userId: req.session.userId })
        res.json(newPost);
    }
    catch(err) {
        res.status(500).json(err);
    }
    }
);

//updating our post row
router.put("/:id", withAuth, async (req, res) => {
    try {
        const affectedRows = await Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    if (affectedRows > 0) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
    } catch(err) {
        res.status(500).json(err);
    }
});


//deleting our post row
router.delete("/:id", withAuth, async (req, res) => {
    try{
        const affectedRows = await Post.destroy({
            where: {
                 id: req.params.id
                }
            })
             if (affectedRows > 0) {
                res.status(200).end();
             } else {
                res.status(404).end();
            }
        } catch(err) {
            res.status(500).json(err);
        }
    });

module.exports = router;