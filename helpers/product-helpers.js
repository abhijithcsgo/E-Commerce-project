//use db connection
var db = require("../config/connection");
// use collection
var collection = require("../config/collections");
const { response } = require("express");

var objectId = require("mongodb").ObjectId;

module.exports = {
  //add product

  addProduct: async (product, callback) => {
    try {
      const result = await db.get().collection("product").insertOne(product);
      console.log(result);
      callback(result.insertedId);
    } catch (err) {
      console.error("Error inserting product:", err);
      callback(null, err);
    }
  },

  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collection.PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },
  deleteProduct: (prodId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .deleteOne({ _id: new objectId(prodId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  getProductDetails: (proId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .findOne({ _id: new objectId(proId) })
        .then((product) => {
          resolve(product);
        });
    });
  },
  updateProduct: (proId, proDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .updateOne(
          { _id: new objectId(proId) },
          {
            $set: {
              Name: proDetails.Name,
              Discription: proDetails.Discription,
              Category: proDetails.Category,
              Price: proDetails.Price,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
};
