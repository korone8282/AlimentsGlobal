const express = require('express');
const router = express.Router();
const {authorization,authAdmin} = require('../middlewares/authorization');
const {createGoal ,updateGoal,deleteGoal,goalList,readGoal} = require('../controllers/goal');

router.route("/").post(authorization,authAdmin,createGoal);
router.post("/:goalId",authorization,authAdmin,updateGoal);
router.delete("/:goalId",authorization,authAdmin,deleteGoal);
router.get("/:date",goalList);

module.exports = router;