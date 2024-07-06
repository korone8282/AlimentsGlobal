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
router.get("/List/:month",readMonthlyData); 
router.route("/:date/:month").get(readData);
router.route("/:id").delete(authorization,authAdmin,deleteData);
router.put("/List",readBuyerData);
router.put("/DvN",readDvN); 


module.exports = router;