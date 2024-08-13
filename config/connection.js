const { MongoClient } = require("mongodb");

const state = {
  db: null,
};

module.exports.connect = function (done) {
  const url = "mongodb://127.0.0.1:27017";
  const dbname = "DemoShopping";

  MongoClient.connect(url)
    .then((client) => {
      state.db = client.db(dbname);
      console.log("Database connected successfully");
      done();
    })
    .catch((err) => {
      console.error("Failed to connect to the database:", err);
      done(err);
    });
};

module.exports.get = function () {
  return state.db;
};
