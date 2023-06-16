const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require('./homeRoutes')
const fontRoutes = require('./fontRoutes');

router.use('/fontRoutes', fontRoutes);
router.use('/', homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
