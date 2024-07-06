const express = require('express');
const router = express.Router();
const {authorization, authAdmin} = require('../middlewares/authorization');
const { createData,
        deleteData,
        readData, 
        readBuyerData,
        readMonthlyData,
        readDvN} = require('../controllers/dailyData');

router.post("/:string/:dayTime",authorization,authAdmin,createData);
router.get("/List/:month",authorization,readMonthlyData); 
router.route("/:date/:month").get(authorization,readData);
router.route("/:id").delete(authorization,deleteData);
router.put("/List",authorization,readBuyerData);
router.put("/DvN",authorization,readDvN); 


module.exports = router;