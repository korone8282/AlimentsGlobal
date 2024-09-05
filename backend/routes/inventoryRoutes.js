const express = require('express');
const router = express.Router();
const {readInventory,
       addInventory,
       deleteInventory,
       updateInventory} = require('../controllers/inventory');

router.route("/").post(addInventory).get(readInventory);
router.post("/:inventoryId",updateInventory);
router.delete("/:inventoryId",deleteInventory);

module.exports = router;