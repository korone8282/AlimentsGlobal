const express = require('express');
const router = express.Router();
const {authorization,authAdmin} = require('../middlewares/authorization');
const { createUtilData,
        readUtilData} = require('../controllers/utility');

router.post("/data",authorization,authAdmin,createUtilData);
router.get("/:date/:month",authorization,authAdmin,readUtilData);
                    


module.exports = router;