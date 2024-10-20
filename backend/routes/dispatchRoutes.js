const express = require('express');
const router = express.Router();
const {readDispatch,
       readDispatchReport,
       readPacked,
       readPackedReport,
       updateData} = require('../controllers/dispatch');

router.put("/Update/:id",updateData);
router.get("/packReport",readPacked);
router.get("/dispatchReport",readDispatch);
router.put("/dispatchDateReport",readDispatchReport);
router.put("/packDateReport",readPackedReport);

module.exports = router;