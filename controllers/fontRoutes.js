const router = require('express').Router();
const fontkit = require('fontkit');
const { Font } = require('../models');

router.get('/font/:id', async (req, res) => {
  try {
    const font = await Font.findByPk(req.params.id);

    if (!font) {
      return res.status(404).render('404');
    }

    let loadedFont = fontkit.openSync(font.path);
    let fontData = {
      fontName: loadedFont.italicAngle,
      fontPostscriptName: loadedFont.italicAngle
    };
    
    res.render('font', {
      font: fontData
    });

  } catch (err) {
    res.status(500).render('error', { error: 'Server error' });
  }
});

module.exports = router;
