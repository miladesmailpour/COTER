const router = require('express').Router();
const { Tweet } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newTweet = await Tweet.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newTweet);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const tweetData = await Tweet.update({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!tweetData){
            res.status(400).json({message: `No cote is found with this id`})
        }
        res.status(200).json(tweetData);
    } catch (error) {
        
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const tweetData = await Tweet.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!tweetData){
            res.status(404).json({message: `No cote found with this id`});
            return;
        }
        res.status(200).json(tweetData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;