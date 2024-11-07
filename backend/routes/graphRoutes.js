const express = require('express');
const router = express.Router();

const {readGraph,monthlyGraph} = require('../controllers/graph');


router.get("/List/:month",monthlyGraph);
router.get("/:date/:month",readGraph); 
 
 



module.exports = router;