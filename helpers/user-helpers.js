//use db connection
var db = require("../config/connection");
// use collection
var collection = require("../config/collections");
const bcrypt = require("bcrypt");

module.exports = {
  //   doSignup: (userData) => {
  //     return new Promise(async (resolve, reject) => {
  //       userData.password = await bcrypt.hash(userData.password, 10);
  //       db.get().collection(collection.USER_COLLECTION).insertOne(userData).then()
  //       resolve(data.ops[0])
  //     });
  //   },
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      // Hash the password using bcrypt
      bcrypt
        .hash(userData.password, 10)
        .then((hashedPassword) => {
          userData.password = hashedPassword;
          // Insert the user data into the database
          return db
            .get()
            .collection(collection.USER_COLLECTION)
            .insertOne(userData);
        })
        .then((result) => {
          // Resolve with the inserted user data
          resolve(result.insertedId);
        })
        .catch((err) => {
          // Handle any errors during the process
          reject(err);
        });
    });
  },

  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            console.log("Login success");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log("login failed");
            resolve({ status: false });
          }
        });
      } else {
        console.log("login failed");
        resolve({ status: false });
      }
    });
  },
};
