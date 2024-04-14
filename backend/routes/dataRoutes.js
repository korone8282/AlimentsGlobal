const express = require('express');
const router = express.Router();
const {authorization,authAdmin} = require('../middlewares/authorization');
const { createData,
        deleteData,
        readData, 
        readBuyerData} = require('../controllers/dailyData');

router.post("/:section/:dayTime",authorization,createData);

router.route("/:date/:month").get(authorization,readData);
router.route("/:id").delete(authorization,authAdmin,deleteData);
router.put("/List",authorization,authAdmin,readBuyerData);
                    


module.exports = router;