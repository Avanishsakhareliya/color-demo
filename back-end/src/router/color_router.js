const express = require("express");
const app = express();
let router = express.Router();
app.use(router);
// let bodyParser = require('body-parser')
router.use(express.json())

// router.use(bodyParser);

// controller
const {createColor,listColor,deleteColor,editColor}=require("../controller/colorController")
// notes----------------
router.post('/create',createColor)
router.get('/listcolor',listColor)
router.post('/delete/:id',deleteColor)
router.post('/edit/:id',editColor)

module.exports = router;
