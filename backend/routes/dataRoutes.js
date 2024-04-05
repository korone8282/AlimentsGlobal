const express = require('express');
const router = express.Router();
const {authorization,authAdmin} = require('../middlewares/authorization');
const { createData,
        deleteData,
        readData } = require('../controllers/dailyData');

router.route("/:section").post(authorization,createData);

router.route("/:date/:month").get(authorization,readData);
router.route("/:id").delete(authorization,authAdmin,deleteData)
                    


module.exports = router;