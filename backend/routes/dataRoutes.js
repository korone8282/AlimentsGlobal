const express = require('express');
const router = express.Router();
const {authorization,authAdmin} = require('../middlewares/authorization');
const { createData,
        deleteData,
        readData } = require('../controllers/dailyData');

router.route("/:section").post(authorization,authAdmin,createData);

router.route("/:date/:month").get(authorization,authAdmin,readData);
router.route("/:id").delete(authorization,authAdmin,deleteData)
                    


module.exports = router;