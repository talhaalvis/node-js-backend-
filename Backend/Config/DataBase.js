const mongoose = require("mongoose");
const connectDataBase = () => {
  const DB = process.env.LOCAL_DATABASE;
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connect successfully");
    })
    .catch((err) => console.error(err));
};
module.exports = connectDataBase;
