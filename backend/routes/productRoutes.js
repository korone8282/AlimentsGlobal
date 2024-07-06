const express = require('express');
const router = express.Router();
const {authorization,authAdmin} = require('../middlewares/authorization');
const {createProduct ,updateProduct,deleteProduct,productList,readProduct} = require('../controllers/product');



router.route("/:buyer").post(authorization,authAdmin,createProduct);
router.delete("/:productId",authorization,authAdmin,deleteProduct);
router.get("/products",productList);
router.get("/:id",readProduct);
router.post("/update/:productId",authorization,authAdmin,updateProduct);

module.exports = router;