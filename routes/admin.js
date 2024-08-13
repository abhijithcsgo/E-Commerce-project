var express = require("express");
var router = express.Router();
var path = require("path");
var productHelper = require("../helpers/product-helpers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelper.getAllProducts().then((products) => {
    // console.log(products);
    res.render("admin/view-products", { products, admin: true });
  });
});

router.get("/add-product", (req, res) => {
  res.render("admin/add-product");
});

router.post("/add-product", (req, res) => {
  // console.log(req.body);
  // console.log(req.files.Image);

  productHelper.addProduct(req.body, (id) => {
    let image = req.files.Image;
    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "product-images",
      `${id}.jpg`
    );
    image.mv(imagePath, (err) => {
      if (!err) {
        res.render("admin/add-product");
      }
    });
  });
});

router.get("/delete-product/:id", (req, res) => {
  let proId = req.params.id;
  console.log(proId);
  productHelper.deleteProduct(proId).then((response) => {
    res.redirect("/admin/");
  });
});

router.get("/edit-product/:id", async (req, res) => {
  let product = await productHelper.getProductDetails(req.params.id);
  console.log(product);
  res.render("admin/edit-product", { product });
});

router.post("/edit-product/:id", (req, res) => {
  let id = req.params.id;
  productHelper.updateProduct(req.params.id, req.body).then(() => {
    res.redirect("/admin");
    if (req.files.Image) {
      let image = req.files.Image;
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "product-images",
        `${id}.jpg`
      );
      image.mv(imagePath);
    }
  });
});

module.exports = router;
