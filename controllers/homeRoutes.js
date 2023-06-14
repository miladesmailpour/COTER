const router = require('express').Router();

router.get('/', async (req, res) => {
  console.log('TEST: homeRoutes configured!')
});
module.exports = router;