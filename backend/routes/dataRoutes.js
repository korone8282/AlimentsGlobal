const express = require('express');
const router = express.Router();
const {authorization,authAdmin} = require('../middlewares/authorization');
const { createData,
        deleteData,
        readData, 
        readBuyerData,
        readMonthlyData,
        readDvN} = require('../controllers/dailyData');

router.post("/:string/:dayTime",authorization,authAdmin,createData);
router.get("/List/:month",authorization,authAdmin,readMonthlyData); 
router.route("/:date/:month").get(authorization,authAdmin,readData);
router.route("/:id").delete(authorization,authAdmin,deleteData);
router.put("/List",authorization,authAdmin,readBuyerData);
router.put("/DvN",authorization,authAdmin,readDvN); 


module.exports = router;