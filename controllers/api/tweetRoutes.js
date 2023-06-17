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
router.post('/:id/like', async (req, res) => {
    try {
      const tweet = await Tweet.findByPk(req.params.id);
  
      if (!tweet) {
        res.status(404).json({ message: 'Tweet not found' });
        return;
      }
  
      // Increment the like count
      tweet.likes += 1;
      await tweet.save();
  
      res.status(200).json({ message: 'Cote liked successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
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