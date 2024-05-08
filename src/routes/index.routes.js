const { Router } = require('express');
const router = Router();
const { renderIndex, renderAbout, renderEdit } = require("../controllers/index.controller")


router.get("/", renderIndex);

router.get("/about", renderAbout);

router.get("/contact", renderEdit);

module.exports = router;