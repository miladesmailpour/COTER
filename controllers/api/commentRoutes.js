const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const commentData = await Comment.findAll({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json(commentData);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

router.get('/tweet/:id', async (req, res) => {
    try {
      const commentsData = await Comment.findAll({
        where: {
          tweet_id: req.params.id,
        },
      });
      const comments = commentsData.map((comment) => comment.get({ plain: true }));
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                comment_text: req.body.comment_text,
                tweet_id: req.body.tweet_id,
            });
            res.json(commentData);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(
            {
                comment_text: req.body.comment_text
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;